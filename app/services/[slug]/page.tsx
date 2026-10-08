import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/types";
import { PHONE_NUMBER, PHONE_DIGITS, SITE_URL } from "@/lib/utils";
import EnhancedSchema from "@/components/seo/EnhancedSchema";
import { serviceExtendedContent } from "@/lib/serviceContent";

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
  'home-maintenance': {
    title: 'Home Maintenance',
    description: 'Ongoing home upkeep so small issues stay small. Seasonal checks, caulking, fixtures, gutters, and preventive work for Lower Mainland homes.',
    features: [
      'Seasonal home checkups',
      'Caulking, weatherstripping, and draft sealing',
      'Gutter cleaning and downspout checks',
      'Fixture, hardware, and door adjustments',
      'Preventive plumbing and moisture checks',
    ],
    metaDescription: 'Home maintenance in Vancouver and the Lower Mainland. Seasonal checks, caulking, gutters, fixtures, and preventive upkeep. Licensed and insured.',
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
  return SERVICES.map((service) => ({
    slug: service.slug.replace('/services/', ''),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === `/services/${slug}`);
  const details = serviceDetails[slug];
  
  if (!service || !details) {
    return {
      title: 'Service Not Found | PlusPro Services',
    };
  }

  const baseUrl = SITE_URL;
  
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
    alternates: {
      canonical: `${baseUrl}${service.slug}`,
    },
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
  const service = SERVICES.find((s) => s.slug === `/services/${slug}`);
  const details = serviceDetails[slug];

  if (!service || !details) {
    notFound();
  }

  const extended = serviceExtendedContent[slug];
  const faqItems = extended?.faq;

  return (
    <>
      <EnhancedSchema type="Service" serviceName={details.title} serviceId={service.id} locationName="Lower Mainland" />
      <EnhancedSchema type="BreadcrumbList" breadcrumbs={[{ name: "Home", url: "/" }, { name: "Services", url: "/services" }, { name: details.title, url: service.slug }]} />
      {faqItems && faqItems.length > 0 && <EnhancedSchema type="FAQ" faqItems={faqItems} />}
      <div className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 uppercase tracking-tight">{details.title}</h1>
            <p className="text-xl text-slate-600 mb-6">{details.description}</p>
            {extended?.longContent && (
              <div className="prose prose-slate max-w-none text-slate-600 mb-8 whitespace-pre-line">
                {extended.longContent}
              </div>
            )}

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">What We Offer</h2>
                <ul className="space-y-3">
                  {details.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-slate-600">
                      <span className="material-symbols-outlined text-green-600 text-[20px] mt-0.5 flex-shrink-0">check_circle</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {extended?.commonProblems && extended.commonProblems.length > 0 && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Common Problems We Solve</h2>
                  <ul className="space-y-2 text-slate-600">
                    {extended.commonProblems.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="material-symbols-outlined text-[var(--primary-color)] text-[18px] mt-0.5 flex-shrink-0">plumbing</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {extended?.process && extended.process.length > 0 && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Our Process</h2>
                  <ol className="space-y-3 text-slate-600 list-decimal list-inside">
                    {extended.process.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            )}

            {extended?.localMention && (
              <div className="mb-8 p-6 rounded-xl bg-[var(--bg-off-white)] border border-slate-100">
                <p className="text-slate-700 leading-relaxed">{extended.localMention}</p>
              </div>
            )}

            {faqItems && faqItems.length > 0 && (
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Frequently Asked Questions</h2>
                  <dl className="space-y-4">
                    {faqItems.map((item, i) => (
                      <div key={i}>
                        <dt className="font-semibold text-slate-900 mb-1">{item.question}</dt>
                        <dd className="text-slate-600 pl-0">{item.answer}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            )}

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild size="lg" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
                <Link href="/book-service">Book This Service</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/request-quote">Get Free Quote</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${PHONE_DIGITS}`}>
                  <span className="material-symbols-outlined text-[18px] mr-2">call</span>
                  Call Now
                </a>
              </Button>
            </div>

            <div className="bg-white rounded-xl p-8 text-center border border-slate-100 shadow-sm">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Ready to Get Started?</h2>
              <p className="text-slate-600 mb-6">Contact us today for a free quote or to schedule your service.</p>
              <Button asChild size="lg" className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

