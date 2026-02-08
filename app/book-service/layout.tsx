import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Service | PlusPro Services | Lower Mainland BC",
  description: "Book professional home repair services in Lower Mainland, BC. Serving Vancouver, Surrey, Burnaby, Richmond, Coquitlam. Same-day service available. Licensed & insured.",
  keywords: "book handyman Lower Mainland, schedule plumbing Vancouver, book service Surrey, home repair booking BC, emergency repair Lower Mainland",
  openGraph: {
    title: "Book Service | PlusPro Services | Lower Mainland BC",
    description: "Book professional home repair services in Lower Mainland, BC. Fast, reliable, licensed & insured.",
    type: "website",
    locale: "en_CA",
  },
  alternates: {
    canonical: "https://plusproservices.ca/book-service",
  },
};

export default function BookServiceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

