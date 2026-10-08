"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SERVICES } from "@/lib/types";
import { ButtonLoading } from "@/components/ui/loading";
import { PHONE_NUMBER, PHONE_DIGITS } from "@/lib/utils";
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
    "home-maintenance",
    "emergency-repairs",
  ] as const),
  message: z.string().optional(),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const inputFocusClass =
  "focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)]\/10";

const sidebarCardClass =
  "bg-gradient-to-br from-primary\/10 to-white p-8 rounded-[24px] shadow-lg border border-primary\/20";

const badgeMutedClass = "inline-block px-4 py-2 bg-accent-gold\/20 rounded-full text-[10px] font-bold tracking-widest text-slate-700 mb-6";

export default function RequestQuotePage() {
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

  const onSubmit = async (data: QuoteFormData) => {
    try {
      setError(null);

      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "quote",
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: data.message || "",
          service: data.service,
        }),
      });

      const result = await res.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to submit quote request.");
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error("Quote submission error:", err);
      setError(err instanceof Error ? err.message : "Failed to submit quote request. Please try again.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--bg-off-white)] flex items-center justify-center p-4 sm:p-6 pt-24">
        <div className="w-full max-w-2xl bg-white p-8 sm:p-12 rounded-[24px] shadow-xl border border-slate-100 text-center">
          <div className="w-20 h-20 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 text-[40px]">check_circle</span>
          </div>
          <span className="text-[10px] font-bold tracking-[0.5em] text-[var(--accent-gold)] mb-4 block uppercase">Success</span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[var(--primary-color)] mb-4 uppercase tracking-tight">Quote Request Submitted!</h1>
          <p className="text-slate-600 mb-8 max-w-md mx-auto">
            We have received your quote request and will contact you shortly. You can also text photos to us at {PHONE_NUMBER} for a more accurate quote.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/" className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:opacity-90 w-full sm:w-auto">
              Back to Home
            </Link>
            <Link href="/request-quote" className="border border-slate-200 bg-white text-slate-900 px-8 py-3 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-slate-50 w-full sm:w-auto">
              Submit Another Quote
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-off-white)] pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <span className={badgeMutedClass}>
            Request Your Quote
          </span>
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-tight">Get Your Free Quote</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tell us about your project and we will provide you with a detailed, no-obligation quote. You can text photos to us after submitting for a more accurate estimate.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-[24px] shadow-sm border border-slate-100">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                        Full Name *
                      </Label>
                      <Input id="name" {...register("name")} className={`mt-2 border-slate-200 rounded-xl h-12 ${inputFocusClass}`} placeholder="John Doe" />
                      {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                        Phone Number *
                      </Label>
                      <Input id="phone" type="tel" {...register("phone")} className={`mt-2 border-slate-200 rounded-xl h-12 ${inputFocusClass}`} placeholder="(555) 123-4567" />
                      {errors.phone && <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                        Email Address *
                      </Label>
                      <Input id="email" type="email" {...register("email")} className={`mt-2 border-slate-200 rounded-xl h-12 ${inputFocusClass}`} placeholder="john@example.com" />
                      {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                      <Label htmlFor="service" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                        Service Type *
                      </Label>
                      <Select id="service" {...register("service")} className={`mt-2 border-slate-200 rounded-xl h-12 ${inputFocusClass}`}>
                        <option value="">Select a service</option>
                        {SERVICES.map((service) => (
                          <option key={service.id} value={service.id}>
                            {service.title}
                          </option>
                        ))}
                      </Select>
                      {errors.service && <p className="text-sm text-red-600 mt-1">{errors.service.message}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-slate-700">
                        Project Details
                      </Label>
                      <Textarea id="message" rows={6} {...register("message")} className={`mt-2 border-slate-200 rounded-xl resize-none ${inputFocusClass}`} placeholder="Describe your project, requirements, timelines..." />
                    </div>

                    {error && (
                      <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl">
                        {error}
                      </div>
                    )}

                    <div className="md:col-span-2 flex items-center justify-center mt-8">
                      <ButtonLoading loading={isSubmitting} className="w-full bg-[var(--primary-color)] text-white rounded-xl h-14 font-bold tracking-widest text-xs uppercase hover:opacity-90">
                        {isSubmitting ? "Submitting..." : "Request Quote"}
                      </ButtonLoading>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className={sidebarCardClass}>
                <div className="text-center mb-8">
                  <span className="inline-block px-4 py-2 bg-[var(--accent-gold)] rounded-full text-[10px] font-bold tracking-widest text-white mb-4">
                    Need Faster Service?
                  </span>
                  <h2 className="font-heading text-2xl font-bold text-[var(--primary-color)] mb-4 uppercase tracking-tight">Get Instant Help</h2>
                  <p className="text-slate-600 text-center mb-8 leading-relaxed">
                    Skip the form and get immediate assistance. Call or text us directly.
                  </p>
                </div>
                <div className="space-y-4">
                  <a href={`tel:${PHONE_DIGITS}`} className="group flex items-center justify-between gap-4 p-6 bg-white rounded-xl border-2 border-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:shadow-xl transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-[var(--primary-color)] rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[28px]">call</span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 mb-1">Call Now</p>
                        <p className="text-lg font-semibold text-[var(--primary-color)]">{PHONE_NUMBER}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-[var(--primary-color)] group-hover:text-white">arrow_forward</span>
                  </a>
                  <a href={`sms:${PHONE_DIGITS}`} className="group flex items-center justify-between gap-4 p-6 bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 hover:shadow-xl transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center">
                        <span className="material-symbols-outlined text-green-600 text-[28px]">sms</span>
                      </div>
                      <div>
                        <p className="font-bold text-white mb-1">Text Images</p>
                        <p className="text-lg font-semibold text-white">{PHONE_NUMBER}</p>
                      </div>
                    </div>
                    <span className="material-symbols-outlined text-white">arrow_forward</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
