import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle, Phone } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/utils";

export const metadata = {
  title: "About Us | PlusPro Services | Lower Mainland BC",
  description: "Learn about PlusPro Services - your trusted local handyman and plumbing experts in Lower Mainland, British Columbia.",
};

export default function AboutPage() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6 text-center">
            About PlusPro Services
          </h1>
          <p className="text-xl text-dark/80 mb-12 text-center">
            Your trusted local experts for handyman, plumbing, and repair services in Lower Mainland, British Columbia.
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Who We Are</h2>
              <p className="text-dark/80 mb-4">
                PlusPro Services is a locally owned and operated business serving the Lower Mainland area. We specialize in providing professional, reliable, and affordable handyman, plumbing, drain cleaning, and repair services.
              </p>
              <p className="text-dark/80">
                With years of experience and a commitment to excellence, we've built a reputation for quality workmanship, fair pricing, and exceptional customer service. Our team of skilled professionals is fully licensed, insured, and dedicated to solving your home repair needs.
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
                <p className="text-dark/80">
                  To provide exceptional home repair and maintenance services that exceed our customers' expectations, while maintaining the highest standards of professionalism and integrity.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-4">Our Values</h3>
                <ul className="space-y-2 text-dark/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Quality craftsmanship</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Honest, transparent pricing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Customer satisfaction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>Reliable service</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Fully licensed and insured",
                  "Experienced professionals",
                  "Fast response times",
                  "Competitive pricing",
                  "Satisfaction guaranteed",
                  "24/7 emergency services",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-dark/80">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Work With Us?</h2>
            <p className="text-dark/80 mb-6">
              Contact us today to learn more about our services or to schedule an appointment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
                  <Phone className="w-5 h-5 mr-2" />
                  Call: {PHONE_NUMBER}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

