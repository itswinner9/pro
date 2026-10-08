import { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Book Home Maintenance | PlusPro | Lower Mainland BC",
  description: "Book home maintenance, plumbing, or handyman service in Vancouver, Surrey, Burnaby, and the Lower Mainland. Same-day visits available. Licensed and insured.",
  keywords: "book home maintenance Lower Mainland, schedule plumbing Vancouver, book handyman Surrey, emergency repair Lower Mainland",
  openGraph: {
    title: "Book Home Maintenance | PlusPro | Lower Mainland BC",
    description: "Book home maintenance, plumbing, or handyman service in Lower Mainland, BC. Fast, licensed, and insured.",
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: `${SITE_URL}/book-service`,
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Home Maintenance | PlusPro | Lower Mainland BC",
    description: "Book home maintenance, plumbing, or handyman service in Lower Mainland, BC. Fast, licensed, and insured.",
    images: [`${SITE_URL}/og.png`],
  },
};

export default function BookServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

