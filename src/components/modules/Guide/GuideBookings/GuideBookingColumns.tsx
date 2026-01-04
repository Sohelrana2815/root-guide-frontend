/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@/components/shared/managementTables/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import { format } from "date-fns";
const statusConfig: Record<
  BookingStatus,
  { variant: any; label: string; className?: string }
> = {
  [BookingStatus.PENDING]: {
    variant: "default",
    label: "Pending",
    className: "bg-blue-500 hover:bg-blue-600",
  },
  [BookingStatus.CONFIRMED]: {
    variant: "secondary",
    label: "Confirmed",
  },
  [BookingStatus.COMPLETED]: {
    variant: "default",
    label: "Completed",
    className: "bg-green-500 hover:bg-green-600",
  },
  [BookingStatus.PAID]: {
    variant: "default",
    label: "Paid",
    className: "bg-green-500 hover:bg-green-600",
  },
  [BookingStatus.CANCELLED]: {
    variant: "destructive",
    label: "Cancelled",
  },
  [BookingStatus.FAILED]: {
    variant: "destructive",
    label: "Failed",
  },
};

export const guideBookingColumns: Column<IBooking>[] = [
  {
    header: "Tourist",
    accessor: (booking) => (
      <div className="flex items-center gap-2">
        <div>
          <p className="font-medium">{booking.touristId?.name || "N/A"}</p>
          <p className="text-xs text-muted-foreground">
            {booking.touristId?.email || ""}
          </p>
        </div>
      </div>
    ),
  },
  {
    header: "Date & Time",
    accessor: (booking) => {
      if (!booking.createdAt) return "N/A";
      return (
        <div className="text-sm">
          <p className="font-medium">
            {format(new Date(booking.createdAt), "MMM d, yyyy")}
          </p>
          <p className="text-muted-foreground">
            {format(new Date(booking.createdAt), "h:mm a")} -{" "}
            {format(new Date(booking.createdAt), "h:mm a")}
          </p>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessor: (booking) => {
      const config = statusConfig[booking.status];
      return (
        <Badge variant={config.variant} className={config.className}>
          {config.label}
        </Badge>
      );
    },
  },
  {
    header: "Payment",
    accessor: (booking) => {
      const isPaid = booking.paymentId.status === "PAID";
      return (
        <Badge
          variant={isPaid ? "default" : "secondary"}
          className={isPaid ? "bg-green-500" : ""}
        >
          {isPaid ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  {
    header: "Price",
    accessor: (booking) => {
      return <span>{booking.tourId.price}</span>;
    },
  },
];
