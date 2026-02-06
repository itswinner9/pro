import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export const metadata = {
  title: "Customer Reviews | PlusPro Services",
  description: "Read what our customers say about PlusPro Services. 5-star rated handyman and plumbing services in Lower Mainland, BC.",
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
];

export default function ReviewsPage() {
  return (
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
              Have you used our services? We'd love to hear from you!
            </p>
            <p className="text-sm text-gray-600">
              Leave us a review on Google or contact us directly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

