import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES, LOCATIONS } from "@/lib/types";
import { Phone, MapPin } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return LOCATIONS.map((location) => ({
    slug: location.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);
  
  if (!location) {
    return {
      title: 'Location Not Found | PlusPro Services',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://plusproservices.ca";
  
  return {
    title: `Handyman & Plumbing Services in ${location.name}, BC | PlusPro Services`,
    description: `Professional handyman, plumbing, drain cleaning & repair services in ${location.name}, BC. Licensed, insured, same-day service. Serving ${location.name} and surrounding areas.`,
    keywords: `handyman ${location.name}, plumbing ${location.name}, drain cleaning ${location.name}, home repair ${location.name} BC, emergency repairs ${location.name}`,
    openGraph: {
      title: `Handyman & Plumbing Services in ${location.name}, BC | PlusPro Services`,
      description: `Professional handyman, plumbing, drain cleaning, and repair services in ${location.name}, British Columbia.`,
      type: "website",
      locale: "en_CA",
      url: `${baseUrl}/locations/${location.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/locations/${location.slug}`,
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6">
            Professional Services in {location.name}, BC
          </h1>
          <p className="text-xl text-dark/80 mb-8">
            PlusPro Services proudly serves {location.name} and surrounding areas with expert handyman, plumbing, drain cleaning, and repair services.
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Services Available in {location.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    href={service.slug}
                    className="flex items-center gap-2 p-3 rounded-lg hover:bg-background transition-colors"
                  >
                    <span className="text-dark">{service.title}</span>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Why Choose PlusPro in {location.name}?</h3>
                <ul className="space-y-2 text-dark/80">
                  <li>• Local, licensed professionals</li>
                  <li>• Fast response times</li>
                  <li>• Competitive pricing</li>
                  <li>• Fully insured</li>
                  <li>• Satisfaction guaranteed</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Get Started Today</h3>
                <p className="text-dark/80 mb-4">
                  Ready to book a service or get a free quote? Contact us now!
                </p>
                <div className="space-y-3">
                  <Button asChild className="w-full" size="lg">
                    <Link href="/book-service">Book Service</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <Link href="/request-quote">Request Quote</Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full" size="lg">
                    <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
                      <Phone className="w-5 h-5 mr-2" />
                      Call: {PHONE_NUMBER}
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="bg-white rounded-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-semibold">Service Area</h2>
            </div>
            <p className="text-dark/80 mb-6">
              We provide services throughout {location.name} and the surrounding Lower Mainland area. Our team is ready to help with all your home repair and maintenance needs.
            </p>
            <div className="h-64 bg-background rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Map of {location.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

