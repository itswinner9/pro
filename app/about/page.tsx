import { Button } from "@/components/ui/button";
import { Phone, Wrench, Home, Shield } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PlusPro Services | Trusted Home Repair Experts in Lower Mainland BC",
  description: "Experienced home repair professionals serving Vancouver, Surrey, Burnaby & Lower Mainland BC. Licensed, insured, 5-star rated. Quality craftsmanship guaranteed.",
  keywords: "about PlusPro Services, handyman Lower Mainland, experienced plumber Vancouver, trusted home repair Surrey, licensed contractor Burnaby",
  openGraph: {
    title: "About PlusPro Services | Trusted Home Repair Experts in Lower Mainland BC",
    description: "Experienced home repair professionals serving Lower Mainland, BC with quality craftsmanship and exceptional service.",
    type: "website",
    locale: "en_CA",
    url: "https://pluspro.ca/about",
  },
  alternates: {
    canonical: "https://pluspro.ca/about",
  },
  twitter: {
    card: "summary_large_image",
    title: "About PlusPro Services | Trusted Home Repair Experts in Lower Mainland BC",
    description: "Experienced home repair professionals serving Lower Mainland, BC with quality craftsmanship and exceptional service.",
    images: ["https://pluspro.ca/og.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero – cleaner, more focused */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--primary-color)_0%,#0d2569_50%,#0a1a72_100%)] opacity-[0.03]" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,var(--primary-color)_0%,transparent_70%)] opacity-[0.06]" />
        <div className="container max-w-3xl mx-auto relative text-center">
          <Image
            src="/logo.png"
            alt="PlusPro Services"
            width={140}
            height={56}
            className="h-14 w-auto mx-auto mb-8 opacity-90"
            priority
          />
          <span className="font-quantum text-[10px] tracking-[0.4em] text-[var(--accent-gold)] font-bold block mb-4">
            Lower Mainland BC
          </span>
          <h1 className="font-quantum text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            We fix homes.
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Plumbing, drains, tiles, handyman work—whatever your home needs. 
            We&apos;re local, licensed, and we show up.
          </p>
        </div>
      </section>

      {/* Story – one strong block, no generic cards */}
      <section className="py-16 md:py-20 px-4">
        <div className="container max-w-3xl mx-auto">
          <div>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              PlusPro started because we got tired of contractors who over-promise and under-deliver. 
              You know the type: late arrivals, surprise fees, half-finished jobs. We wanted to be the opposite.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg mb-6">
              We serve Vancouver, Surrey, Burnaby, Richmond, Coquitlam, and the rest of the Lower Mainland. 
              Our team handles everything from clogged drains and leaky taps to bathroom repairs and tile work. 
              Same-day and emergency service when you need it.
            </p>
            <p className="text-slate-600 leading-relaxed text-lg">
              No fluff. We show up on time, give you a straight quote, and get the job done. 
              Licensed and insured—because that&apos;s the baseline, not a selling point.
            </p>
          </div>
        </div>
      </section>

      {/* What we actually do – compact list, no icon overload */}
      <section className="py-16 md:py-20 px-4 bg-slate-50/80">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-quantum text-xl font-bold text-[var(--primary-color)] tracking-wider mb-8 text-center">
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3 text-slate-600">
            <p>Plumbing repairs & installations</p>
            <p>Drain cleaning</p>
            <p>Bathroom repairs & renos</p>
            <p>Tile installation & repair</p>
            <p>General handyman</p>
            <p>24/7 emergency repairs</p>
          </div>
        </div>
      </section>

      {/* Values – simple 2x2, less marketing speak */}
      <section className="py-16 md:py-20 px-4">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-quantum text-xl font-bold text-[var(--primary-color)] tracking-wider mb-12 text-center">
            How we work
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary-color)]/10 flex items-center justify-center">
                <Wrench className="w-6 h-6 text-[var(--primary-color)]" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Straightforward pricing</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We tell you what it&apos;ll cost before we start. No hidden fees.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary-color)]/10 flex items-center justify-center">
                <Home className="w-6 h-6 text-[var(--primary-color)]" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">On time, every time</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We respect your schedule. Same-day and emergency slots when available.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary-color)]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[var(--primary-color)]" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Licensed & insured</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fully licensed, bonded, and insured. Your home is in good hands.
                </p>
              </div>
            </div>
            <div className="flex gap-5">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--primary-color)]/10 flex items-center justify-center">
                <Phone className="w-6 h-6 text-[var(--primary-color)]" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Easy to reach</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Call, text, or use the form. We reply quickly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA – minimal, no hype */}
      <section className="py-20 md:py-24 px-4 border-t border-slate-200">
        <div className="container max-w-2xl mx-auto text-center">
          <p className="text-slate-600 mb-8 text-lg">
            Need something fixed? Get in touch.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-[var(--primary-color)] hover:bg-[#08155c] rounded-full px-8">
              <Link href="/book-service">Book a service</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
              <Link href="/request-quote">Request a quote</Link>
            </Button>
            <Button asChild variant="ghost" size="lg" className="rounded-full px-8">
              <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`} className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
