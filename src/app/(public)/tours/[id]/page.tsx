// we will fetch/get tour details here specific tour not only tour but also guide details

import GuideProfileInfo from "@/components/modules/TourDetails/GuideProfileInfo";
import GuideTourReviews from "@/components/modules/TourDetails/GuideTourReviews";
// import GuideTourReviews from "@/components/modules/TourDetails/GuideTourReviews";
import { Badge } from "@/components/ui/badge";
import BookingWidget from "@/components/modules/TourDetails/BookingWidget";
import { getTourById } from "@/services/guide/toursManagement";
import { getTourReviews } from "@/services/tourist/reviews.service";
import { Clock, MapPin, Star, Users } from "lucide-react";
import Image from "next/image";

const TourDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const [tourResult, reviewResult] = await Promise.all([
    getTourById(id),
    getTourReviews(id),
  ]);
  const tour = tourResult?.data;
  const guide = tour?.guideId;
  const reviews = reviewResult?.data || [];

  if (!tour) return <div className="text-center py-20">Tour not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 1. Hero Section */}
      <div className="relative h-[60vh] w-full rounded-2xl overflow-hidden mb-8">
        {tour.image ? (
          <Image
            src={tour.image || "/placeholder.png"}
            alt={tour.title || "Tour image"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="bg-muted flex items-center justify-center h-full w-full">
            <MapPin className="h-10 w-10 text-muted-foreground/40" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-8 left-8 text-white">
          <Badge className="mb-4 bg-primary text-white border-none">
            {tour.category}
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{tour.title}</h1>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" /> {tour.city}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {tour.duration} Hours
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> Max {tour.maxGroupSize} Guests
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              {tour?.averageRating || 0}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left Column: Details & Guide */}
        <div className="lg:col-span-2 space-y-10">
          <section>
            <h2 className="text-2xl font-bold mb-4">About this tour</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {tour.description}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
            <div className="bg-muted/30 p-6 rounded-xl border">
              <p className="whitespace-pre-line">{tour.itinerary}</p>
            </div>
          </section>
          <hr />
          {/* Guide Component */}
          <GuideProfileInfo guide={guide} />
          <hr />

          <GuideTourReviews reviews={reviews} />
        </div>

        {/* Right Column: Sticky Booking Card */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 border rounded-2xl p-6 shadow-sm bg-card">
            <div className="flex justify-between items-center mb-6">
              <div>
                <span className="text-3xl font-bold">${tour.price}</span>
                <span className="text-muted-foreground"> / person</span>
              </div>
            </div>

            {/* Client booking widget opens guest/date modal before creating booking */}
            <BookingWidget tour={tour} guide={guide} />

            <p className="text-center text-xs text-muted-foreground mt-4">
              Secure your spot now and pay later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetailPage;
