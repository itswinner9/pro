"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SERVICES, ServiceType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, CheckCircle, Phone, MessageCircle, Camera } from "lucide-react";
import { FormLoading, ButtonLoading } from "@/components/ui/loading";
import RotatingCityText from "@/components/RotatingCityText";
import { PHONE_NUMBER } from "@/lib/utils";
import Link from "next/link";

const quoteSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  email: z.string().email("Valid email is required"),
  service: z.enum([
    "drain-cleaning",
    "plumbing-repairs",
    "bathroom-repairs",
    "tile-installation",
    "handyman-services",
    "emergency-repairs",
  ] as const),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

export default function RequestQuotePage() {
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.slice(0, 5 - images.length);
    setImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    if (files.length === 0) return [];
    
    const supabase = createClient();
    const uploadedUrls: string[] = [];

    for (const file of files) {
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${file.name}`;
      const { data, error } = await supabase.storage
        .from("quote-images")
        .upload(fileName, file);

      if (error) {
        throw new Error(`Failed to upload ${file.name}: ${error.message}`);
      }

      const { data: urlData } = supabase.storage
        .from("quote-images")
        .getPublicUrl(fileName);

      if (urlData?.publicUrl) {
        uploadedUrls.push(urlData.publicUrl);
      }
    }

    return uploadedUrls;
  };

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setUploading(true);
      setError(null);

      // Upload images first
      const imageUrls = await uploadImages(images);

      // Save to database
      const supabase = createClient();
      const { data: insertedData, error: dbError } = await supabase
        .from("quotes")
        .insert({
          name: data.name,
          phone: data.phone,
          email: data.email,
          service: data.service,
          message: data.message || null,
          images: imageUrls,
          status: "new",
        })
        .select()
        .single();

      if (dbError) {
        console.error("Database error:", dbError);
        throw new Error(`Failed to save quote: ${dbError.message}`);
      }

      if (!insertedData) {
        throw new Error("Failed to save quote request. Please try again.");
      }

      // Trigger email notification (non-blocking)
      try {
        await fetch("/api/notify-quote", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...data, images: imageUrls }),
        });
      } catch (notifyError) {
        // Don't fail the quote if notification fails
        console.warn("Notification failed:", notifyError);
      }

      // Only show success if data was actually saved
      setSubmitted(true);
      reset();
      setImages([]);
    } catch (err) {
      console.error("Quote submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit quote request. Please try again.");
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
              Quote Request Submitted!
            </h1>
            <p className="text-slate-600 mb-8 max-w-md mx-auto text-base sm:text-lg leading-relaxed">
              We have received your quote request and will contact you shortly with a detailed estimate. 
              Your request has been saved and is now visible in the admin dashboard.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/"
                className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-[var(--primary-color)]/90 transition-all w-full sm:w-auto"
              >
                Back to Home
              </Link>
              <Link
                href="/request-quote"
                className="border border-slate-200 bg-white text-slate-900 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-50 transition-all w-full sm:w-auto"
              >
                Submit Another Quote
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-off-white)] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 skew-x-12 translate-x-1/2 -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-white opacity-40 -z-5"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-[var(--accent-gold)]/20 rounded-full text-[10px] font-bold tracking-widest text-white mb-6">
              Request Your Quote
            </span>
            <h1 className="font-quantum text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-6">
              Get Your Free Quote
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Tell us about your project and we will provide you with a detailed, no-obligation quote. 
              Upload photos to help us give you a more accurate estimate!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl">
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-slate-100">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                    <div>
                      <Label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                        Project Details
                      </Label>
                      <Textarea
                        id="message"
                        rows={6}
                        {...register("message")}
                        className="mt-2 border-slate-200 rounded-xl focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]/10 resize-none"
                        placeholder="Please describe your project in detail. Include any specific requirements, timelines, or concerns..."
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
                        <label
                          htmlFor="images"
                          className={`flex items-center gap-3 px-6 py-4 border-2 border-dashed rounded-xl cursor-pointer transition-all ${
                            images.length >= 5
                              ? "border-slate-200 bg-slate-50 opacity-50 cursor-not-allowed"
                              : "border-slate-300 hover:border-[var(--primary-color)] hover:bg-slate-50"
                          }`}
                        >
                          <Upload className="w-5 h-5" />
                          <span className="text-sm font-medium">
                            {images.length >= 5 ? "Maximum 5 images" : `Choose Images (${images.length}/5)`}
                          </span>
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

                    <div className="flex items-center justify-center mt-8">
                      <ButtonLoading
                        loading={isSubmitting || uploading}
                        className="w-full bg-[var(--primary-color)] text-white rounded-xl h-14 font-bold tracking-widest text-xs uppercase hover:bg-[var(--primary-color)]/90 transition-all"
                      >
                        {uploading ? "Uploading..." : isSubmitting ? "Submitting..." : "Request Quote"}
                      </ButtonLoading>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-[var(--primary-color)]/10 to-white p-8 rounded-[24px] shadow-lg border border-[var(--primary-color)]/20">
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-2 bg-[var(--accent-gold)] rounded-full text-[10px] font-bold tracking-widest text-white mb-4">
                    Need Faster Service?
                  </span>
                  <h2 className="font-quantum text-2xl font-bold text-[var(--primary-color)] mb-4">
                    Get Instant Help
                  </h2>
                  <p className="text-slate-600 text-center mb-8 leading-relaxed">
                    Skip the form and get immediate assistance. Call or text us directly for quick response.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <a
                    href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                    className="group flex items-center justify-between gap-4 p-6 bg-white rounded-xl border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
                        <Phone className="w-7 h-7 text-white" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-slate-900 mb-1">Call Now</p>
                        <p className="text-lg font-semibold text-[var(--primary-color)]">{PHONE_NUMBER}</p>
                      </div>
                    </div>
                    <div className="text-[var(--primary-color)] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </div>
                  </a>

                  <a
                    href={`sms:${PHONE_NUMBER.replace(/\D/g, '')}`}
                    className="group flex items-center justify-between gap-4 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                        <MessageCircle className="w-7 h-7 text-green-600" />
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-white mb-1">Text Images</p>
                        <p className="text-lg font-semibold text-white">{PHONE_NUMBER}</p>
                      </div>
                    </div>
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="material-symbols-outlined text-xl">arrow_forward</span>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {(isSubmitting || uploading) && <FormLoading message={uploading ? "Uploading images..." : "Submitting quote..."} />}
    </div>
  );
}
