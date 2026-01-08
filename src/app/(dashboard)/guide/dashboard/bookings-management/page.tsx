import GuideBookingTable from "@/components/modules/Guide/GuideBookings/GuideBookingTable";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import { getGuideBookings } from "@/services/tourist/booking.service";
import { IBooking } from "@/types/booking.interface";
import { Suspense } from "react";

async function BookingsContent() {
  const response = await getGuideBookings();

  const bookings: IBooking[] = response?.data || [];

  return <GuideBookingTable bookings={bookings} />;
}

const GuideBookingsPage = async () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          My Bookings Received
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your tourist bookings
        </p>
      </div>
      <RefreshButton />
      <Suspense fallback={<div>Loading Bookings...</div>}>
        <BookingsContent />
      </Suspense>
    </div>
  );
};

export default GuideBookingsPage;
