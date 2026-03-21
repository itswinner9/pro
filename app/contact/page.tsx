import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, MessageCircle, Zap, Send } from "lucide-react";
import Link from "next/link";
import { PHONE_NUMBER, PHONE_RAW, EMAIL, WHATSAPP_LINK } from "@/lib/utils";
import ContactForm from "@/components/ContactForm";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact PlusPro Services | Call, Email or Request Quote | Lower Mainland BC",
  description: "Contact PlusPro Services for handyman, plumbing & repair services in Vancouver, Surrey, Burnaby, Richmond, Coquitlam. Call (778) 716-2994 or WhatsApp. Request a free quote today.",
  keywords: "contact handyman Lower Mainland, call plumber Vancouver, request quote Surrey, emergency repair Burnaby, home repair contact BC",
  openGraph: {
    title: "Contact PlusPro Services | Lower Mainland BC",
    description: "Contact PlusPro Services for handyman, plumbing, and repair services in Lower Mainland, BC. Call, email, or request a quote today.",
    type: "website",
    locale: "en_CA",
    url: "https://pluspro.ca/contact",
  },
  alternates: {
    canonical: "https://pluspro.ca/contact",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PlusPro Services | Lower Mainland BC",
    description: "Contact PlusPro Services for handyman, plumbing, and repair services in Lower Mainland, BC. Call, email, or request a quote today.",
    images: ["https://pluspro.ca/og.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-dark/80 mb-8 text-center">
            Get in touch with us today. We&apos;re here to help with all your home repair and maintenance needs.
          </p>

          {/* Quick response & emergency banner */}
          <Card className="mb-10 border-2 border-[var(--primary-color)] bg-[var(--primary-color)]/5">
            <CardContent className="pt-6 pb-6">
              <div className="flex flex-wrap items-center justify-center gap-6 text-center">
                <div className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[var(--primary-color)]" />
                  <span className="font-semibold text-dark">Quick response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-6 h-6 text-[var(--primary-color)]" />
                  <span className="font-semibold text-dark">Emergency?</span>
                  <a href={`tel:${PHONE_RAW}`} className="text-[var(--primary-color)] hover:underline font-bold">
                    Call {PHONE_NUMBER}
                  </a>
                </div>
                <div className="flex items-center gap-2 flex-wrap justify-center">
                  <MessageCircle className="w-6 h-6 text-[var(--primary-color)]" />
                  <span className="font-semibold text-dark">Send a text:</span>
                  <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="text-[var(--primary-color)] hover:underline font-bold">
                    WhatsApp
                  </a>
                  <span className="text-dark/70"> or </span>
                  <a href={`sms:${PHONE_RAW}`} className="text-[var(--primary-color)] hover:underline font-bold">
                    SMS
                  </a>
                </div>
              </div>
              <p className="text-center text-dark/80 mt-4 text-sm">
                Or fill the form below — we receive your message by email and will reply as soon as we can.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardContent className="pt-6 text-center">
                <Phone className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Phone</h3>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}
                  className="text-primary hover:underline"
                >
                  {PHONE_NUMBER}
                </a>
                <p className="text-sm text-gray-600 mt-2">24/7 Emergency Service</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MessageCircle className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Chat on WhatsApp
                </a>
                <p className="text-sm text-gray-600 mt-2">Same number: {PHONE_NUMBER}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <Mail className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Email</h3>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-primary hover:underline"
                >
                  {EMAIL}
                </a>
                <p className="text-sm text-gray-600 mt-2">We respond within 24 hours</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <MapPin className="w-8 h-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Service Area</h3>
                <p className="text-dark/80">Lower Mainland, BC</p>
                <p className="text-sm text-gray-600 mt-2">Vancouver, Surrey, Burnaby & more</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <Send className="w-6 h-6 text-[var(--primary-color)]" />
                  <h2 className="text-2xl font-semibold">Send Us a Message</h2>
                </div>
                <p className="text-dark/80 text-sm mb-6">
                  We use Web3Forms — your submission is sent to our email so we can respond quickly.
                </p>
                <ContactForm />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button asChild className="w-full" size="lg">
                      <Link href="/book-service">Book a Service</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href="/request-quote">Request a Quote</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
                        <Phone className="w-5 h-5 mr-2" />
                        Call Now
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                  <div className="space-y-2 text-dark/80">
                    <p><strong>Monday - Friday:</strong> 7:00 AM - 7:00 PM</p>
                    <p><strong>Saturday:</strong> 8:00 AM - 5:00 PM</p>
                    <p><strong>Sunday:</strong> Emergency Service Only</p>
                    <p className="mt-4 text-sm text-gray-600">
                      * 24/7 emergency service available
                    </p>
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

