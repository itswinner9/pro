import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "PlusPro Home | Professional Repair Services",
  description: "Professional handyman, plumbing, drain cleaning, and bathroom repair services in Lower Mainland, British Columbia. Fast, reliable, and insured. Get a free quote today!",
  keywords: "handyman, plumbing, drain cleaning, bathroom repairs, tile installation, Lower Mainland, Vancouver, Surrey, Burnaby",
  openGraph: {
    title: "PlusPro Services | Handyman, Plumbing & Drain Cleaning",
    description: "Professional handyman, plumbing, drain cleaning, and bathroom repair services in Lower Mainland, British Columbia.",
    type: "website",
    locale: "en_CA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <JsonLd type="LocalBusiness" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

