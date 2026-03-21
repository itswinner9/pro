import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Request Free Quote | PlusPro Services | Lower Mainland BC",
  description: "Get a free quote for handyman, plumbing, drain cleaning & repair services in Vancouver, Surrey, Burnaby, Richmond, Coquitlam. Fast, accurate estimates. No obligation.",
  keywords: "free quote Lower Mainland, handyman estimate Vancouver, plumbing quote Surrey, repair estimate Burnaby, get quote BC",
  openGraph: {
    title: "Request Free Quote | PlusPro Services | Lower Mainland BC",
    description: "Get a free quote for professional home repair services in Lower Mainland, BC. Fast, accurate estimates.",
    type: "website",
    locale: "en_CA",
    url: "https://pluspro.ca/request-quote",
  },
  alternates: {
    canonical: "https://pluspro.ca/request-quote",
  },
  twitter: {
    card: "summary_large_image",
    title: "Request Free Quote | PlusPro Services | Lower Mainland BC",
    description: "Get a free quote for professional home repair services in Lower Mainland, BC. Fast, accurate estimates.",
    images: ["https://pluspro.ca/og.png"],
  },
};

export default function RequestQuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

