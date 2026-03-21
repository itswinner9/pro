import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/types";
import { Phone, CheckCircle } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_LINK } from "@/lib/utils";
import EnhancedSchema from "@/components/seo/EnhancedSchema";
import { getServiceCityBySlug, SERVICE_CITY_SLUGS } from "@/lib/seo-pages";
import { SERVICE_CITY_CONTENT } from "@/lib/seo-content";
import { MessageCircle } from "lucide-react";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

const serviceDetails: Record<string, {
  title: string;
  description: string;
  features: string[];
  metaDescription: string;
}> = {
  'drain-cleaning': {
    title: 'Drain Cleaning Services',
    description: 'Professional drain cleaning services to keep your pipes flowing smoothly. We handle everything from simple clogs to complex sewer line issues.',
    features: [
      'Sink and toilet drain cleaning',
      'Sewer line inspection and cleaning',
      'Hydro jetting services',
      'Preventive maintenance',
      'Emergency drain services',
    ],
    metaDescription: 'Expert drain cleaning services in Lower Mainland, BC. Fast, reliable solutions for clogged drains, sinks, toilets, and sewer lines.',
  },
  'plumbing-repairs': {
    title: 'Plumbing Repairs',
    description: 'Comprehensive plumbing repair services for leaks, pipe issues, water heaters, and more. Fast, reliable solutions for all your plumbing needs.',
    features: [
      'Leak detection and repair',
      'Pipe repair and replacement',
      'Water heater services',
      'Fixture installation',
      'Emergency plumbing repairs',
    ],
    metaDescription: 'Professional plumbing repair services in Lower Mainland, BC. Expert solutions for leaks, pipes, water heaters, and emergency repairs.',
  },
  'bathroom-repairs': {
    title: 'Bathroom Repairs & Renovations',
    description: 'Complete bathroom repair and renovation services. From small fixes to full remodels, we handle it all with precision and care.',
    features: [
      'Bathroom renovations',
      'Fixture replacement',
      'Shower and tub repairs',
      'Vanity installation',
      'Plumbing updates',
    ],
    metaDescription: 'Expert bathroom repair and renovation services in Lower Mainland, BC. Professional installations and repairs for all bathroom needs.',
  },
  'tile-installation': {
    title: 'Tile Installation & Fixing',
    description: 'Professional tile installation, repair, and grout services. Beautiful, durable results for floors, walls, and backsplashes.',
    features: [
      'Floor tile installation',
      'Wall tile installation',
      'Tile repair and replacement',
      'Grout cleaning and sealing',
      'Backsplash installation',
    ],
    metaDescription: 'Professional tile installation and repair services in Lower Mainland, BC. Expert tile work for bathrooms, kitchens, and more.',
  },
  'handyman-services': {
    title: 'Handyman Services',
    description: 'General handyman services for all your home repair and maintenance needs. One call, multiple solutions.',
    features: [
      'General repairs',
      'Drywall patching',
      'Painting',
      'Furniture assembly',
      'Minor electrical work',
    ],
    metaDescription: 'Professional handyman services in Lower Mainland, BC. Expert repairs and maintenance for your home.',
  },
  'emergency-repairs': {
    title: 'Emergency Repairs',
    description: '24/7 emergency repair services for urgent plumbing and home issues. Fast response when you need it most.',
    features: [
      '24/7 availability',
      'Fast response times',
      'Emergency plumbing',
      'Water damage prevention',
      'Urgent repairs',
    ],
    metaDescription: '24/7 emergency repair services in Lower Mainland, BC. Fast response for urgent plumbing and home repair needs.',
  },
};

