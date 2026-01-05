/* eslint-disable @typescript-eslint/no-explicit-any */
import { Column } from "@/components/shared/managementTables/ManagementTable";
import { Badge } from "@/components/ui/badge";
import {
  BookingStatus,
  IBooking,
  ITourist,
  ITour,
  IPayment,
} from "@/types/booking.interface";
import { format } from "date-fns";

// Helper functions to safely access populated data
const getTouristName = (touristId: string | ITourist | undefined): string => {
  if (typeof touristId === "object" && touristId) {
    return touristId.name || "N/A";
  }
  return "N/A";
};

const getTouristEmail = (touristId: string | ITourist | undefined): string => {
  if (typeof touristId === "object" && touristId) {
    return touristId.email || "";
  }
  return "";
};

// const getTourPrice = (tourId: string | ITour | undefined): number => {
//   if (typeof tourId === "object" && tourId) {
//     return tourId.price || 0;
//   }
//   return 0;
// };

const getTourTitle = (tourId: string | ITour | undefined): string => {
  if (typeof tourId === "object" && tourId) {
    return tourId.title || "N/A";
  }
  return "N/A";
};

export const getPaymentStatus = (
  paymentId: string | IPayment | undefined
): "PAID" | "UNPAID" => {
  if (typeof paymentId === "object" && paymentId) {
    return paymentId.status === "PAID" ? "PAID" : "UNPAID";
  }
  return "UNPAID";
};

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
    header: "Tourist Name",
    accessor: (booking) => {
      const touristName = getTouristName(booking.touristId);
      const touristEmail = getTouristEmail(booking.touristId);
      return (
        <div className="flex items-center gap-2">
          <div>
            <p className="font-medium text-sm">{touristName}</p>
            <p className="text-xs text-muted-foreground">{touristEmail}</p>
          </div>
        </div>
      );
    },
  },
  {
    header: "Tour",
    accessor: (booking) => {
      const tourTitle = getTourTitle(booking.tourId);
      return <span className="text-sm">{tourTitle}</span>;
    },
  },
  {
    header: "Booking Date",
    accessor: (booking) => {
      if (!booking.createdAt) return "N/A";
      return (
        <div className="text-sm">
          <p className="font-medium">
            {format(new Date(booking.createdAt), "MMM d, yyyy")}
          </p>
          <p className="text-xs text-muted-foreground">
            {format(new Date(booking.createdAt), "h:mm a")}
          </p>
        </div>
      );
    },
  },
  {
    header: "Booking Status",
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
    header: "Payment Status",
    accessor: (booking) => {
      const paymentStatus = getPaymentStatus(booking.paymentId);
      const isPaid = paymentStatus === "PAID";
      return (
        <Badge
          variant={isPaid ? "default" : "secondary"}
          className={isPaid ? "bg-green-500 hover:bg-green-600" : ""}
        >
          {isPaid ? "Paid" : "Unpaid"}
        </Badge>
      );
    },
  },
  {
    header: "Total Price",
    accessor: (booking) => {
      return <span className="font-medium">${booking.totalPrice}</span>;
    },
  },
];
