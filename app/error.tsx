"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="py-16 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto text-center">
          <CardContent className="pt-6">
            <h1 className="text-4xl font-quantum text-primary mb-4">Something went wrong!</h1>
            <p className="text-dark/80 mb-6 break-words">
              {error.message || "An unexpected error occurred"}
            </p>
            {error.message?.toLowerCase().includes("publishablekey") && (
              <p className="text-sm text-muted-foreground mb-4">
                Add <code className="bg-muted px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code> and{" "}
                <code className="bg-muted px-1 rounded">CLERK_SECRET_KEY</code> to .env.local (or your host&apos;s env vars). Get keys at{" "}
                <a href="https://dashboard.clerk.com/last-active?path=api-keys" target="_blank" rel="noopener noreferrer" className="text-primary underline">dashboard.clerk.com</a>.
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={reset} size="lg">
                Try again
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

