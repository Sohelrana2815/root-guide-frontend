import { ITour } from "@/types/tour.interface";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface PopularPackagesProps {
  tours: ITour[];
}

const PopularPackages = ({ tours }: PopularPackagesProps) => {
  // Fixed sorting logic to handle potential undefined createdAt
  const featuredPackages = [...tours]
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredPackages.map((tour) => (
          <Card
            key={tour._id}
            className="group border-primary/50 shadow-none bg-transparent overflow-hidden p-2"
          >
            {/* Minimal Image Container */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden mb-4">
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
              <div className="absolute top-4 left-4">
                <Badge className="bg-white/90 backdrop-blur-sm text-slate-900 hover:bg-white border-none px-3 py-1 font-bold">
                  ${tour.price}{" "}
                  <span className="font-normal text-[10px] text-slate-500 ml-1">
                    / person
                  </span>
                </Badge>
              </div>
            </div>

            {/* Content Section */}
            <CardContent className="p-0 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  <span className="text-xs uppercase tracking-wider font-medium">
                    {tour.city}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold">
                    {tour.averageRating?.toFixed(1)}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
                {tour.title}
              </h3>

              <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed pb-4">
                {tour.description}
              </p>

              <Link
                href={`/tours/${tour._id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-primary/80  hover:text-blue-600 transition-all group/link underline"
              >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default PopularPackages;