export async function generateStaticParams() {
  const serviceSlugs = SERVICES.map((service) => ({
    slug: service.slug.replace('/services/', ''),
  }));
  const citySlugs = SERVICE_CITY_SLUGS.map((slug) => ({ slug }));
  return [...serviceSlugs, ...citySlugs];
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const serviceCity = getServiceCityBySlug(slug);
  if (serviceCity) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
    const title = `${serviceCity.serviceTitle} ${serviceCity.regionLabel} | PlusPro Services`;
    const desc = `Professional ${serviceCity.serviceTitle.toLowerCase()} in ${serviceCity.regionLabel}. Licensed, insured, same-day available. Call or request a quote.`;
    return {
      title,
      description: desc,
      keywords: `${serviceCity.serviceTitle} ${serviceCity.cityName}, ${serviceCity.serviceKey} ${serviceCity.regionLabel}, home repair BC`,
      openGraph: { title, description: desc, type: "website", locale: "en_CA", url: `${baseUrl}/services/${slug}` },
      alternates: { canonical: `${baseUrl}/services/${slug}` },
      twitter: { card: "summary_large_image", title, description: desc, images: [`${baseUrl}/og.png`] },
    };
  }
  const service = SERVICES.find((s) => s.slug === `/services/${slug}`);
  const details = serviceDetails[slug];
  if (!service || !details) {
    return { title: 'Service Not Found | PlusPro Services' };
  }
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
  return {
    title: `${details.title} in Lower Mainland BC | PlusPro Services`,
    description: details.metaDescription || `${details.title} in Vancouver, Surrey, Burnaby, Richmond, Coquitlam. Professional, licensed, insured. Same-day service available.`,
    keywords: `${slug} Lower Mainland, ${slug} Vancouver, ${slug} Surrey, ${slug} Burnaby, home repair BC`,
    openGraph: {
      title: `${details.title} | PlusPro Services | Lower Mainland BC`,
      description: details.metaDescription,
      type: "website",
      locale: "en_CA",
      url: `${baseUrl}${service.slug}`,
    },
    alternates: { canonical: `${baseUrl}${service.slug}` },
    twitter: {
      card: "summary_large_image",
      title: `${details.title} | PlusPro Services | Lower Mainland BC`,
      description: details.metaDescription,
      images: [`${baseUrl}/og.png`],
    },
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const serviceCity = getServiceCityBySlug(slug);
  const content = serviceCity ? SERVICE_CITY_CONTENT[slug] : null;

  if (serviceCity && content) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${serviceCity.serviceTitle} in ${serviceCity.regionLabel}`,
      description: content.intro,
      provider: { "@type": "LocalBusiness", name: "PlusPro Services", telephone: PHONE_NUMBER },
      areaServed: { "@type": "City", name: serviceCity.cityName },
    };
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: content.faq.map(({ q, a }) => ({
        "@type": "Question",
        name: q,
        acceptedAnswer: { "@type": "Answer", text: a },
      })),
    };
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <EnhancedSchema type="BreadcrumbList" breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: `${serviceCity.serviceTitle} ${serviceCity.regionLabel}`, url: `/services/${slug}` }]} />
        <div className="py-16 bg-background min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Card className="mb-8">
                <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold text-primary">{PHONE_NUMBER}</p>
                    <p className="text-sm text-dark/80">Call or WhatsApp for a quote</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button asChild size="lg">
                      <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}><Phone className="w-5 h-5 mr-2" /> Call</a>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-5 h-5 mr-2" /> WhatsApp</a>
                    </Button>
                    <Button asChild size="lg"><Link href="/request-quote">Get Quote</Link></Button>
                  </div>
                </CardContent>
              </Card>
              <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6">
                {serviceCity.serviceTitle} {serviceCity.regionLabel}
              </h1>
              <p className="text-xl text-dark/80 mb-6">{content.intro}</p>
              <div className="prose prose-slate max-w-none mb-8">
                {content.body.map((p, i) => (
                  <p key={i} className="text-dark/80 mb-4">{p}</p>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button asChild size="lg"><Link href="/book-service">Book This Service</Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/request-quote">Get Free Quote</Link></Button>
              </div>
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
                  <ul className="space-y-6">
                    {content.faq.map((item, i) => (
                      <li key={i}>
                        <h3 className="font-semibold text-dark mb-2">{item.q}</h3>
                        <p className="text-dark/80">{item.a}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <div className="bg-white rounded-xl p-8 text-center">
                <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
                <p className="text-dark/80 mb-6">Contact us for a free quote or to schedule. Call {PHONE_NUMBER} or request a quote online.</p>
                <Button asChild size="lg"><Link href="/contact">Contact Us</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  const service = SERVICES.find((s) => s.slug === `/services/${slug}`);
  const details = serviceDetails[slug];
  if (!service || !details) notFound();

  return (
    <>
      <EnhancedSchema type="Service" serviceName={details.title} locationName="Lower Mainland" />
      <EnhancedSchema type="BreadcrumbList" breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: details.title, url: service.slug }]} />
      <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6">
            {details.title}
          </h1>
          <p className="text-xl text-dark/80 mb-8">
            {details.description}
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="space-y-3">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg">
              <Link href="/book-service">Book This Service</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/request-quote">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          <div className="bg-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-dark/80 mb-6">
              Contact us today for a free quote or to schedule your service.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

