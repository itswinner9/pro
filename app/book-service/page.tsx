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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES, ServiceType } from "@/lib/types";
import { createClient } from "@/lib/supabase/client";
import { Upload, X, CheckCircle } from "lucide-react";

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

      // Upload images
      const imageUrls = await uploadImages(images);

      // Submit booking
      const supabase = createClient();
      const { error: insertError } = await supabase.from("bookings").insert({
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
      });

      if (insertError) {
        throw new Error(insertError.message);
      }

      // Trigger email notification (will be handled by Netlify function)
      await fetch("/api/notify-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, images: imageUrls }),
      });

      setSubmitted(true);
      reset();
      setImages([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit booking");
    } finally {
      setUploading(false);
    }
  };

  if (submitted) {
    return (
      <div className="py-16 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
              <h2 className="text-2xl font-semibold mb-4">Booking Submitted Successfully!</h2>
              <p className="text-dark/80 mb-6">
                Thank you for booking with PlusPro Services. We've received your request and will contact you shortly to confirm your appointment.
              </p>
              <Button asChild>
                <a href="/">Return Home</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6 text-center">
            Book a Service
          </h1>
          <p className="text-xl text-dark/80 mb-8 text-center">
            Fill out the form below to schedule your service appointment.
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Service Booking Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" type="tel" {...register("phone")} />
                  {errors.phone && (
                    <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="address">Service Address *</Label>
                  <Input id="address" {...register("address")} />
                  {errors.address && (
                    <p className="text-sm text-red-600 mt-1">{errors.address.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="service">Service Type *</Label>
                  <Select id="service" {...register("service")}>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Preferred Date *</Label>
                    <Input id="date" type="date" {...register("date")} />
                    {errors.date && (
                      <p className="text-sm text-red-600 mt-1">{errors.date.message}</p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="time">Preferred Time *</Label>
                    <Input id="time" type="time" {...register("time")} />
                    {errors.time && (
                      <p className="text-sm text-red-600 mt-1">{errors.time.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Details</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    {...register("message")}
                    placeholder="Tell us more about your service needs..."
                  />
                </div>

                <div>
                  <Label htmlFor="images">Upload Photos (Optional, max 5)</Label>
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
                      <Button type="button" variant="outline" asChild>
                        <span>
                          <Upload className="w-4 h-4 mr-2" />
                          Choose Images
                        </span>
                      </Button>
                    </label>
                    {images.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                        {images.map((image, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Upload ${index + 1}`}
                              className="w-full h-32 object-cover rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
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
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting || uploading}>
                  {uploading ? "Uploading..." : isSubmitting ? "Submitting..." : "Book Service"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

