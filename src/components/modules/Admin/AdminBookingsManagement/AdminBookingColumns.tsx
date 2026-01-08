/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Column } from "@/components/shared/managementTables/ManagementTable";
import { Badge } from "@/components/ui/badge";
import {
  IBooking,
  BookingStatus,
  ITourist,
  ITour,
  IPayment,
} from "@/types/booking.interface";
import { format } from "date-fns";

const getTouristName = (touristId: string | ITourist | undefined) =>
  typeof touristId === "object" && touristId ? touristId.name : "N/A";
const getTouristEmail = (touristId: string | ITourist | undefined) =>
  typeof touristId === "object" && touristId ? touristId.email : "";
const getPaymentStatus = (paymentId: string | IPayment | undefined) =>
  typeof paymentId === "object" && paymentId ? paymentId.status : "UNPAID";
const getTourTitle = (tourId: string | ITour | undefined) =>
  typeof tourId === "object" && tourId ? tourId.title : "N/A";

const statusConfig: Record<BookingStatus, { variant: any; label: string }> = {
  [BookingStatus.PENDING]: { variant: "default", label: "Pending" },
  [BookingStatus.CONFIRMED]: { variant: "secondary", label: "Confirmed" },
  [BookingStatus.COMPLETED]: { variant: "default", label: "Completed" },
  [BookingStatus.PAID]: { variant: "default", label: "Paid" },
  [BookingStatus.CANCELLED]: { variant: "destructive", label: "Cancelled" },
  [BookingStatus.FAILED]: { variant: "destructive", label: "Failed" },
};

export const adminBookingColumns: Column<IBooking>[] = [
  {
    header: "Tourist",
    accessor: (booking) => (
      <div className="flex flex-col">
        <span className="font-medium">{getTouristName(booking.touristId)}</span>
        <span className="text-xs text-muted-foreground">
          {getTouristEmail(booking.touristId)}
        </span>
      </div>
    ),
  },
  {
    header: "Tour",
    accessor: (booking) => (
      <span className="text-sm">{getTourTitle(booking.tourId)}</span>
    ),
  },
  {
    header: "Booked At",
    accessor: (booking) =>
      booking.createdAt ? format(new Date(booking.createdAt), "PPP") : "N/A",
  },
  {
    header: "Status",
    accessor: (booking) => {
      const cfg = statusConfig[booking.status];
      return <Badge variant={cfg.variant}>{cfg.label}</Badge>;
    },
  },
  {
    header: "Payment",
    accessor: (booking) => {
      const ps = getPaymentStatus(booking.paymentId);
      return (
        <Badge variant={ps === "PAID" ? "default" : "secondary"}>{ps}</Badge>
      );
    },
  },
  {
    header: "Total",
    accessor: (booking) => <span>${booking.totalPrice}</span>,
  },
  {
    header: "Activation",
    accessor: (booking) => (
      <span>
        {booking.isActive ? (
          <Badge className="bg-green-700 ">Active </Badge>
        ) : (
          <Badge variant="destructive">Inactive</Badge>
        )}
      </span>
    ),
  },
];

export default adminBookingColumns;
