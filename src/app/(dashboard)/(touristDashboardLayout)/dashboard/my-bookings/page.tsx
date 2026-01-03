import TourBookingList from "@/components/modules/Tourist/TourBookings/TourBookingList";
import { getMyBookings } from "@/services/tourist/booking.service";
import { IBooking } from "@/types/booking.interface";

const MyBookedToursPage = async () => {
  const response = await getMyBookings();
  const bookings: IBooking[] = response?.data || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Booked Tours</h1>
        <p className="text-muted-foreground mt-2">
          View and manage your bookings and enjoy your adventures.
        </p>
      </div>
      <TourBookingList bookings={bookings} />
    </div>
  );
};

export default MyBookedToursPage;
