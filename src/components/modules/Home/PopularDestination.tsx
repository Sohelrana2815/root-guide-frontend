import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { ITour } from "@/types/tour.interface";
import SectionHeader from "./SectionHeader";

interface PopularDestinationProps {
  tours?: ITour[];
}

const PopularDestinations = ({ tours }: PopularDestinationProps) => {
  // Guard the incoming `tours` so non-array values won't crash SSR
  const safeTours = Array.isArray(tours) ? tours : [];
  // Filter for high ratings and slice
  const topRatedTours = safeTours
    // .filter((t) => (t.averageRating ?? 0) >= 4)
    .slice(0, 6);
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionHeader
        title="Popular Destinations"
        subtitle="Handpicked tours with the best local guides and highest traveler ratings."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {topRatedTours.map((tour: ITour) => (
          <Card
            key={tour._id}
            className="group border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Standardized Image Container (Flush with top/sides) */}
            <div className="relative aspect-4/3 w-full overflow-hidden">
              {tour.image ? (
                <Image
                  src={tour.image || "/placeholder.png"}
                  alt={tour.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="bg-muted flex items-center justify-center h-full w-full">
                  <MapPin className="h-10 w-10 text-muted-foreground/20" />
                </div>
              )}

              {/* Category Badge - Glassmorphism Style */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background border-none px-3 py-1 font-bold shadow-sm">
                  {tour.category || "Tour"}
                </Badge>
              </div>
            </div>

            {/* Content Section - Standardized p-5 padding */}
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs uppercase tracking-widest font-semibold">
                    {tour.city}
                  </span>
                </div>

                {/* Rating with review count */}
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold">
                    {tour.averageRating?.toFixed(1) || "0.0"}
                  </span>
                  <span className="text-[10px] text-muted-foreground font-medium">
                    ({tour.reviewCount || "0"})
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
                {tour.title}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {tour.description ||
                  "Experience the local culture and hidden gems of this amazing destination."}
              </p>
            </CardContent>

            {/* Standardized Footer with Border Separation */}
            <CardFooter className="px-5 py-4 flex items-center justify-between border-t border-border/50 bg-slate-50/50 dark:bg-transparent">
              <div className="flex flex-col">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">
                  Starting From
                </span>
                <span className="text-lg font-bold text-blue-600">
                  ${tour.price}
                </span>
              </div>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full px-5 dark:border-none  transition-all bg-blue-100 hover:bg-blue-200 dark:hover:text-blue-500"
              >
                <Link href={`/tours/${tour._id}`}>Details</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularDestinations;
