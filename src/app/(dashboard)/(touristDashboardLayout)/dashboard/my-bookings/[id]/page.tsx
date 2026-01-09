export const dynamic = "force-dynamic";

import BookingDetails from "@/components/modules/Tourist/TourBookings/BookingDetails";
import { getBookingById } from "@/services/tourist/booking.service";
import { IBooking } from "@/types/booking.interface";
import { notFound } from "next/navigation";

// we will fetch/get tour details here specific tour not only tour but also guide details

interface TourBookingDetailPageProps {
  params: Promise<{ id: string }>;
}

const TourBookingDetailPage = async ({
  params,
}: TourBookingDetailPageProps) => {
  const { id } = await params;
  const response = await getBookingById(id);

  if (!response?.success || !response?.data) {
    notFound();
  }

  const booking: IBooking = response.data;
  return (
    <div className="container mx-auto px-4 py-8">
      <BookingDetails booking={booking} />
    </div>
  );
};

export default TourBookingDetailPage;
