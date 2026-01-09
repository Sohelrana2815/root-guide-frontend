"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Loader2, AlertCircle } from "lucide-react";
import { BookingStatus, IBooking } from "@/types/booking.interface";
import { updateBookingStatusAdmin } from "@/services/admin/booking.admin.service";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Props {
  booking: IBooking;
  isOpen: boolean;
  onClose: () => void;
}

const validTransitions: Record<BookingStatus, BookingStatus[]> = {
  [BookingStatus.PENDING]: [BookingStatus.CONFIRMED, BookingStatus.CANCELLED],
  [BookingStatus.CONFIRMED]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
  [BookingStatus.PAID]: [BookingStatus.COMPLETED, BookingStatus.CANCELLED],
  [BookingStatus.COMPLETED]: [],
  [BookingStatus.CANCELLED]: [],
  [BookingStatus.FAILED]: [BookingStatus.PENDING],
};

export default function ChangeBookingStatusDialogAdmin({
  booking,
  isOpen,
  onClose,
}: Props) {
  const [newStatus, setNewStatus] = useState<BookingStatus>(booking.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [, startTransition] = useTransition();

  const allowed = Array.from(
    new Set([booking.status, ...(validTransitions[booking.status] || [])])
  );

  const handleSubmit = async () => {
    if (newStatus === booking.status) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updateBookingStatusAdmin(booking._id!, newStatus);
      if (result.success) {
        toast.success("Booking status updated");
        if (newStatus === BookingStatus.CANCELLED) {
          toast.warning(
            "This booking is now cancelled and cannot be modified."
          );
        }
        // Refresh server data so parent table reflects new status
        startTransition(() => {
          router.refresh();
        });
        onClose();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Booking Status</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Current Status</Label>
            <div className="text-sm font-medium">{booking.status}</div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select
              value={newStatus}
              onValueChange={(v) => setNewStatus(v as BookingStatus)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {allowed.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {newStatus === BookingStatus.COMPLETED &&
            typeof booking.paymentId === "object" &&
            booking.paymentId.status === "UNPAID" && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                  <div className="text-sm text-amber-800">
                    Reminder: the tourist has not paid yet — consider contacting
                    them to collect payment.
                  </div>
                </div>
              </div>
            )}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Updating...
              </>
            ) : (
              "Confirm Change"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
