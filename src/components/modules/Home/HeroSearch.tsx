/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  MapPin,
  Compass,
  Calendar,
  Users,
  Star,
  TrendingUp,
  Mountain,
  Camera,
  Trees,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { IGlobalMeta } from "@/types/meta.interface";

interface HeroSearchProps {
  tours: any[];
  metaData: IGlobalMeta;
  cities: string[];
  categories: string[];
}

export default function HeroSearch({ tours, metaData, cities, categories }: HeroSearchProps) {
  // Map real cities to the format expected by the component
  const popularDestinations = cities.map((city, index) => ({
    name: city.charAt(0).toUpperCase() + city.slice(1), // Capitalize first letter
    slug: city.toLowerCase().replace(/\s+/g, '-'), // Convert to slug format
    tours: (index + 1) * 5 + 10, // Consistent tour count based on index
  }));

  // Map real categories to the format expected by the component
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'adventure':
        return Mountain;
      case 'photography':
        return Camera;
      case 'nature':
        return Trees;
      default:
        return Compass; // Default icon for other categories
    }
  };

  const tourCategories = categories.map((category) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1),
    icon: getCategoryIcon(category),
    href: `/tours?category=${category.toLowerCase()}`,
  }));

  return (
    <>
      {/* Interactive Destination Explorers */}
      <div className="w-full max-w-5xl px-4 pb-4 mx-auto md:absolute md:left-1/2 md:-bottom-20 md:-translate-x-1/2">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 border border-border text-foreground">
          {/* Popular Destinations */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">
                Popular Destinations
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/tours?searchTerm=${destination.slug}`}
                  className="group relative px-4 py-2 bg-muted/10 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-border hover:border-primary/30"
                  // remove onMouseEnter/onMouseLeave
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {destination.name}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {/* ({destination.tours} tours) */}
                    </span>
                  </div>

                  {/* tooltip block removed */}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Categories */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Compass className="w-4 h-4 text-muted-foreground" />
              <span>Quick browse:</span>
            </div>
            <div className="flex flex-wrap gap-2 flex-1">
              {tourCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.name}
                    href={category.href}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-md transition-colors text-sm font-medium"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {category.name}
                  </Link>
                );
              })}
            </div>

            {/* View All Tours Button (use design system Button) */}
            <Link href="/tours">
              <Button size="lg">
                <Star className="w-4 h-4" />
                View All Tours
              </Button>
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 text-muted-foreground">
                <Users className="w-3 h-3 text-muted-foreground" />
                {metaData.totalTourists.toLocaleString()}+ Happy Travelers
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                {tours.length}+ Tours Available
              </span>
            </div>
            <span className="flex items-center gap-1 text-primary">
              <TrendingUp className="w-3 h-3 text-primary" />
              Best Price Guaranteed
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
