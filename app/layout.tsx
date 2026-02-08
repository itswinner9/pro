import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import EnhancedSchema from "@/components/seo/EnhancedSchema";
import TrackingScripts from "@/components/seo/TrackingScripts";

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
    <ClerkProvider>
      <html lang="en">
        <head>
          <EnhancedSchema type="LocalBusiness" />
        </head>
        <body className="antialiased min-h-screen">
          <TrackingScripts />
          <ConditionalHeader />
          <main className="pt-0 min-h-screen">{children}</main>
          <ConditionalFooter />
        </body>
      </html>
    </ClerkProvider>
  );
}

