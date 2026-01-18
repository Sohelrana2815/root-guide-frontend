import { ITour } from "@/types/tour.interface";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface PopularPackagesProps {
  tours?: ITour[];
}

const PopularPackages = ({ tours = [] }: PopularPackagesProps) => {
  // Guard tours in case a non-array is passed from parent
  const safeTours = Array.isArray(tours) ? tours : [];
  // Fixed sorting logic to handle potential undefined createdAt
  const featuredPackages = [...safeTours]
    .sort((a, b) => {
      const timeA = new Date(a.createdAt ?? 0).getTime();
      const timeB = new Date(b.createdAt ?? 0).getTime();
      return timeB - timeA;
    })
    .slice(0, 6);
  if (featuredPackages.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-20">
      <SectionHeader
        title="Recent Packages"
        subtitle="The latest travel deals and newly added experiences around the world."
        linkText="Explore All Packages"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {featuredPackages.map((tour) => (
          <Card
            key={tour._id}
            // Removed px-1.5 to allow image to touch the top/sides
            // Added overflow-hidden to ensure image respects border radius
            className="group border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
          >
            {/* Image Container: Flush with top and sides */}
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

              {/* Price Tag */}
              <div className="absolute top-4 left-4 z-10">
                <Badge className="bg-background/90 backdrop-blur-md text-foreground hover:bg-background border-none px-3 py-1.5 font-bold shadow-sm">
                  ${tour.price}
                  <span className="font-normal text-[10px] text-muted-foreground ml-1">
                    / person
                  </span>
                </Badge>
              </div>
            </div>

            {/* Content Section: Padded for alignment */}
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 text-blue-500" />
                  <span className="text-xs uppercase tracking-widest font-semibold">
                    {tour.city}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-yellow-400/10 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs font-bold text-yellow-700 dark:text-yellow-400">
                    {tour.averageRating?.toFixed(1) || "0.0"}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
                {tour.title}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
                {tour.description}
              </p>

              <div className="pt-2">
                <Link
                  href={`/tours/${tour._id}`}
                  className="inline-flex items-center gap-2 text-sm font-bold hover:text-blue-500 dark:text-blue-100  dark:hover:text-blue-500 transition-all group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;
