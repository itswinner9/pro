import { SERVICES, LOCATIONS } from "@/lib/types";
import { PHONE_NUMBER, EMAIL } from "@/lib/utils";

interface EnhancedSchemaProps {
  type: "LocalBusiness" | "Service" | "FAQ" | "BreadcrumbList" | "Article";
  data?: any;
  serviceName?: string;
  locationName?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function EnhancedSchema({
  type,
  data,
  serviceName,
  locationName,
  faqItems,
  breadcrumbs,
}: EnhancedSchemaProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://plusproservices.ca";

  let schema: any = {
    "@context": "https://schema.org",
    "@type": type,
  };

  if (type === "LocalBusiness") {
    schema = {
      ...schema,
      name: "PlusPro Services",
      description:
        "Professional handyman, plumbing, drain cleaning, and repair services in Lower Mainland, British Columbia. Fast, reliable, licensed & insured.",
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
        name: "Home Repair Services",
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
        reviewCount: "50",
      },
    };
  }

  if (type === "Service" && serviceName) {
    const service = SERVICES.find((s) => s.title === serviceName);
    schema = {
      ...schema,
      name: serviceName,
      description: service?.description || `${serviceName} in Lower Mainland, BC`,
      provider: {
        "@type": "LocalBusiness",
        name: "PlusPro Services",
        telephone: PHONE_NUMBER,
      },
      areaServed: {
        "@type": "City",
        name: locationName || "Lower Mainland",
      },
      serviceType: serviceName,
    };
  }

  if (type === "FAQ" && faqItems) {
    schema = {
      ...schema,
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };
  }

  if (type === "BreadcrumbList" && breadcrumbs) {
    schema = {
      ...schema,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${baseUrl}${crumb.url}`,
      })),
    };
  }

  if (type === "Article" && data) {
    schema = {
      ...schema,
      headline: data.headline,
      description: data.description,
      image: data.image,
      datePublished: data.datePublished,
      dateModified: data.dateModified || data.datePublished,
      author: {
        "@type": "Organization",
        name: "PlusPro Services",
      },
      publisher: {
        "@type": "Organization",
        name: "PlusPro Services",
        logo: {
          "@type": "ImageObject",
          url: `${baseUrl}/logo.png`,
        },
      },
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

