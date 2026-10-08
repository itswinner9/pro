import { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Careers | Home Maintenance Jobs Lower Mainland BC",
  description:
    "Join PlusPro. We're hiring for home maintenance, handyman, and plumbing work in Vancouver, Surrey, and Burnaby. Send your resume and work photos.",
  keywords: "home maintenance jobs Vancouver, handyman jobs Lower Mainland, plumber jobs Surrey, careers PlusPro, trades jobs Burnaby BC",
  openGraph: {
    title: "Careers at PlusPro | Home Maintenance Jobs Lower Mainland BC",
    description:
      "We're hiring for home maintenance, handyman, and plumbing work. Apply with resume and work photos.",
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/careers`,
  },
  alternates: { canonical: `${SITE_URL}/careers` },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
