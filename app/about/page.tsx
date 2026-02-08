import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Phone, Award, Users, Clock, Shield } from "lucide-react";
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
    url: "https://plusproservices.ca/about",
  },
  alternates: {
    canonical: "https://plusproservices.ca/about",
  },
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Logo and Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="relative h-20 w-auto">
                <Image
                  src="/logo.png"
                  alt="PlusPro Services Logo"
                  width={200}
                  height={80}
                  className="h-20 w-auto object-contain"
                  priority
                />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-4">
              About PlusPro Services
            </h1>
            <p className="text-xl text-dark/80">
              Your trusted local experts with years of experience in home repair and maintenance
            </p>
          </div>

          {/* Main About Card */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
              <p className="text-dark/80 mb-4 leading-relaxed">
                <strong>PlusPro Services</strong> is your go-to team for all things home repair in the Lower Mainland. 
                We've been fixing homes and making customers happy for years, and we're not slowing down anytime soon!
              </p>
              <p className="text-dark/80 mb-4 leading-relaxed">
                What makes us special? <strong>Experience you can trust.</strong> Our skilled team has seen it all – 
                from leaky pipes to broken tiles, emergency repairs to full renovations. We know what works, what doesn't, 
                and how to get your home back in perfect shape, fast.
              </p>
              <p className="text-dark/80 leading-relaxed">
                We're not just another repair company – we're your neighbors. Locally owned, fully licensed, and 
                completely insured, we treat every job like it's our own home. Fair prices, honest work, and a smile 
                with every service call. That's the PlusPro promise.
              </p>
            </CardContent>
          </Card>

          {/* Why Choose Us - Enhanced */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-6">Why Choose PlusPro?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Award,
                    title: "Years of Experience",
                    desc: "We've fixed thousands of homes. Your problem? We've seen it before and know exactly how to solve it."
                  },
                  {
                    icon: Users,
                    title: "Expert Team",
                    desc: "Our skilled professionals are certified, trained, and ready to tackle any repair job with confidence."
                  },
                  {
                    icon: Clock,
                    title: "Fast & Reliable",
                    desc: "Same-day service available. We show up on time, work efficiently, and get the job done right the first time."
                  },
                  {
                    icon: Shield,
                    title: "Fully Protected",
                    desc: "Licensed, insured, and bonded. Your home and peace of mind are always protected when you choose us."
                  },
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

          {/* What We Do */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What We Do Best</h2>
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
                    <span className="text-dark/80">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Our Promise */}
          <Card className="mb-8 bg-gradient-to-br from-[var(--primary-color)] to-blue-700 text-white">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Our Promise to You</h2>
              <p className="text-white/90 mb-4 leading-relaxed text-lg">
                When you call PlusPro, you're getting more than just a repair service. You're getting:
              </p>
              <ul className="space-y-3 text-white/90">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Honest pricing</strong> – No surprises, no hidden fees. You'll know the cost before we start.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Quality work</strong> – We use the best materials and techniques to ensure your repair lasts.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Friendly service</strong> – We're not just fixing your home, we're building a relationship.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[var(--accent-gold)] mt-0.5 flex-shrink-0" />
                  <span><strong>Satisfaction guaranteed</strong> – If you're not happy, we're not done. It's that simple.</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Experience the PlusPro Difference?</h2>
            <p className="text-dark/80 mb-6 text-lg">
              Let's talk about your project. We're here to help, and we'd love to hear from you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-[var(--primary-color)] hover:bg-blue-700">
                <Link href="/book-service">Book a Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/request-quote">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
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
