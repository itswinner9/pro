import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/types";
import { Phone, MapPin, MessageCircle } from "lucide-react";
import { PHONE_NUMBER, WHATSAPP_LINK } from "@/lib/utils";
import { AREA_PAGES, getAreaBySlug } from "@/lib/seo-pages";
import { AREA_CONTENT } from "@/lib/seo-content";
import EnhancedSchema from "@/components/seo/EnhancedSchema";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return AREA_PAGES.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  if (!area) return { title: "Area Not Found | PlusPro Services" };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
  const title = `Handyman & Plumbing ${area.title} | PlusPro Services`;
  const description = `Professional handyman, plumbing, drain cleaning & repairs in ${area.title}. Licensed, insured, same-day service. Call or request a quote.`;
  return {
    title,
    description,
    keywords: `handyman ${area.name}, plumbing ${area.name}, drain cleaning ${area.name}, home repair ${area.name} BC`,
    openGraph: { title, description, type: "website", locale: "en_CA", url: `${baseUrl}/areas/${slug}` },
    alternates: { canonical: `${baseUrl}/areas/${slug}` },
    twitter: { card: "summary_large_image", title, description, images: [`${baseUrl}/og.png`] },
  };
}

export default async function AreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getAreaBySlug(slug);
  const content = area ? AREA_CONTENT[slug] : null;

  if (!area || !content) notFound();

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `PlusPro Services - ${area.name}`,
    description: content.intro,
    url: `${baseUrl}/areas/${slug}`,
    telephone: PHONE_NUMBER,
    address: { "@type": "PostalAddress", addressLocality: area.name, addressRegion: "BC", addressCountry: "CA" },
    areaServed: { "@type": "City", name: area.name },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <EnhancedSchema type="BreadcrumbList" breadcrumbs={[{ name: "Home", url: "/" }, { name: "Service Areas", url: "/#areas" }, { name: area.title, url: `/areas/${slug}` }]} />
      <div className="py-16 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-8">
              <CardContent className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-lg font-semibold text-primary">{PHONE_NUMBER}</p>
                  <p className="text-sm text-dark/80">Call or WhatsApp · Same-day available</p>
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
              Handyman & Plumbing Services in {area.title}
            </h1>
            <p className="text-xl text-dark/80 mb-6">{content.intro}</p>
            <div className="prose prose-slate max-w-none mb-8">
              {content.body.map((p, i) => (
                <p key={i} className="text-dark/80 mb-4">{p}</p>
              ))}
            </div>

            <Card className="mb-8">
              <CardContent className="pt-6">
                <h2 className="text-2xl font-semibold mb-4">Services in {area.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <Link key={s.id} href={s.slug} className="flex items-center gap-2 p-3 rounded-lg hover:bg-background transition-colors">
                      <span className="text-dark">{s.title}</span>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>

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

            <div className="bg-white rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-primary" />
                <div>
                  <h2 className="text-xl font-semibold">Serving {area.title}</h2>
                  <p className="text-dark/80">Lower Mainland, BC</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="lg"><Link href="/book-service">Book Service</Link></Button>
                <Button asChild variant="outline" size="lg"><Link href="/contact">Contact</Link></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
