import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/types";
import { Phone, Droplets, Wrench, Bath, Square, Hammer, AlertCircle } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/utils";

const iconMap: Record<string, any> = {
  droplets: Droplets,
  wrench: Wrench,
  bath: Bath,
  square: Square,
  hammer: Hammer,
  'alert-circle': AlertCircle,
};

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home Repair Services in Lower Mainland BC | PlusPro Services",
  description: "Professional handyman, plumbing, drain cleaning, bathroom repairs & tile installation in Vancouver, Surrey, Burnaby, Richmond, Coquitlam. Licensed, insured, same-day service available.",
  keywords: "handyman services Lower Mainland, plumbing Vancouver, drain cleaning Surrey, bathroom repairs Burnaby, tile installation Richmond, emergency repairs Coquitlam, home repair BC",
  openGraph: {
    title: "Home Repair Services in Lower Mainland BC | PlusPro Services",
    description: "Professional handyman, plumbing, drain cleaning, bathroom repairs & tile installation in Lower Mainland, BC.",
    type: "website",
    locale: "en_CA",
    url: "https://plusproservices.ca/services",
  },
  alternates: {
    canonical: "https://plusproservices.ca/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6">
            Professional Home Repair Services in Lower Mainland BC
          </h1>
          <p className="text-xl text-dark/80">
            Professional, reliable, and affordable services for all your home repair and maintenance needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Phone;
            return (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                  <CardDescription className="mb-6">{service.description}</CardDescription>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={service.slug}>Learn More</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1">
                      <Link href="/book-service">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg mb-6">Need help choosing a service?</p>
          <Button asChild size="lg">
            <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
              <Phone className="w-5 h-5 mr-2" />
              Call Us: {PHONE_NUMBER}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}

