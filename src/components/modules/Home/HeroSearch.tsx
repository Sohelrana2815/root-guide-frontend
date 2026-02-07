"use client";
import { MapPin, Compass, Calendar, Users, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";

const popularDestinations = [
  { name: "Cox's Bazar", slug: "coxs-bazar", tours: 45 },
  { name: "Sundarban", slug: "sundarban", tours: 32 },
  { name: "Saint Martin", slug: "saint-martin", tours: 28 },
];

const tourCategories = [
  { name: "Adventure Tours", icon: Compass, href: "/tours?category=adventure" },
  { name: "Beach Tours", icon: MapPin, href: "/tours?category=beach" },
  { name: "Wildlife Tours", icon: TrendingUp, href: "/tours?category=wildlife" },
];

export default function HeroSearch() {
  const [selectedDestination, setSelectedDestination] = useState("");

  return (
    <>
      {/* Interactive Destination Explorer */}
      <div className="w-full max-w-5xl px-4 pb-4 mx-auto md:absolute md:left-1/2 md:-bottom-20 md:-translate-x-1/2">
        <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 md:p-6 border border-border text-foreground">
          {/* Popular Destinations */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <MapPin className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">Popular Destinations</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {popularDestinations.map((destination) => (
                <Link
                  key={destination.slug}
                  href={`/tours?destination=${destination.slug}`}
                  className="group relative px-4 py-2 bg-muted/10 hover:bg-primary/5 rounded-lg transition-all duration-200 border border-border hover:border-primary/30"
                  onMouseEnter={() => setSelectedDestination(destination.name)}
                  onMouseLeave={() => setSelectedDestination("")}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground group-hover:text-primary">
                      {destination.name}
                    </span>
                    <span className="text-xs text-muted-foreground">({destination.tours} tours)</span>
                  </div>
                  {selectedDestination === destination.name && (
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-card-foreground text-xs px-2 py-1 rounded whitespace-nowrap shadow-sm">
                      Explore {destination.name}
                    </div>
                  )}
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
                5000+ Happy Travelers
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Calendar className="w-3 h-3 text-muted-foreground" />
                100+ Tours Available
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
