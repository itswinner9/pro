import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { AREA_PAGES } from "@/lib/seo-pages";
import { MapPin } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service Areas | Surrey, Vancouver, Burnaby, Richmond, Coquitlam | PlusPro Services",
  description: "PlusPro Services serves Surrey, Vancouver, Burnaby, Richmond, Coquitlam and the Lower Mainland. Handyman, plumbing, drain cleaning. Licensed, insured.",
  openGraph: {
    title: "Service Areas | PlusPro Services | Lower Mainland BC",
    description: "Handyman, plumbing & drain cleaning in Surrey, Vancouver, Burnaby, Richmond, Coquitlam.",
    type: "website",
    locale: "en_CA",
    url: "https://pluspro.ca/areas",
  },
  alternates: { canonical: "https://pluspro.ca/areas" },
};

export default function AreasIndexPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6 text-center">
            Our Service Areas
          </h1>
          <p className="text-xl text-dark/80 mb-12 text-center">
            We provide handyman, plumbing, drain cleaning, and repair services across the Lower Mainland. Select your area for local information and to get a quote.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AREA_PAGES.map((area) => (
              <Link key={area.slug} href={`/areas/${area.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6 flex items-center gap-4">
                    <MapPin className="w-10 h-10 text-primary flex-shrink-0" />
                    <div>
                      <h2 className="text-xl font-semibold text-primary">{area.title}</h2>
                      <p className="text-dark/80 text-sm">Handyman, plumbing & repairs in {area.name}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
