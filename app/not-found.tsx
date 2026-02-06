import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h1 className="text-4xl font-quantum text-primary mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
            <p className="text-dark/80 mb-6">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <Button asChild size="lg">
              <Link href="/">Return Home</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

