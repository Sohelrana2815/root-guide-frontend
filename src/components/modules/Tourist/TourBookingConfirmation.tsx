"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/formatters";
import { createBooking } from "@/services/tourist/booking.service";
import { ITour } from "@/types/tour.interface";
import { IUser } from "@/types/user.interface";
import {
  Award,
  CalendarDays,
  CheckCircle2,
  Languages,
  MapPin,
  ShieldCheck,
  Star,
  User,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
interface TourConfirmationProps {
  tour: ITour;
  guide: Partial<IUser>;
}

const TourBookingConfirmation = ({ tour, guide }: TourConfirmationProps) => {
  const router = useRouter();
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const totalPrice = (tour.price || 0) * guestCount;
  const handleConfirmationBooking = async () => {
    if (guestCount > (tour.maxGroupSize || 0)) {
      return toast.error(`Max group size is ${tour.maxGroupSize}`);
    }

    setIsBooking(true);

    try {
      const result = await createBooking({
        guideId: tour.guideId!,
        tourId: tour._id as string,
        guestCount: guestCount,
      });

      if (result.success && result.data?.paymentUrl) {
        setBookingSuccess(true);
        toast.success("Tour booked successfully!");
        // Redirect after 2 seconds
        setTimeout(() => {
          router.push("/dashboard/my-bookings");
        }, 2000);
      } else {
        toast.error(result.message || "Failed to book tour");
        setIsBooking(false);
      }
    } catch (error) {
      toast.error(
        "An error occurred while booking tour. Please try again later."
      );
      setIsBooking(false);
      console.error(error);
    }
  };

  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="h-16 w-16 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-green-900">
                  Tour Booking Confirmed!
                </h2>
                <p className="text-green-700 mt-2">
                  Your tour has been successfully booked
                </p>
              </div>
              <p className="text-sm text-green-600">
                Redirecting to your bookings...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {/* Left Column: Guide Trust Information */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Meet Your Guide
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
            <Avatar className="h-24 w-24 border-2 border-primary/10 shadow-sm">
              <AvatarImage src={guide.photo} alt={guide.name} />
              <AvatarFallback>{getInitials(guide.name || "G")}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <h2 className="text-2xl font-bold">{guide.name}</h2>
                {guide.isVerified && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">
                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                  </Badge>
                )}
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">
                    {guide.averageRating?.toFixed(1) || "5.0"}
                  </span>
                  (Reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-primary" />
                  Professional Guide
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed italic">
                &quot;
                {guide.bio ||
                  "Passionate about showing the hidden gems of the city."}
                &quot;
              </p>
            </div>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Expertise */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" /> Specializations
              </h4>
              <div className="flex flex-wrap gap-2">
                {guide.expertise?.map((exp, idx) => (
                  <Badge key={idx} variant="secondary" className="font-normal">
                    {exp}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Languages className="w-4 h-4 text-primary" /> Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {guide.languages?.map((lang, idx) => (
                  <Badge key={idx} variant="outline">
                    {lang}
                  </Badge>
                )) || <Badge variant="outline">English</Badge>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Right Column: Booking Summary */}
      <Card className="h-fit sticky top-6">
        <CardHeader>
          <CardTitle>Booking Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <p className="font-bold text-lg">{tour.title}</p>
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {tour.city}
            </p>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Users className="w-4 h-4" /> Guests
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                  className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-4 text-center font-medium">
                  {guestCount}
                </span>
                <button
                  onClick={() =>
                    setGuestCount(
                      Math.min(tour.maxGroupSize || 10, guestCount + 1)
                    )
                  }
                  className="w-8 h-8 rounded border flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground flex items-center gap-2">
                <CalendarDays className="w-4 h-4" /> Price per person
              </span>
              <span>${tour.price}</span>
            </div>
          </div>

          <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
            <div className="flex justify-between items-center">
              <span className="font-bold">Total Amount</span>
              <span className="text-2xl font-black text-primary">
                ${totalPrice}
              </span>
            </div>
          </div>

          <Button
            className="w-full h-12 text-lg font-bold shadow-lg shadow-primary/20"
            onClick={handleConfirmationBooking}
            disabled={isBooking}
          >
            {isBooking ? "Processing..." : "Confirm & Pay Now"}
          </Button>

          <p className="text-[10px] text-center text-muted-foreground">
            By clicking &quot;Confirm&quot;, you agree to our terms of service
            and cancellation policy.
          </p>
        </CardContent>
      </Card>
    </div>
  );
  
};

export default TourBookingConfirmation;
