/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDateTime } from "@/lib/formatters";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  User,
  ChevronRight,
  Banknote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface TourBookingListProps {
  bookings: IBooking[];
}

const TourBookingList = ({ bookings }: TourBookingListProps) => {
  const getStatusBadge = (status: BookingStatus) => {
    const statusConfig: Record<
      BookingStatus,
      { variant: any; label: string; className?: string }
    > = {
      [BookingStatus.PENDING]: {
        variant: "outline",
        label: "Pending",
        className: "border-amber-500 text-amber-600 bg-amber-50",
      },
      [BookingStatus.CONFIRMED]: {
        variant: "default",
        label: "Confirmed",
        className: "bg-blue-600 hover:bg-blue-700",
      },
      [BookingStatus.PAID]: {
        variant: "default",
        label: "Paid",
        className: "bg-green-600 hover:bg-green-700",
      },
      [BookingStatus.CANCELLED]: {
        variant: "destructive",
        label: "Cancelled",
      },
      [BookingStatus.COMPLETED]: {
        variant: "secondary",
        label: "Completed",
        className: "bg-gray-100 text-gray-800",
      },
      [BookingStatus.FAILED]: {
        variant: "destructive",
        label: "Failed",
      },
    };

    const config = statusConfig[status] || statusConfig[BookingStatus.PENDING];

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  if (bookings.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No Tour booked Yet</h3>
          <p className="text-muted-foreground text-center max-w-sm">
            You haven&apos;t booked any Tour yet. Browse our tours and book your
            first tour.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/tours">Browse Tours</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {bookings.map((booking: IBooking | any) => (
        <Card
          key={booking._id}
          className="overflow-hidden hover:shadow-lg transition-all border-l-4 border-l-primary/50"
        >
          <CardContent className="pt-6 space-y-4">
            {/* Header: Status and Payment */}
            <div className="flex justify-between items-start">
              {getStatusBadge(booking.status)}
              <Badge
                variant="outline"
                className={
                  booking.paymentId.status === "PAID"
                    ? "text-green-600 border-green-200"
                    : "text-red-500 border-red-200"
                }
              >
                <CreditCard className="h-3 w-3 mr-1" />
                {booking.paymentId.status}
              </Badge>
            </div>

            {/* Tour Main Info */}
            <div className="space-y-1">
              <h3 className="font-bold text-xl line-clamp-1">
                {booking.tourId?.title}
              </h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1 text-primary" />
                {booking.tourId?.city}
              </div>
            </div>

            {/* Booking Details Grid */}
            <div className="grid grid-cols-2 gap-3 py-2 border-y border-gray-50">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-md">
                  <Users className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">
                    Guests
                  </p>
                  <p className="text-sm font-semibold">{booking.guestCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 bg-slate-100 rounded-md">
                  <Banknote className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="text-[10px] uppercase text-muted-foreground font-bold">
                    Total
                  </p>
                  <p className="text-sm font-semibold">${booking.totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Guide Info */}
            <div className="flex items-center gap-3 bg-primary/5 p-2 rounded-lg">
              <div className="relative h-10 w-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
                {booking.guideId?.photo ? (
                  <Image
                    src={booking.guideId.photo}
                    alt={booking.guideId.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="bg-primary/20 flex items-center justify-center h-full w-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground">Tour Guide</p>
                <p className="text-sm font-medium truncate">
                  {booking.guideId?.name || "Assigning..."}
                </p>
              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span>Booked on {formatDateTime(booking.createdAt)} </span>
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50/50 border-t p-3">
            <Button variant="ghost" size="sm" className="w-full group" asChild>
              <Link href={`/dashboard/my-bookings/${booking._id}`}>
                View Booking Details
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TourBookingList;
