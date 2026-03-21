import type { Metadata } from "next";
import { Montserrat, Syncopate } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import EnhancedSchema from "@/components/seo/EnhancedSchema";
import TrackingScripts from "@/components/seo/TrackingScripts";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
const syncopate = Syncopate({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syncopate",
});

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  title: "PlusPro Home | Professional Repair Services",
  description: "Professional handyman, plumbing, drain cleaning, and bathroom repair services in Lower Mainland, British Columbia. Fast, reliable, and insured. Get a free quote today!",
  keywords: "handyman, plumbing, drain cleaning, bathroom repairs, tile installation, Lower Mainland, Vancouver, Surrey, Burnaby",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "PlusPro Services | Handyman, Plumbing & Drain Cleaning",
    description: "Professional handyman, plumbing, drain cleaning, and bathroom repair services in Lower Mainland, British Columbia.",
    type: "website",
    locale: "en_CA",
    url: baseUrl,
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: "PlusPro Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "PlusPro Services | Handyman, Plumbing & Drain Cleaning",
    description: "Professional handyman, plumbing, drain cleaning, and bathroom repair services in Lower Mainland, British Columbia.",
    images: [`${baseUrl}/og.png`],
  },
  ...(gscVerification && {
    verification: { google: gscVerification },
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontClass = `${montserrat.variable} ${syncopate.variable} ${montserrat.className} antialiased min-h-screen`;

  return (
    <html lang="en">
      <head>
        <EnhancedSchema type="LocalBusiness" />
      </head>
      <body className={fontClass}>
        <TrackingScripts />
        <ConditionalHeader />
        <main className="pt-0 min-h-screen">{children}</main>
        <ConditionalFooter />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
