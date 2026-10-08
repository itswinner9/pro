import { SERVICES, LOCATIONS } from "@/lib/types";
import { PHONE_NUMBER, EMAIL, SITE_URL } from "@/lib/utils";

/**
 * Root-level schemas for SEO: WebSite, Organization, LocalBusiness.
 * Helps Google generate sitelinks and Knowledge Panel.
 */
export default function RootSchemas() {
  const baseUrl = SITE_URL;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    name: "PlusPro Services",
    alternateName: "PlusPro",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    image: `${baseUrl}/logo.png`,
    description:
      "Home maintenance, plumbing, drain cleaning, and handyman service in Lower Mainland, British Columbia. Fast, licensed, and insured.",
    sameAs: [] as string[], // Add Google Business Profile, Facebook, Instagram URLs when available
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE_NUMBER,
      email: EMAIL,
      contactType: "customer service",
      areaServed: "CA",
      availableLanguage: "English",
      url: `${baseUrl}/contact`,
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "19:00",
      },
    },
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: "PlusPro Services | Home Maintenance, Plumbing & Handyman",
    alternateName: "PlusPro Services",
    url: baseUrl,
    description:
      "Home maintenance, plumbing, drain cleaning, bathroom repairs, and handyman service in Vancouver, Surrey, Burnaby, Richmond, Coquitlam, and Lower Mainland BC.",
    publisher: { "@id": `${baseUrl}/#organization` },
    inLanguage: "en-CA",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    name: "PlusPro Services",
    image: `${baseUrl}/logo.png`,
    description:
      "Home maintenance, plumbing, drain cleaning, and handyman service in Lower Mainland, British Columbia. Fast, licensed, and insured.",
    url: baseUrl,
    telephone: PHONE_NUMBER,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lower Mainland",
      addressRegion: "BC",
      addressCountry: "CA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "49.2827",
      longitude: "-123.1207",
    },
    areaServed: LOCATIONS.map((loc) => ({
      "@type": "City",
      name: loc.name,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
        name: "Home Maintenance and Repair Services",
      itemListElement: SERVICES.map((service, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: `${baseUrl}${service.slug}`,
        },
        position: index + 1,
      })),
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "08:00",
        closes: "17:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      bestRating: "5",
      reviewCount: "50",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
