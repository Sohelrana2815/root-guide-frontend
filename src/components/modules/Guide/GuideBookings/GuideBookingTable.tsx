"use client";
import ManagementTable from "@/components/shared/managementTables/ManagementTable";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import { useState } from "react";
import { toast } from "sonner";
import { guideBookingColumns } from "./GuideBookingColumns";
import GuideBookingDetailDialog from "./GuideBookingDetailDialog";
import ChangeBookingStatusDialog from "./ChangeBookingStatusDialog";
import { useRouter } from "next/navigation";

interface GuideBookingsTableProps {
  bookings: IBooking[];
}

const GuideBookingTable = ({ bookings = [] }: GuideBookingsTableProps) => {
  const router = useRouter();

  const [viewBooking, setViewBooking] = useState<IBooking | null>(null);
  const [changingBookingStatus, setChangingBookingStatus] =
    useState<IBooking | null>(null);

  const handleView = (booking: IBooking) => {
    setViewBooking(booking);
  };

  const handleChangeStatus = (booking: IBooking) => {
    setChangingBookingStatus(booking);
  };

  const handleEditClick = (booking: IBooking) => {
    // cannot change status for:
    // 1. Completed booking
    // 2. Cancelled booking

    if (booking.status === BookingStatus.CANCELLED) {
      toast.error("Cannot change status for canceled booking", {
        description: "Canceled bookings are final and cannot be modified.",
      });
      return;
    }

    if (booking.status === BookingStatus.COMPLETED) {
      toast.error("Cannot change status once booking status is Completed");
      return;
    }
    handleChangeStatus(booking);
  };

  return (
    <>
      <ManagementTable
        data={bookings}
        columns={guideBookingColumns}
        onView={handleView}
        onEdit={handleEditClick}
        getRowKey={(booking) => booking._id!}
      />
      {/* View detail dialog */}
      {viewBooking && (
        <GuideBookingDetailDialog
          booking={viewBooking}
          open={!!viewBooking}
          onClose={() => {
            setViewBooking(null);
            router.refresh();
          }}
        />
      )}
      {/* Change Status Dialog */}
      {changingBookingStatus && (
        <ChangeBookingStatusDialog
          booking={changingBookingStatus}
          isOpen={!!changingBookingStatus}
          onClose={() => {
            setChangingBookingStatus(null);
            router.refresh();
          }}
        />
      )}
    </>
  );
};

export default GuideBookingTable;
