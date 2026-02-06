import { SERVICES, LOCATIONS } from "@/lib/types";
import { PHONE_NUMBER, EMAIL } from "@/lib/utils";

interface JsonLdProps {
  type?: "LocalBusiness" | "Service" | "Review" | "FAQ";
  data?: any;
}

export default function JsonLd({ type = "LocalBusiness", data }: JsonLdProps) {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
  };

  let schema: any = { ...baseSchema };

  if (type === "LocalBusiness") {
    schema = {
      ...baseSchema,
      name: "PlusPro Services",
      description: "Professional handyman, plumbing, drain cleaning, and repair services in Lower Mainland, British Columbia",
      url: "https://plusproservices.ca",
      telephone: PHONE_NUMBER,
      email: EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lower Mainland",
        addressRegion: "BC",
        addressCountry: "CA",
      },
      areaServed: LOCATIONS.map((loc) => ({
        "@type": "City",
        name: loc.name,
      })),
      serviceType: SERVICES.map((s) => s.title),
      priceRange: "$$",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

