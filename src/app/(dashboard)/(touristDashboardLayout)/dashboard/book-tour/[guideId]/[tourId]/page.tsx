import TourBookingConfirmation from "@/components/modules/Tours/TourBookingConfirmation";
import { getTourById } from "@/services/guide/toursManagement";
import { getGuideById } from "@/services/tourist/booking.service";
import { notFound } from "next/navigation";

interface BookingTourPageProps {
  params: Promise<{ guideId: string; tourId: string }>;
  searchParams: Promise<{ [kye: string]: string | string[] | undefined }>;
}

const TourBookingPage = async ({
  params,
  searchParams,
}: BookingTourPageProps) => {
  const { guideId, tourId } = await params;
  const sParams = await searchParams;
  const initialGuestCount = Number(sParams.guestCount) || 1;

  const [guideResponse, tourResponse] = await Promise.all([
    getGuideById(guideId),
    getTourById(tourId),
  ]);

  if (!tourResponse?.data || !guideResponse?.success) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Confirm Your Booking</h1>
        <p className="text-muted-foreground">
          Review the details and meet your guide before finalizing.
        </p>
      </div>
      <TourBookingConfirmation
        tour={tourResponse.data}
        guide={guideResponse.data}
        initialGuestCount={initialGuestCount}
      />
    </div>
  );
};

export default TourBookingPage;
