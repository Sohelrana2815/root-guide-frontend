import TourBookingConfirmation from "@/components/modules/Tourist/TourBookingConfirmation";
import { getTourById } from "@/services/guide/toursManagement";
import { getGuideById } from "@/services/tourist/booking.service";
import { notFound } from "next/navigation";

interface BookingTourPageProps {
  params: Promise<{
    guideId: string;
    tourId: string;
  }>;
}

const TourBookingPage = async ({ params }: BookingTourPageProps) => {
  const { guideId, tourId } = await params;

  // fetch guide and tour
  const [guideResponse, tourResponse] = await Promise.all([
    getGuideById(guideId),
    getTourById(tourId),
  ]);
  if (!tourResponse?.data || !guideResponse?.success) {
    // If guide isn't found or tour isn't found, show 404
    notFound();
  }
  const tour = tourResponse.data;
  const guide = guideResponse.data;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Confirm Your Booking</h1>
        <p className="text-muted-foreground">
          Review the details and meet your guide before finalizing.
        </p>
      </div>

      <TourBookingConfirmation tour={tour} guide={guide} />
    </div>
  );
};

export default TourBookingPage;
