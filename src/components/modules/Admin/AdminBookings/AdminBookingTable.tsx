"use client";

import ManagementTable from "@/components/shared/managementTables/ManagementTable";
import adminBookingColumns from "./AdminBookingColumns";
import { IBooking } from "@/types/booking.interface";
import { useState, useTransition } from "react";
import AdminBookingDetailDialog from "./AdminBookingDetailDialog";
import ChangeBookingStatusDialogAdmin from "./ChangeBookingStatusDialogAdmin";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { toast } from "sonner";
import {
  toggleBookingActiveAdmin,
  softDeleteBookingAdmin,
} from "@/services/admin/booking.admin.service";
import { useRouter } from "next/navigation";

interface Props {
  bookings: IBooking[];
}

const AdminBookingTable = ({ bookings = [] }: Props) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewBooking, setViewBooking] = useState<IBooking | null>(null);
  const [editingBooking, setEditingBooking] = useState<IBooking | null>(null);
  const [deletingBooking, setDeletingBooking] = useState<IBooking | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleView = (b: IBooking) => setViewBooking(b);
  const handleEdit = (b: IBooking) => {
    if (b.status === "COMPLETED" || b.status === "CANCELLED") {
      toast.error("Cannot modify completed or cancelled bookings");
      return;
    }
    setEditingBooking(b);
  };

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (b: IBooking) => {
    setDeletingBooking(b);
  };

  const handleToggleActive = async (b: IBooking) => {
    try {
      const res = await toggleBookingActiveAdmin(b._id!);
      if (res.success) {
        if (b.isActive === true) {
          toast.warning("Booking deactivated");
        } else toast.success("Booking activated");
        handleRefresh();
      } else {
        toast.error(res.message || "Failed to toggle");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error toggling active status");
    }
  };

  const confirmDelete = async () => {
    if (!deletingBooking) return;

    setIsDeleting(true);
    try {
      const res = await softDeleteBookingAdmin(deletingBooking._id!);
      setIsDeleting(false);
      if (res.success) {
        toast.success("Booking deleted successfully");
        setDeletingBooking(null);
        handleRefresh();
      } else {
        toast.error(res.message || "Failed to delete booking");
      }
    } catch (err) {
      setIsDeleting(false);
      console.error(err);
      toast.error("Error deleting booking");
    }
  };

  return (
    <>
      <ManagementTable
        data={bookings}
        columns={adminBookingColumns}
        onView={handleView}
        onEdit={handleEdit}
        onBlock={handleToggleActive}
        onDelete={handleDelete}
        getRowKey={(b) => b._id!}
      />

      {viewBooking && (
        <AdminBookingDetailDialog
          booking={viewBooking}
          open={!!viewBooking}
          onClose={() => setViewBooking(null)}
        />
      )}

      {editingBooking && (
        <ChangeBookingStatusDialogAdmin
          booking={editingBooking}
          isOpen={!!editingBooking}
          onClose={() => setEditingBooking(null)}
        />
      )}

      <DeleteConfirmation
        open={!!deletingBooking}
        onOpenChange={(open) => !open && setDeletingBooking(null)}
        onConfirm={confirmDelete}
        title="Delete Booking"
        description={`Are you sure you want to delete this booking? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminBookingTable;
