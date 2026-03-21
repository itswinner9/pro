import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Reviews & Testimonials | 5-Star Rated PlusPro Services | Lower Mainland BC",
  description: "Read 5-star customer reviews for PlusPro Services. Trusted handyman and plumbing services in Vancouver, Surrey, Burnaby, Richmond, Coquitlam. See what our customers say!",
  keywords: "PlusPro Services reviews, handyman reviews Vancouver, plumbing reviews Surrey, customer testimonials Burnaby, 5 star home repair BC",
  openGraph: {
    title: "Customer Reviews | 5-Star Rated PlusPro Services | Lower Mainland BC",
    description: "Read what our customers say about PlusPro Services. 5-star rated handyman and plumbing services in Lower Mainland, BC.",
    type: "website",
    locale: "en_CA",
    url: "https://pluspro.ca/reviews",
  },
  alternates: {
    canonical: "https://pluspro.ca/reviews",
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Reviews | 5-Star Rated PlusPro Services | Lower Mainland BC",
    description: "Read what our customers say about PlusPro Services. 5-star rated handyman and plumbing services in Lower Mainland, BC.",
    images: ["https://pluspro.ca/og.png"],
  },
};

const reviews = [
  {
    name: "Sarah M.",
    location: "Vancouver",
    rating: 5,
    service: "Drain Cleaning",
    text: "Excellent service! Fixed my drain issue quickly and professionally. The technician was friendly and explained everything clearly. Highly recommend!",
    date: "2024-01-15",
  },
  {
    name: "John D.",
    location: "Surrey",
    rating: 5,
    service: "Bathroom Renovation",
    text: "Great bathroom renovation work. Very happy with the results. The team was professional, clean, and completed the work on time. Will definitely use again.",
    date: "2024-01-10",
  },
  {
    name: "Lisa K.",
    location: "Burnaby",
    rating: 5,
    service: "Plumbing Repairs",
    text: "Fast response and fair pricing. Highly recommend! They fixed my leaky faucet and replaced some old pipes. Great workmanship.",
    date: "2024-01-05",
  },
  {
    name: "Mike R.",
    location: "Richmond",
    rating: 5,
    service: "Tile Installation",
    text: "Professional tile installation in our kitchen. Beautiful work and attention to detail. The team was respectful of our home and cleaned up perfectly.",
    date: "2023-12-28",
  },
  {
    name: "Jennifer L.",
    location: "Coquitlam",
    rating: 5,
    service: "Emergency Repairs",
    text: "Called for an emergency plumbing issue late at night. They responded quickly and fixed the problem efficiently. Very grateful for their service!",
    date: "2023-12-20",
  },
  {
    name: "David T.",
    location: "Delta",
    rating: 5,
    service: "Handyman Services",
    text: "Multiple repairs completed around the house. Professional, reliable, and reasonably priced. Will be calling them for all future repairs.",
    date: "2023-12-15",
  },
  {
    name: "Patricia W.",
    location: "New Westminster",
    rating: 5,
    service: "Plumbing Repairs",
    text: "Had a burst pipe on a Sunday. They came out within an hour. Fair price, fixed it properly. Saved us from major water damage.",
    date: "2023-10-08",
  },
  {
    name: "Robert C.",
    location: "Vancouver",
    rating: 5,
    service: "Drain Cleaning",
    text: "Kitchen drain was backing up for weeks. Tried the store stuff, nothing worked. They cleared it in under an hour. Worth every penny.",
    date: "2023-09-22",
  },
  {
    name: "Amanda F.",
    location: "Burnaby",
    rating: 5,
    service: "Tile Installation",
    text: "Retiled our bathroom floor. Looks brand new. They matched the existing trim and didn’t overcharge for a small job. Very impressed.",
    date: "2023-08-14",
  },
  {
    name: "James L.",
    location: "Surrey",
    rating: 5,
    service: "Handyman Services",
    text: "Fixed a broken cabinet door, loose towel rack, and a few other things in one visit. Efficient and tidy. Good guys.",
    date: "2023-06-03",
  },
  {
    name: "Helen B.",
    location: "Richmond",
    rating: 5,
    service: "Bathroom Repairs",
    text: "Replaced our old toilet and fixed a leak under the sink. All done in one afternoon. Professional from start to finish.",
    date: "2023-04-18",
  },
  {
    name: "Mark S.",
    location: "Coquitlam",
    rating: 5,
    service: "Drain Cleaning",
    text: "Main line blockage in our strata building. They handled everything, even coordinated with the property manager. Smooth process.",
    date: "2023-02-11",
  },
  {
    name: "Carolyn K.",
    location: "Vancouver",
    rating: 5,
    service: "Emergency Repairs",
    text: "Water heater died on a holiday weekend. Thought we’d be stuck. They came out, diagnosed it, had a temporary fix same day. Lifesavers.",
    date: "2022-12-28",
  },
  {
    name: "Tom P.",
    location: "Delta",
    rating: 5,
    service: "Plumbing Repairs",
    text: "Used them twice now—once for a leak, once for drain cleaning. Both times: on time, honest, good work. My go-to plumber.",
    date: "2022-11-05",
  },
  {
    name: "Nancy H.",
    location: "Burnaby",
    rating: 5,
    service: "Handyman Services",
    text: "Had a list of small things I’d been putting off. They knocked them all out in one visit. Reasonable rate. Will book again.",
    date: "2022-09-20",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pluspro.ca";
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateRatingSchema) }}
      />
      <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6 text-center">
            Customer Reviews
          </h1>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-2xl font-semibold">5.0</span>
            </div>
            <p className="text-lg text-dark/80">
              Based on {reviews.length} customer reviews
            </p>
          </div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{review.name}</h3>
                      <p className="text-sm text-gray-600">{review.location} • {review.service}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-dark/80 mb-2">{review.text}</p>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center bg-white rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-4">Share Your Experience</h2>
            <p className="text-dark/80 mb-6">
              Have you used our services? We&apos;d love to hear from you!
            </p>
            <p className="text-sm text-gray-600">
              Leave us a review on Google or contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

