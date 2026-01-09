"use client";

import { Button } from "@/components/ui/button";
import { Map, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-b from-background to-muted/30 p-6">
      <div className="max-w-md w-full text-center space-y-10">
        {/* 404 Visual */}
        <div className="relative flex justify-center">
          <span className="text-[12rem] font-black text-muted/20 absolute -top-20 select-none">
            404
          </span>
          <div className="relative z-10 bg-background p-5 rounded-2xl shadow-xl border">
            <Map className="h-20 w-20 text-primary animate-bounce" />
          </div>
        </div>

        {/* Text Area */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight">
            You&apos;ve Gone Off the Map
          </h2>
          <p className="text-muted-foreground">
            The destination you are looking for doesn&apos;t exist or has been
            moved to a new secret location.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
          <Button asChild className="gap-2 px-8">
            <Link href="/">
              <Home className="h-4 w-4" />
              Explore Other Tours
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
