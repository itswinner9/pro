import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { PHONE_NUMBER, EMAIL, SITE_URL } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PlusPro | Home Maintenance Lower Mainland BC",
  description: "Contact PlusPro for home maintenance, plumbing, and handyman service in Vancouver, Surrey, Burnaby, and the Lower Mainland. Call or request a free quote.",
  keywords: "contact home maintenance Lower Mainland, call plumber Vancouver, handyman quote Surrey, emergency repair Burnaby",
  openGraph: {
    title: "Contact PlusPro | Home Maintenance Lower Mainland BC",
    description: "Contact PlusPro for home maintenance, plumbing, and handyman service in Lower Mainland, BC.",
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/contact`,
  },
  alternates: { canonical: `${SITE_URL}/contact` },
  twitter: {
    card: "summary_large_image",
    title: "Contact PlusPro | Home Maintenance Lower Mainland BC",
    description: "Contact PlusPro for home maintenance, plumbing, and handyman service in Lower Mainland, BC.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 text-center uppercase tracking-tight">Contact Us</h1>
          <p className="text-xl text-slate-600 mb-12 text-center">
            Get in touch with us today. We&apos;re here to help with all your home repair and maintenance needs.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="w-8 h-8 text-[var(--primary-color)] mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-slate-900">Phone</h3>
                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`} className="text-[var(--primary-color)] hover:underline">
                  {PHONE_NUMBER}
                </a>
                <p className="text-sm text-slate-500 mt-2">24/7 Emergency Service</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="w-8 h-8 text-[var(--primary-color)] mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-slate-900">Email</h3>
                <a href={`mailto:${EMAIL}`} className="text-[var(--primary-color)] hover:underline">
                  {EMAIL}
                </a>
                <p className="text-sm text-slate-500 mt-2">We respond within 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="w-8 h-8 text-[var(--primary-color)] mx-auto mb-4" />
                <h3 className="font-semibold mb-2 text-slate-900">Service Area</h3>
                <p className="text-slate-600">Lower Mainland, BC</p>
                <p className="text-sm text-slate-500 mt-2">Vancouver, Surrey, Burnaby & more</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <h2 className="font-heading text-2xl font-semibold mb-6 text-slate-900 uppercase tracking-tight">Send Us a Message</h2>
                <ContactForm />
              </CardContent>
            </Card>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/book-service">Book a Service</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href="/request-quote">Request a Quote</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}>
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">Business Hours</h3>
                  <div className="space-y-2 text-slate-600">
                    <p><strong>Monday - Friday:</strong> 7:00 AM - 7:00 PM</p>
                    <p><strong>Saturday:</strong> 8:00 AM - 5:00 PM</p>
                    <p><strong>Sunday:</strong> Emergency Service Only</p>
                    <p className="mt-4 text-sm text-slate-500">* 24/7 emergency service available</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
