/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Badge } from "@/components/ui/badge";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ReviewDialog from "./ReviewDialog";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Star,
  UserIcon,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { formatDateTime } from "@/lib/formatters";

interface BookingDetailsProps {
  booking: IBooking;
}

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const router = useRouter();

  const [showReviewDialog, setShowReviewDialog] = useState(false);
  const getStatusBadge = (status: BookingStatus) => {
    const variants: Record<string, string> = {
      COMPLETED: "bg-green-100 text-green-700 border-green-200",
      PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
      PAID: "bg-blue-100 text-blue-700 border-blue-200",
      CANCELLED: "bg-red-100 text-red-700 border-red-200",
      CONFIRMED: "bg-purple-100 text-purple-700 border-purple-200",
    };
    return (
      <Badge
        variant="outline"
        className={`${variants[status] || ""} px-3 py-1 capitalize`}
      >
        {status.toLowerCase()}
      </Badge>
    );
  };
  const isCompleted = booking.status === BookingStatus.COMPLETED;
  const hasReview = !!booking.review;
  const tour = booking.tourId as any;
  const guide = booking.guideId as any;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => router.back()} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Bookings
        </Button>
        {getStatusBadge(booking.status)}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Tour & Guide Details */}
        <div className="md:col-span-2 space-y-6">
          <Card className="overflow-hidden">
            <div className="relative h-64 w-full">
              <Image
                src={tour?.image}
                alt={tour?.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-2">{tour?.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {tour?.city}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDateTime(booking.createdAt!)}
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed">
                {tour?.description}
              </p>
            </CardContent>
          </Card>

          {/* Guide Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserIcon className="h-5 w-5" /> Your Guide
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                  {guide?.name?.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold">{guide?.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {guide?.email}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {guide?.languages?.map((lang: string) => (
                  <Badge
                    key={lang}
                    variant="secondary"
                    className="text-[10px] uppercase"
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Summary & Review Action */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Users className="h-4 w-4" /> Guests
                </span>
                <span className="font-medium">{booking.guestCount}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="font-bold text-lg">Total Paid</span>
                <span className="font-bold text-lg text-primary">
                  ${booking.totalPrice}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* REVIEW SECTION */}
          {isCompleted && (
            <Card
              className={
                hasReview ? "bg-card" : "bg-primary/5 border-primary/20"
              }
            >
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star
                    className={`h-5 w-5 ${
                      hasReview ? "text-yellow-500" : "text-primary"
                    }`}
                  />
                  {hasReview ? "Your Review" : "Share Experience"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {hasReview ? (
                  <div className="space-y-3">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < (booking.review?.rating || 0)
                              ? "fill-yellow-500 text-yellow-500"
                              : "text-foreground"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm italic text-muted-foreground">
                      &quot;{booking.review?.comment}&quot;
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      How was your tour with {guide?.name}? Share your feedback
                      to help others.
                    </p>
                    <Button
                      className="w-full"
                      onClick={() => setShowReviewDialog(true)}
                    >
                      Write Review
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* The Dialog Modal */}
      <ReviewDialog
        isOpen={showReviewDialog}
        onClose={() => setShowReviewDialog(false)}
        bookingId={booking._id as string}
        guideName={guide?.name}
      />
    </div>
  );
};

export default BookingDetails;
