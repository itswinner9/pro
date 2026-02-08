"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES, ServiceType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, CheckCircle, Calendar, Clock, MapPin } from "lucide-react";
import { FormLoading, ButtonLoading, LoadingSpinner } from "@/components/ui/loading";
import Link from "next/link";
import { PHONE_NUMBER } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(5, "Address is required"),
  service: z.enum([
    "drain-cleaning",
    "plumbing-repairs",
    "bathroom-repairs",
    "tile-installation",
    "handyman-services",
    "emergency-repairs",
  ] as const),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export default function BookServicePage() {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 5 - images.length);
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];

    const supabase = createClient();
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("booking-images")
        .upload(fileName, file);

      if (error) {
        throw new Error(`Failed to upload ${file.name}: ${error.message}`);
      }

      const { data: urlData } = supabase.storage
        .from("booking-images")
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        uploadedUrls.push(urlData.publicUrl);
      }
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: BookingFormData) => {
    try {
      setUploading(true);
      setError(null);

      // Upload images first
      const imageUrls = await uploadImages(images);

      // Save to database
      const supabase = createClient();
      const { data: insertedData, error: dbError } = await supabase
        .from("bookings")
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          address: data.address,
          service: data.service,
          date: data.date,
          time: data.time,
          message: data.message || null,
          images: imageUrls,
          status: "new",
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(`Failed to save booking: ${dbError.message}`);
      }

      if (!insertedData) {
        throw new Error("Failed to save booking. Please try again.");
      }

      // Trigger email notification (non-blocking)
      try {
        await fetch("/api/notify-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, images: imageUrls }),
        });
      } catch (notifyError) {
        // Don't fail the booking if notification fails
        console.warn("Notification failed:", notifyError);
      }

      // Only show success if data was actually saved
      setSubmitted(true);
      reset();
      setImages([]);
    } catch (err) {
      console.error("Booking submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit booking. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10"></div>
        
        <div className="w-full max-w-2xl relative z-10">
          <div className="luxury-card bg-white p-8 sm:p-12 rounded-[24px] shadow-xl border border-green-100 text-center">
            <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <span className="font-quantum text-[10px] tracking-[0.5em] text-[var(--accent-gold)] mb-4 block font-bold uppercase">
              Success
            </span>
            <h1 className="font-quantum text-3xl sm:text-4xl font-bold text-[var(--primary-color)] mb-4">
              Booking Submitted!
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
              Thank you for booking with PlusPro Services! We&apos;ve received your request and will contact you shortly to confirm your appointment. 
              Your booking has been saved and is now visible in the admin dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[var(--primary-color)]/90 transition-all w-full sm:w-auto"
              >
                Back to Home
              </Link>
              <Link
                href="/book-service"
                className="border border-slate-200 bg-white text-slate-900 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all w-full sm:w-auto"
              >
                Book Another Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-off-white)] relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-quantum text-[10px] tracking-[0.5em] text-[var(--accent-gold)] mb-4 block font-bold">
              Book Service | Lower Mainland BC
            </span>
            <h1 className="font-quantum text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6">
              Schedule Your Service Today
            </h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-4">
              Fill out the form below to book your appointment with our professional team serving Lower Mainland, BC. 
              We&apos;ll confirm your booking and contact you shortly.
            </p>
            <p className="text-base text-slate-400 max-w-2xl mx-auto">
              Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam, and all of Lower Mainland, British Columbia
            </p>
          </div>

          {/* Strong CTA Banner */}
          <div className="mb-8 bg-gradient-to-r from-[var(--primary-color)] to-blue-700 rounded-2xl p-6 md:p-8 text-white text-center">
            <h2 className="font-quantum text-2xl md:text-3xl font-bold mb-3">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Book your service now and get professional home repair in Lower Mainland BC. Same-day service available for emergency repairs!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                className="bg-white text-[var(--primary-color)] px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-slate-100 transition-all flex items-center gap-2"
              >
                <span className="material-symbols-outlined">call</span>
                Call {PHONE_NUMBER} Now
              </a>
              <Link
                href="/request-quote"
                className="border-2 border-white text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
              >
                Get Free Quote Instead
              </Link>
            </div>
          </div>

          {(isSubmitting || uploading) && <FormLoading message={uploading ? "Uploading images..." : "Submitting booking..."} />}

          <div className="luxury-card bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-slate-100">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                    Full Name *
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                    placeholder="John Doe"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="address" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                  Service Address *
                </Label>
                <Input
                  id="address"
                  {...register("address")}
                  className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                  placeholder="123 Main St, City, Province"
                />
                {errors.address && (
                  <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="service" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                  Service Type *
                </Label>
                <Select
                  id="service"
                  {...register("service")}
                  className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.title}
                    </option>
                  ))}
                </Select>
                {errors.service && (
                  <p className="text-sm text-red-600 mt-1">{errors.service.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="date" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                  Preferred Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  {...register("date")}
                  min={new Date().toISOString().split('T')[0]}
                  className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                />
                {errors.date && (
                  <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
                )}
              </div>

                <div>
                  <Label htmlFor="time" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                    Preferred Time *
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    {...register("time")}
                    className="mt-2 border-slate-200 rounded-xl h-12 focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                  />
                  {errors.time && (
                    <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                  Additional Details
                </Label>
                <Textarea
                  id="message"
                  rows={4}
                  {...register("message")}
                  className="mt-2 border-slate-200 rounded-xl focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10"
                  placeholder="Tell us more about your service needs..."
                />
              </div>

              <div>
                <Label htmlFor="images" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                  Upload Photos (Optional, max 5)
                </Label>
                <div className="mt-2">
                  <input
                    type="file"
                    id="images"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    disabled={images.length >= 5}
                    className="hidden"
                  />
                  <label htmlFor="images">
                    <Button
                      type="button"
                      variant="outline"
                      disabled={images.length >= 5}
                      className="border-slate-200 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {images.length >= 5 ? "Maximum 5 images" : `Choose Images (${images.length}/5)`}
                    </Button>
                  </label>
                  {images.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={URL.createObjectURL(image)}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-32 object-cover rounded-xl border border-slate-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                            title="Remove image"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                  {error}
                </div>
              )}

              <ButtonLoading
                loading={isSubmitting || uploading}
                className="w-full bg-[var(--primary-color)] text-white rounded-xl h-14 font-bold tracking-widest text-xs uppercase hover:bg-[var(--primary-color)]/90 transition-all hover:shadow-lg"
              >
                {uploading ? "Uploading..." : isSubmitting ? "Submitting..." : "Book Service"}
              </ButtonLoading>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

