"use client";

import { Button } from "@/components/ui/button";
import { Compass, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/30 p-6">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Icon Area */}
        <div className="flex justify-center">
          <div className="p-6 bg-destructive/10 rounded-full animate-pulse">
            <Compass className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tighter">
            Your Compass is Stuck!
          </h1>
          <p className="text-muted-foreground">
            Even the best explorers take a wrong turn. An unexpected error
            occurred while loading your tour details.
          </p>
        </div>

        {/* Developer Info (Only in Dev) */}
        {process.env.NODE_ENV === "development" && (
          <div className="p-4 bg-muted rounded-md text-left text-xs font-mono overflow-auto max-h-32 border">
            {error.message}
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} className="gap-2">
            <RefreshCcw className="h-4 w-4" />
            Recalibrate (Try Again)
          </Button>
          <Button variant="outline" asChild className="gap-2">
            <Link href="/">
              <Home className="h-4 w-4" />
              Return to Base
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
