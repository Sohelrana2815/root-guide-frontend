/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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
import { formatDateTime } from "@/lib/formatters";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import {
  Calendar,
  MapPin,
  Users,
  CreditCard,
  User,
  Banknote,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { initiatePayment } from "@/services/payment/payment.service";
import { toast } from "sonner";

interface TourBookingListProps {
  bookings: IBooking[];
}

const TourBookingList = ({ bookings }: TourBookingListProps) => {
  const getStatusBadge = (status: BookingStatus) => {
    const statusConfig: Record<string, { variant: any; className: string }> = {
      [BookingStatus.PENDING]: {
        variant: "outline",
        className: "border-amber-500 text-amber-600 bg-amber-50",
      },
      [BookingStatus.CONFIRMED]: {
        variant: "default",
        className: "bg-blue-600 hover:bg-blue-700",
      },
      [BookingStatus.PAID]: {
        variant: "default",
        className: "bg-emerald-600 hover:bg-emerald-700",
      },
      [BookingStatus.CANCELLED]: { variant: "destructive", className: "" },
      [BookingStatus.COMPLETED]: {
        variant: "secondary",
        className: "bg-slate-100 text-slate-800",
      },
      [BookingStatus.FAILED]: { variant: "destructive", className: "" },
    };

    const config = statusConfig[status] || statusConfig[BookingStatus.PENDING];
    return (
      <Badge
        variant={config.variant}
        className={`capitalize ${config.className}`}
      >
        {status.toLowerCase()}
      </Badge>
    );
  };

  if (bookings.length === 0) {
    return (
      <Card className="border-dashed border-2">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <div className="p-4 bg-muted rounded-full mb-4">
            <Calendar className="h-10 w-10 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-semibold">No Bookings Found</h3>
          <p className="text-muted-foreground text-center max-w-xs mt-2">
            Ready for an adventure? Your booked tours will appear here.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/tours">Explore Tours</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {bookings.map((booking: IBooking | any) => (
        <Card
          key={booking._id}
          className="group flex flex-col border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
        >
          {/* 1. Image Section: Flush with top/sides + Hover Zoom */}
          <div className="relative aspect-4/3 w-full overflow-hidden">
            {booking.tourId?.image ? (
              <Image
                src={booking.tourId.image}
                alt={booking.tourId.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            ) : (
              <div className="bg-muted flex items-center justify-center h-full w-full">
                <MapPin className="h-10 w-10 text-muted-foreground/20" />
              </div>
            )}

            {/* Status Badge - Glassmorphism style */}
            <div className="absolute top-4 right-4 z-10">
              <div className="backdrop-blur-md rounded-lg overflow-hidden shadow-sm">
                {getStatusBadge(booking.status)}
              </div>
            </div>
          </div>

          {/* 2. Content Section: Standardized P-5 Padding */}
          <CardContent className="p-5 flex-grow space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-xs uppercase tracking-widest font-semibold">
                  {booking.tourId?.city || "Unknown"}
                </span>
              </div>

              <Badge
                variant="outline"
                className={`h-fit text-[10px] font-bold gap-1 px-2 py-0.5 rounded-full ${
                  booking.paymentId?.status === "PAID"
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                    : "text-red-500 border-red-200 bg-red-50"
                }`}
              >
                <CreditCard className="h-3 w-3" />
                {booking.paymentId?.status || "UNPAID"}
              </Badge>
            </div>

            <h3 className="text-lg font-bold text-foreground group-hover:text-blue-600 transition-colors line-clamp-1">
              {booking.tourId?.title}
            </h3>

            {/* Stats Grid - Aligned with your TourCard metadata style */}
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-border/50 mt-2">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Users className="h-4 w-4 text-blue-600" />
                </div>
                <div className="text-sm">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none">
                    Guests
                  </p>
                  <p className="font-bold">{booking.guestCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                  <Banknote className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-sm">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none">
                    Total
                  </p>
                  <p className="font-bold text-foreground">
                    ${booking.totalPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Guide Section */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border border-border">
                  {booking.guideId?.photo ? (
                    <Image
                      src={booking.guideId.photo}
                      alt="guide"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="text-[12px]">
                  <p className="text-muted-foreground leading-none mb-0.5">
                    Guide
                  </p>
                  <p className="font-semibold truncate max-w-[100px]">
                    {booking.guideId?.name || "Pending..."}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-medium">
                <Calendar className="h-3 w-3" />
                <span>
                  {new Date(booking.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </CardContent>

          {/* 3. Footer Section: Standardized bg-slate-50/50 and Rounded Buttons */}
          <CardFooter className="px-5 py-4 gap-3 border-t border-border/50 bg-slate-50/50 dark:bg-transparent">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 rounded-full font-bold text-xs transition-all hover:bg-blue-50"
              asChild
            >
              <Link href={`/dashboard/my-bookings/${booking._id}`}>
                View Details
              </Link>
            </Button>

            {booking?.paymentId?.status !== "PAID" && (
              <Button
                size="sm"
                className="flex-1 rounded-full font-bold text-xs shadow-md hover:shadow-lg transition-all"
                onClick={() => handlePayment(booking._id)}
              >
                Pay Now
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

// Extracted Payment Logic for cleaner code
async function handlePayment(bookingId: string) {
  try {
    toast.success("Redirecting to payment...");
    sessionStorage.setItem("paymentReturnUrl", "/dashboard/my-bookings");
    const res = await initiatePayment(bookingId);
    if (res.success && res.data?.paymentUrl) {
      window.location.replace(res.data.paymentUrl);
    } else {
      toast.error(res.message || "Failed to initiate payment");
    }
  } catch (err) {
    console.error(err);
    toast.error("Failed to initiate payment");
  }
}

export default TourBookingList;
