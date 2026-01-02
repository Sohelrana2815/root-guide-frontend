/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from "@/components/ui/badge";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import { useRouter } from "next/navigation";

interface BookingDetailsProps {
  booking: IBooking;
}

const BookingDetails = ({ booking }: BookingDetailsProps) => {
  const router = useRouter();

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

  return (
    <div>
      <h1>Booking Details Page</h1>
    </div>
  );
};

export default BookingDetails;
