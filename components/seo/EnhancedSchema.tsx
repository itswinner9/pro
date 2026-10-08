import { SERVICES, LOCATIONS } from "@/lib/types";
import { PHONE_NUMBER, EMAIL, SITE_URL } from "@/lib/utils";

interface EnhancedSchemaProps {
  type: "LocalBusiness" | "Service" | "FAQ" | "BreadcrumbList" | "Article";
  data?: any;
  serviceName?: string;
  serviceId?: string;
  locationName?: string;
  faqItems?: Array<{ question: string; answer: string }>;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export default function EnhancedSchema({
  type,
  data,
  serviceName,
  serviceId,
  locationName,
  faqItems,
  breadcrumbs,
}: EnhancedSchemaProps) {
  const baseUrl = SITE_URL;

  let schema: any = {
    "@context": "https://schema.org",
    "@type": type,
  };

  if (type === "LocalBusiness") {
    schema = {
      ...schema,
      "@id": `${baseUrl}/#organization`,
      name: "PlusPro Services",
      image: `${baseUrl}/logo.png`,
      description:
        "Home maintenance, plumbing, drain cleaning, and handyman service in Lower Mainland, British Columbia. Fast, licensed, and insured.",
      url: baseUrl,
      telephone: PHONE_NUMBER,
      email: EMAIL,
      sameAs: [],
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
        reviewCount: "50",
      },
    };
  }

  if (type === "Service" && (serviceName || serviceId)) {
    const service = SERVICES.find(
      (s) =>
        s.id === serviceId ||
        s.slug === `/services/${serviceId}` ||
        s.title === serviceName
    );
    schema = {
      ...schema,
      name: service?.title || serviceName,
      description: service?.description || `${serviceName || service?.title} in Lower Mainland, BC`,
      url: service ? `${baseUrl}${service.slug}` : undefined,
      provider: {
        "@type": "LocalBusiness",
        name: "PlusPro Services",
        telephone: PHONE_NUMBER,
      },
      areaServed: {
        "@type": "City",
        name: locationName || "Lower Mainland",
      },
      serviceType: service?.title || serviceName,
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

