import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Award, Users, Clock, Shield } from "lucide-react";
import { PHONE_NUMBER, SITE_URL } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About PlusPro | Home Maintenance in Lower Mainland BC",
  description: "PlusPro provides home maintenance, plumbing, and handyman service across Vancouver, Surrey, Burnaby, and the Lower Mainland. Licensed, insured, local.",
  keywords: "about PlusPro Services, home maintenance Lower Mainland, plumber Vancouver, handyman Surrey, licensed contractor Burnaby",
  openGraph: {
    title: "About PlusPro | Home Maintenance in Lower Mainland BC",
    description: "PlusPro provides home maintenance, plumbing, and handyman service across the Lower Mainland. Licensed, insured, local.",
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/about`,
  },
  alternates: { canonical: `${SITE_URL}/about` },
  twitter: {
    card: "summary_large_image",
    title: "About PlusPro | Home Maintenance in Lower Mainland BC",
    description: "PlusPro provides home maintenance, plumbing, and handyman service across the Lower Mainland. Licensed, insured, local.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Image src="/widelogo.png" alt="PlusPro Services Logo" width={240} height={80} className="h-16 md:h-20 w-auto object-contain" priority />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-4 uppercase tracking-tight">About PlusPro Services</h1>
            <p className="text-xl text-slate-600">
              Your local team for home maintenance, plumbing, and handyman work in the Lower Mainland
            </p>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Who We Are</h2>
              <p className="text-slate-600 mb-4 leading-relaxed">
                <strong>PlusPro Services</strong> is your go-to team for home maintenance, plumbing, and repairs in the Lower Mainland. We&apos;ve been keeping homes in shape and making customers happy for years.
              </p>
              <p className="text-slate-600 mb-4 leading-relaxed">
                What makes us special? <strong>Experience you can trust.</strong> Our skilled team has seen it all – from leaky pipes to broken tiles, emergency repairs to full renovations.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We&apos;re not just another repair company – we&apos;re your neighbors. Locally owned, fully licensed, and completely insured.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-heading text-2xl font-semibold mb-6 text-slate-900 uppercase tracking-tight">Why Choose PlusPro?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Award, title: "Years of Experience", desc: "We've fixed thousands of homes. Your problem? We've seen it before and know exactly how to solve it." },
                  { icon: Users, title: "Expert Team", desc: "Our skilled professionals are certified, trained, and ready to tackle any repair job with confidence." },
                  { icon: Clock, title: "Fast & Reliable", desc: "Same-day service available. We show up on time, work efficiently, and get the job done right the first time." },
                  { icon: Shield, title: "Fully Protected", desc: "Licensed, insured, and bonded. Your home and peace of mind are always protected when you choose us." },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start gap-4 p-4 bg-slate-50 rounded-lg">
                      <div className="w-12 h-12 bg-[var(--primary-color)]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-[var(--primary-color)]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">What We Do Best</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Plumbing repairs and installations",
                  "Drain cleaning and unclogging",
                  "Bathroom renovations and repairs",
                  "Tile installation and repair",
                  "General handyman services",
                  "Emergency repairs available 24/7",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-[var(--primary-color)] mt-0.5 flex-shrink-0" />
                    <span className="text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8 bg-gradient-to-br from-[var(--primary-color)] to-blue-700 text-white">
            <CardContent className="pt-6">
              <h2 className="font-heading text-2xl font-semibold mb-4 uppercase tracking-tight">Our Promise to You</h2>
              <p className="text-white/90 mb-4 leading-relaxed text-lg">
                When you call PlusPro, you&apos;re getting more than just a repair service. You&apos;re getting:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Honest pricing</strong> – No surprises, no hidden fees.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Quality work</strong> – We use the best materials and techniques.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Friendly service</strong> – We&apos;re building a relationship.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Satisfaction guaranteed</strong> – If you&apos;re not happy, we&apos;re not done.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Ready to Experience the PlusPro Difference?</h2>
            <p className="text-slate-600 mb-6 text-lg">Let&apos;s talk about your project. We&apos;re here to help.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
                <Link href="/book-service">Book a Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/request-quote">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {PHONE_NUMBER}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
