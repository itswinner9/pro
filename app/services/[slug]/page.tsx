import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICES } from "@/lib/types";
import { Phone, CheckCircle } from "lucide-react";
import { PHONE_NUMBER } from "@/lib/utils";

interface PageProps {
  params: {
    slug: string;
  };
}

const serviceDetails: Record<string, {
  title: string;
  description: string;
  features: string[];
  metaDescription: string;
}> = {
  'drain-cleaning': {
    title: 'Drain Cleaning Services',
    description: 'Professional drain cleaning services to keep your pipes flowing smoothly. We handle everything from simple clogs to complex sewer line issues.',
    features: [
      'Sink and toilet drain cleaning',
      'Sewer line inspection and cleaning',
      'Hydro jetting services',
      'Preventive maintenance',
      'Emergency drain services',
    ],
    metaDescription: 'Expert drain cleaning services in Lower Mainland, BC. Fast, reliable solutions for clogged drains, sinks, toilets, and sewer lines.',
  },
  'plumbing-repairs': {
    title: 'Plumbing Repairs',
    description: 'Comprehensive plumbing repair services for leaks, pipe issues, water heaters, and more. Fast, reliable solutions for all your plumbing needs.',
    features: [
      'Leak detection and repair',
      'Pipe repair and replacement',
      'Water heater services',
      'Fixture installation',
      'Emergency plumbing repairs',
    ],
    metaDescription: 'Professional plumbing repair services in Lower Mainland, BC. Expert solutions for leaks, pipes, water heaters, and emergency repairs.',
  },
  'bathroom-repairs': {
    title: 'Bathroom Repairs & Renovations',
    description: 'Complete bathroom repair and renovation services. From small fixes to full remodels, we handle it all with precision and care.',
    features: [
      'Bathroom renovations',
      'Fixture replacement',
      'Shower and tub repairs',
      'Vanity installation',
      'Plumbing updates',
    ],
    metaDescription: 'Expert bathroom repair and renovation services in Lower Mainland, BC. Professional installations and repairs for all bathroom needs.',
  },
  'tile-installation': {
    title: 'Tile Installation & Fixing',
    description: 'Professional tile installation, repair, and grout services. Beautiful, durable results for floors, walls, and backsplashes.',
    features: [
      'Floor tile installation',
      'Wall tile installation',
      'Tile repair and replacement',
      'Grout cleaning and sealing',
      'Backsplash installation',
    ],
    metaDescription: 'Professional tile installation and repair services in Lower Mainland, BC. Expert tile work for bathrooms, kitchens, and more.',
  },
  'handyman-services': {
    title: 'Handyman Services',
    description: 'General handyman services for all your home repair and maintenance needs. One call, multiple solutions.',
    features: [
      'General repairs',
      'Drywall patching',
      'Painting',
      'Furniture assembly',
      'Minor electrical work',
    ],
    metaDescription: 'Professional handyman services in Lower Mainland, BC. Expert repairs and maintenance for your home.',
  },
  'emergency-repairs': {
    title: 'Emergency Repairs',
    description: '24/7 emergency repair services for urgent plumbing and home issues. Fast response when you need it most.',
    features: [
      '24/7 availability',
      'Fast response times',
      'Emergency plumbing',
      'Water damage prevention',
      'Urgent repairs',
    ],
    metaDescription: '24/7 emergency repair services in Lower Mainland, BC. Fast response for urgent plumbing and home repair needs.',
  },
};

export async function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug.replace('/services/', ''),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const service = SERVICES.find((s) => s.slug === `/services/${params.slug}`);
  const details = serviceDetails[params.slug];
  
  if (!service || !details) {
    return {
      title: 'Service Not Found | PlusPro Services',
    };
  }

  return {
    title: `${details.title} | PlusPro Services`,
    description: details.metaDescription,
  };
}

export default function ServicePage({ params }: PageProps) {
  const service = SERVICES.find((s) => s.slug === `/services/${params.slug}`);
  const details = serviceDetails[params.slug];

  if (!service || !details) {
    notFound();
  }

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-quantum text-primary mb-6">
            {details.title}
          </h1>
          <p className="text-xl text-dark/80 mb-8">
            {details.description}
          </p>

          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
              <ul className="space-y-3">
                {details.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button asChild size="lg">
              <Link href="/book-service">Book This Service</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/request-quote">Get Free Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={`tel:${PHONE_NUMBER.replace(/\D/g, '')}`}>
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </a>
            </Button>
          </div>

          <div className="bg-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to Get Started?</h2>
            <p className="text-dark/80 mb-6">
              Contact us today for a free quote or to schedule your service.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

