/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";
import { Clock, Eye, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BookTourDialog from "./BookTourDialog";

interface TourCardProps {
  tour: any;
  guide: any;
}

const TourCard = ({ tour, guide }: TourCardProps) => {
  const [showTourBookingModal, setShowTourBookingModal] = useState(false);

  return (
    <>
      <Card className="overflow-hidden flex flex-col h-full">
        {/* 1. Tour Hero Image Section */}
        <div className="relative w-full aspect-video md:aspect-4/3 bg-muted">
          <Image
            src={tour.image || "/api/placeholder/400/250"}
            alt={tour.title}
            fill
            priority // Optional: helps with LCP performance
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          {/* Price badge overlay */}

          <div className="absolute top-3 left-3">
            <Badge className="text-sm px-2 py-1">${tour.price}</Badge>
          </div>
          {/* City Overlay */}
          <div className="absolute top-3 right-3">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 text-sm px-2 py-1"
            >
              <MapPin className="w-3 h-3" />
              <span className="max-w-32 truncate">{tour.city}</span>
            </Badge>
          </div>
        </div>

        <CardHeader className="pt-4 pb-0 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div>
              <CardTitle className="line-clamp-2">{tour.title}</CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  <span>{tour.averageRating ?? "New"}</span>
                  <span className="text-xs opacity-70">
                    ({tour.reviewCount ?? 0})
                  </span>
                </div>
              </div>
            </div>
          </div>

          <CardDescription className="mt-2 line-clamp-3 px-0 text-sm">
            {tour.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="px-4 pt-3 pb-4 flex-1">
          {/* 2. Tour Metadata */}
          <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{tour.duration} Hours</span>
            </div>

            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
          </div>

          {/* 3. Guide Trust Section */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                {guide?.photo ? (
                  <AvatarImage src={guide.photo} alt={guide.name} />
                ) : (
                  <AvatarFallback>
                    {getInitials(guide?.name ?? "G")}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">Tour Guide</p>
                <p className="font-medium truncate">
                  {guide?.name ?? "Unknown"}
                </p>
              </div>
            </div>

            {/* Verified Badge */}
            <Badge variant="outline" className="text-sm">
              Verified
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="px-4 pb-4 pt-0">
          <div className="w-full flex gap-3">
            <Link href={`/tours/${tour._id}`} className="flex-1">
              <Button
                variant="outline"
                className="w-full h-10 flex items-center justify-center"
                aria-label={`View details for ${tour.title}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                Details
              </Button>
            </Link>

            <Button
              onClick={() => setShowTourBookingModal(true)}
              className="flex-1 h-10"
              aria-label={`Book ${tour.title}`}
            >
              Book Now
            </Button>
          </div>
        </CardFooter>
      </Card>

      <BookTourDialog
        tour={tour}
        guide={guide}
        isOpen={showTourBookingModal}
        onClose={() => setShowTourBookingModal(false)}
      />
    </>
  );
};

export default TourCard;
