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
// import BookTourDialog from "./BookTourDialog";

interface TourCardProps {
  tour: any;
  guide: any;
}

const TourCard = ({ tour, guide }: TourCardProps) => {
  const [showTourBookingModal, setShowTourBookingModal] = useState(false);

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-none bg-card">
        {/* 1. Tour Hero Image Section */}
        <div className="relative w-full aspect-16/10 overflow-hidden">
          <Image
            src={tour.image || "/api/placeholder/400/250"}
            alt={tour.title}
            fill
            priority // Optional: helps with LCP performance
            className="object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
          />

          {/* Price Badge Overlay */}
          <div className="absolute top-3 right-3 z-10">
            <Badge className="bg-white/90 text-primary hover:bg-white text-lg font-bold py-1 px-3 backdrop-blur-sm border-none">
              ${tour.price}
            </Badge>
          </div>

          {/* City Overlay */}
          <div className="absolute bottom-3 left-3 z-10">
            <Badge
              variant="secondary"
              className="flex items-center gap-1 bg-black/60 text-white border-none backdrop-blur-sm px-2 py-1"
            >
              <MapPin className="h-3 w-3" />
              {tour.city}
            </Badge>
          </div>
        </div>

        <CardHeader className="space-y-1">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl line-clamp-1 flex-1">
              {tour.title}
            </CardTitle>
            <div className="flex items-center gap-1 text-sm font-bold text-amber-500 ml-2">
              <Star className="h-4 w-4 fill-amber-500" />
              {tour.averageRating?.toFixed(1) || "5.0"}
            </div>
          </div>
          <CardDescription className="line-clamp-2 text-sm">
            {tour.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pb-4">
          {/* 2. Tour Metadata */}
          <div className="flex items-center justify-between text-sm text-muted-foreground border-y py-3">
            <div className="flex items-center gap-1.5">
              <Clock className="h-4 w-4 text-primary" />
              <span>{tour.duration} Hours</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="h-4 w-4 text-primary" />
              <span>Max {tour.maxGroupSize}</span>
            </div>
          </div>

          {/* 3. Guide Trust Section */}
          <div className="flex items-center gap-3 bg-muted/30 p-2 rounded-lg">
            <Avatar className="h-10 w-10 border-2 border-background">
              <AvatarImage src={guide.photo} alt={guide.name} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {getInitials(guide.name || "G")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Tour Guide</p>
              <p className="text-sm font-semibold truncate">{guide.name}</p>
            </div>
            {/* Verified Badge */}
            <Badge
              variant="outline"
              className="text-[10px] uppercase text-blue-600 border-blue-200"
            >
              Verified
            </Badge>
          </div>
        </CardContent>

        <CardFooter className="gap-2 pt-0">
          <Link className="flex-1" href={`/tours/${tour._id}`}>
            <Button
              variant="outline"
              className="w-full group-hover:bg-primary/5"
            >
              <Eye className="h-4 w-4 mr-2" />
              Details
            </Button>
          </Link>
          {/* <Link
            className="flex-1"
            href={`/dashboard/book-tour/${guide._id}/${tour._id}`}
          > */}
          <Button
            onClick={() => setShowTourBookingModal(true)}
            className="w-full"
          >
            Book Now
          </Button>
          {/* </Link> */}
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
