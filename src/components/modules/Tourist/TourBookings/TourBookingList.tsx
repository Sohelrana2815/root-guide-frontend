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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((booking: IBooking | any) => (
        <Card
          key={booking._id}
          className="flex flex-col shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Top Image Section */}
          <div className="relative h-48 w-full overflow-hidden">
            {booking.tourId?.image ? (
              <Image
                src={booking.tourId.image}
                alt={booking.tourId.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="bg-muted flex items-center justify-center h-full w-full">
                <MapPin className="h-10 w-10 text-muted-foreground/40" />
              </div>
            )}
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              {getStatusBadge(booking.status)}
            </div>
          </div>

          <CardHeader className="p-4 pb-2">
            <div className="space-y-1">
              <CardTitle className="text-lg font-bold line-clamp-1">
                {booking.tourId?.title}
              </CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                <span className="truncate">{booking.tourId?.city}</span>
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="p-4 pt-0 flex-grow space-y-4">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50 mt-2">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none">
                    Guests
                  </p>
                  <p className="font-semibold">{booking.guestCount}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 text-muted-foreground" />
                <div className="text-sm">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold leading-none">
                    Total
                  </p>
                  <p className="font-semibold text-primary">
                    ${booking.totalPrice}
                  </p>
                </div>
              </div>
            </div>

            {/* Guide & Meta Info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden border">
                  {booking.guideId?.photo ? (
                    <Image
                      src={booking.guideId.photo}
                      alt="guide"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  ) : (
                    <User className="h-4 w-4 text-primary" />
                  )}
                </div>
                <div className="text-[12px]">
                  <p className="text-muted-foreground leading-none mb-0.5">
                    Guide
                  </p>
                  <p className="font-medium truncate max-w-[100px]">
                    {booking.guideId?.name || "Pending..."}
                  </p>
                </div>
              </div>

              <Badge
                variant="outline"
                className={`h-fit text-[10px] gap-1 ${
                  booking.paymentId?.status === "PAID"
                    ? "text-emerald-600 border-emerald-200 bg-emerald-50"
                    : "text-red-500 border-red-200 bg-red-50"
                }`}
              >
                <CreditCard className="h-3 w-3" />
                {booking.paymentId?.status || "UNPAID"}
              </Badge>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground pt-1">
              <Calendar className="h-3 w-3" />
              <span>Booked: {formatDateTime(booking.createdAt)}</span>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0 gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              asChild
            >
              <Link href={`/dashboard/my-bookings/${booking._id}`}>
                Details
              </Link>
            </Button>

            {booking?.paymentId?.status !== "PAID" && (
              <Button
                size="sm"
                className="flex-1 text-xs"
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
