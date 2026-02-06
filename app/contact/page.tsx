import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin } from "lucide-react";
import { PHONE_NUMBER, EMAIL } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Contact Us | PlusPro Services | Lower Mainland BC",
  description: "Contact PlusPro Services for handyman, plumbing, and repair services in Lower Mainland, BC. Call, email, or request a quote today.",
};

export default function ContactPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-dark/80 mb-12 text-center">
            Get in touch with us today. We're here to help with all your home repair and maintenance needs.
          </p>

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
                <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" name="email" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" name="phone" required />
                  </div>
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" name="message" rows={5} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
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

