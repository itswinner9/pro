import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import { SITE_URL } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Customer Reviews | PlusPro Home Maintenance Lower Mainland",
  description: "Read 5-star reviews for PlusPro. Home maintenance, plumbing, and handyman service in Vancouver, Surrey, Burnaby, and the Lower Mainland.",
  keywords: "PlusPro reviews, home maintenance reviews Vancouver, plumbing reviews Surrey, handyman testimonials Burnaby",
  openGraph: {
    title: "Customer Reviews | PlusPro Home Maintenance Lower Mainland",
    description: "Read what customers say about PlusPro home maintenance, plumbing, and handyman service in Lower Mainland, BC.",
    type: "website",
    locale: "en_CA",
    url: `${SITE_URL}/reviews`,
  },
  alternates: { canonical: `${SITE_URL}/reviews` },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | PlusPro Home Maintenance Lower Mainland",
    description: "Read what customers say about PlusPro home maintenance, plumbing, and handyman service.",
    images: [`${SITE_URL}/og.png`],
  },
};

const reviews = [
  { name: "Sarah M.", location: "Vancouver", rating: 5, service: "Drain Cleaning", text: "Excellent service! Fixed my drain issue quickly and professionally. The technician was friendly and explained everything clearly. Highly recommend!", date: "2024-01-15" },
  { name: "John D.", location: "Surrey", rating: 5, service: "Bathroom Renovation", text: "Great bathroom renovation work. Very happy with the results. The team was professional, clean, and completed the work on time. Will definitely use again.", date: "2024-01-10" },
  { name: "Lisa K.", location: "Burnaby", rating: 5, service: "Plumbing Repairs", text: "Fast response and fair pricing. Highly recommend! They fixed my leaky faucet and replaced some old pipes. Great workmanship.", date: "2024-01-05" },
  { name: "Mike R.", location: "Richmond", rating: 5, service: "Tile Installation", text: "Professional tile installation in our kitchen. Beautiful work and attention to detail. The team was respectful of our home and cleaned up perfectly.", date: "2023-12-28" },
  { name: "Jennifer L.", location: "Coquitlam", rating: 5, service: "Emergency Repairs", text: "Called for an emergency plumbing issue late at night. They responded quickly and fixed the problem efficiently. Very grateful for their service!", date: "2023-12-20" },
  { name: "David T.", location: "Delta", rating: 5, service: "Handyman Services", text: "Multiple repairs completed around the house. Professional, reliable, and reasonably priced. Will be calling them for all future repairs.", date: "2023-12-15" },
];

const baseUrl = SITE_URL;
const aggregateRatingSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "PlusPro Services",
  url: baseUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    worstRating: "1",
    reviewCount: String(reviews.length),
  },
  review: reviews.map((r) => ({
    "@type": "Review",
    author: { "@type": "Person", name: r.name },
    datePublished: r.date,
    reviewRating: { "@type": "Rating", ratingValue: String(r.rating), bestRating: "5" },
    reviewBody: r.text,
  })),
};

export default function ReviewsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }} />
      <div className="py-16 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-[var(--primary-color)] mb-6 text-center uppercase tracking-tight">Customer Reviews</h1>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="font-heading ml-2 text-2xl font-semibold text-slate-900">5.0</span>
              </div>
              <p className="text-lg text-slate-600">Based on {reviews.length} customer reviews</p>
            </div>

            <div className="space-y-6">
              {reviews.map((review, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-slate-900">{review.name}</h3>
                        <p className="text-sm text-slate-500">{review.location} • {review.service}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-slate-600 mb-2">{review.text}</p>
                    <p className="text-sm text-slate-500">{review.date}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center bg-slate-50 rounded-xl p-8 border border-slate-100">
              <h2 className="font-heading text-2xl font-semibold mb-4 text-slate-900 uppercase tracking-tight">Share Your Experience</h2>
              <p className="text-slate-600 mb-6">Have you used our services? We&apos;d love to hear from you!</p>
              <p className="text-sm text-slate-500 mb-6">Leave us a review on Google or contact us directly.</p>
              <Button asChild className="bg-[var(--primary-color)] hover:bg-[var(--primary-color)]/90">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
