import type { Metadata } from "next";
import { Montserrat, Syncopate } from "next/font/google";
import "./globals.css";
import ConditionalHeader from "@/components/layout/ConditionalHeader";
import ConditionalFooter from "@/components/layout/ConditionalFooter";
import RootSchemas from "@/components/seo/RootSchemas";
import TrackingScripts from "@/components/seo/TrackingScripts";
import { SITE_URL } from "@/lib/utils";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
});

const syncopate = Syncopate({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
  variable: "--font-syncopate",
});

const baseUrl = SITE_URL;
const gscVerification = process.env.NEXT_PUBLIC_GSC_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Home Maintenance, Plumbing & Handyman in Lower Mainland BC",
  description: "Home maintenance, licensed plumbing, and handyman service in Vancouver, Surrey & Burnaby. Drain cleaning, seasonal upkeep, emergency repairs. Free quote!",
  keywords: "home maintenance Lower Mainland, plumber Vancouver, handyman Surrey, drain cleaning Burnaby, home upkeep BC, emergency plumbing",
  openGraph: {
    title: "Home Maintenance, Plumbing & Handyman in Lower Mainland BC",
    description: "Home maintenance, licensed plumbing, and handyman service in Vancouver, Surrey & Burnaby. Drain cleaning, seasonal upkeep, emergency repairs. Free quote!",
    type: "website",
    locale: "en_CA",
    url: baseUrl,
    images: [{ url: `${baseUrl}/og.png`, width: 1200, height: 630, alt: "PlusPro Services" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Home Maintenance, Plumbing & Handyman in Lower Mainland BC",
    description: "Home maintenance, licensed plumbing, and handyman service in Vancouver, Surrey & Burnaby. Drain cleaning, seasonal upkeep, emergency repairs. Free quote!",
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
  return (
    <html lang="en">
      <head>
        <RootSchemas />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${montserrat.variable} ${montserrat.className} ${syncopate.variable} min-h-screen bg-[var(--bg-off-white)] text-slate-900 antialiased`}>
        <TrackingScripts />
        <ConditionalHeader />
        <main className="pt-0 min-h-screen">{children}</main>
        <ConditionalFooter />
      </body>
    </html>
  );
}
