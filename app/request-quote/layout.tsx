import { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Free Quote | Home Maintenance Lower Mainland BC",
  description: "Get a free quote for home maintenance, plumbing, drain cleaning, and handyman work in Vancouver, Surrey, Burnaby, and the Lower Mainland. No obligation.",
  keywords: "home maintenance quote Lower Mainland, plumbing estimate Vancouver, handyman quote Surrey, drain cleaning quote Burnaby",
  openGraph: {
    title: "Free Quote | Home Maintenance Lower Mainland BC",
    description: "Get a free quote for home maintenance, plumbing, and handyman service in Lower Mainland, BC.",
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/request-quote`,
  },
  alternates: {
    canonical: `${SITE_URL}/request-quote`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Quote | Home Maintenance Lower Mainland BC",
    description: "Get a free quote for home maintenance, plumbing, and handyman service in Lower Mainland, BC.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function RequestQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

