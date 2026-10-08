import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES, LOCATIONS } from "@/lib/types";
import { PHONE_NUMBER, PHONE_DIGITS, SITE_URL } from "@/lib/utils";
import EnhancedSchema from "@/components/seo/EnhancedSchema";
import { locationContent } from "@/lib/locationContent";

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

  const baseUrl = SITE_URL;
  
  return {
    title: `Home Maintenance in ${location.name}, BC | PlusPro`,
    description: `Home maintenance, plumbing, drain cleaning, and handyman service in ${location.name}, BC. Licensed, insured, same-day visits. Serving ${location.name} and nearby areas.`,
    keywords: `home maintenance ${location.name}, plumbing ${location.name}, handyman ${location.name}, drain cleaning ${location.name} BC, emergency repairs ${location.name}`,
    openGraph: {
      title: `Home Maintenance in ${location.name}, BC | PlusPro`,
      description: `Home maintenance, plumbing, drain cleaning, and handyman service in ${location.name}, British Columbia.`,
      type: "website",
      locale: "en_CA",
      url: `${baseUrl}/locations/${location.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/locations/${location.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `Home Maintenance in ${location.name}, BC | PlusPro`,
      description: `Home maintenance, plumbing, drain cleaning, and handyman service in ${location.name}, British Columbia.`,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;
  const location = LOCATIONS.find((l) => l.slug === slug);

  if (!location) {
    notFound();
  }

  const baseUrl = SITE_URL;
  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Place",
    name: `PlusPro Services - ${location.name}`,
    description: `Home maintenance, plumbing, drain cleaning, and handyman service in ${location.name}, British Columbia.`,
    url: `${baseUrl}/locations/${location.slug}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressRegion: "BC",
      addressCountry: "CA",
    },
    areaServed: {
      "@type": "City",
      name: location.name,
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }} />
      <EnhancedSchema type="BreadcrumbList" breadcrumbs={[{ name: "Home", url: "/" }, { name: "Our Areas", url: "/#areas" }, { name: location.name, url: `/locations/${location.slug}` }]} />
      <div className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-tight">
              Home Maintenance in {location.name}, BC
            </h1>
            <div className="text-slate-600 mb-8 space-y-4">
              {locationContent[location.slug] ? (
                <div className="prose prose-slate max-w-none text-lg whitespace-pre-line">
                  {locationContent[location.slug]}
                </div>
              ) : (
                <p className="text-xl">
                  PlusPro Services proudly serves {location.name} and surrounding areas with home maintenance, plumbing, drain cleaning, and handyman work. We&apos;re licensed, insured, and offer same-day and emergency service across the Lower Mainland.
                </p>
              )}
            </div>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Services Available in {location.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SERVICES.map((service) => (
                    <Link key={service.id} href={service.slug} className="flex items-center gap-2 p-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-700">
                      <span className="material-symbols-outlined text-[var(--primary-color)] text-[18px]">arrow_forward</span>
                      {service.title}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">Why Choose PlusPro in {location.name}?</h3>
                  <ul className="space-y-2 text-slate-600">
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
                  <h3 className="text-xl font-semibold mb-4 text-slate-900">Get Started Today</h3>
                  <p className="text-slate-600 mb-4">Ready to book a service or get a free quote? Contact us now!</p>
                  <div className="space-y-3">
                    <Button asChild className="w-full bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90" size="lg">
                      <Link href="/book-service">Book Service</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <Link href="/request-quote">Request Quote</Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full" size="lg">
                      <a href={`tel:${PHONE_DIGITS}`}>
                        <span className="material-symbols-outlined text-[18px] mr-2">call</span>
                        Call: {PHONE_NUMBER}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-white rounded-xl p-8 border border-slate-100 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-[var(--primary-color)] text-[28px]">location_on</span>
                <h2 className="font-heading text-2xl font-semibold text-slate-900 uppercase tracking-tight">Service Area</h2>
              </div>
              <p className="text-slate-600 mb-6">
                We provide services throughout {location.name} and the surrounding Lower Mainland area.
              </p>
              <div className="h-64 bg-slate-100 rounded-lg flex items-center justify-center">
                <p className="text-slate-500">Map of {location.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

