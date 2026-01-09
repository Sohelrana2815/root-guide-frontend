import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star } from "lucide-react";
import { ITour } from "@/types/tour.interface";
import SectionHeader from "./SectionHeader";

interface PopularDestinationProps {
  tours: ITour[];
}

const PopularDestinations = ({ tours }: PopularDestinationProps) => {
  // Filter for high ratings and slice
  const topRatedTours = tours
    // .filter((t) => (t.averageRating ?? 0) >= 4)
    .slice(0, 6);
  return (
    <section className="container mx-auto px-4 py-16">
      <SectionHeader
        title="Popular Destinations"
        subtitle="Handpicked tours with the best local guides and highest traveler ratings."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {topRatedTours.map((tour: ITour) => (
          <Card
            key={tour._id}
            className="overflow-hidden group border-none shadow-sm hover:shadow-md transition-all"
          >
            {/* Image Section */}
            <div className="relative aspect-4/3 overflow-hidden">
              {tour.image ? (
                <Image
                  src={tour.image || "/placeholder.png"}
                  alt={tour.title}
                  fill
                  priority // Optional: helps with LCP performance
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="bg-muted flex items-center justify-center h-full w-full">
                  <MapPin className="h-10 w-10 text-muted-foreground/40" />
                </div>
              )}
              <Badge className="absolute top-4 left-4 bg-white/90 text-black hover:bg-white border-none">
                {tour.category || "Tour"}
              </Badge>
            </div>

            <CardHeader className="p-4 pb-0">
              <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                <MapPin className="w-3 h-3" />
                <span>{tour.city}</span>
              </div>
              <CardTitle className="text-xl line-clamp-1">
                {tour.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="p-4 pt-2">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-semibold">
                  {tour.averageRating || "4.9"}
                </span>
                <span className="text-xs text-muted-foreground">
                  ({tour.reviewCount || "120"} reviews)
                </span>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-2">
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground uppercase font-bold">
                  From
                </span>
                <span className="text-lg font-bold text-blue-600">
                  ${tour.price}
                </span>
              </div>
              <Button asChild size="sm" className="rounded-full">
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
