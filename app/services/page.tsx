import Link from "next/link";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/types";
import { Phone, Droplets, Wrench, Bath, Square, Hammer, AlertCircle, Home } from "lucide-react";
import { PHONE_NUMBER, SITE_URL } from "@/lib/utils";
import EnhancedSchema from "@/components/seo/EnhancedSchema";
import { Metadata } from "next";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  droplets: Droplets,
  wrench: Wrench,
  bath: Bath,
  square: Square,
  hammer: Hammer,
  home: Home,
  "alert-circle": AlertCircle,
};

export const metadata: Metadata = {
  title: "Home Maintenance & Repair Services | Lower Mainland BC",
  description: "Home maintenance, plumbing, drain cleaning, handyman, bathroom repairs, and tile work in Vancouver, Surrey, Burnaby, and the Lower Mainland. Licensed and insured.",
  keywords: "home maintenance Lower Mainland, plumbing Vancouver, drain cleaning Surrey, handyman Burnaby, bathroom repairs BC, emergency repairs Coquitlam",
  openGraph: {
    title: "Home Maintenance & Repair Services | Lower Mainland BC",
    description: "Home maintenance, plumbing, drain cleaning, handyman, bathroom repairs, and tile work in Lower Mainland, BC.",
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/services`,
  },
  alternates: { canonical: `${SITE_URL}/services` },
  twitter: {
    card: "summary_large_image",
    title: "Home Maintenance & Repair Services | Lower Mainland BC",
    description: "Home maintenance, plumbing, drain cleaning, handyman, bathroom repairs, and tile work in Lower Mainland, BC.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function ServicesPage() {
  return (
    <div className="py-16 bg-white min-h-screen">
      <EnhancedSchema type="BreadcrumbList" breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }]} />
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-tight">
            Home Maintenance &amp; Repair in Lower Mainland BC
          </h1>
          <p className="text-xl text-slate-600">
            Seasonal upkeep, plumbing, drain cleaning, and handyman work — licensed, insured, and local.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {SERVICES.map((service) => {
            const Icon = iconMap[service.icon] || Phone;
            return (
              <Card key={service.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 bg-[var(--primary-color)]/10 rounded-lg">
                      <Icon className="w-6 h-6 text-[var(--primary-color)]" />
                    </div>
                    <CardTitle className="text-xl mb-2 text-slate-900">{service.title}</CardTitle>
                  </div>
                  <CardDescription className="mb-6 text-slate-600">{service.description}</CardDescription>
                  <div className="flex gap-2">
                    <Button asChild variant="outline" size="sm" className="flex-1">
                      <Link href={service.slug}>Learn More</Link>
                    </Button>
                    <Button asChild size="sm" className="flex-1 bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
                      <Link href="/book-service">Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <p className="text-lg mb-6 text-slate-600">Need help choosing a service?</p>
          <Button asChild size="lg" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
            <a href={`tel:${PHONE_NUMBER.replace(/\D/g, "")}`}>
              <Phone className="w-5 h-5 mr-2" />
              Call Us: {PHONE_NUMBER}
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
