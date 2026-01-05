"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { updateBookingStatus } from "@/services/tourist/booking.service";
import { BookingStatus, IBooking, ITourist, IPayment } from "@/types/booking.interface";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface ChangeStatusDialogProps {
  booking: IBooking;
  isOpen: boolean;
  onClose: () => void;
}

// Helper function to get tourist name from populated or string data
const getTouristName = (touristId: string | ITourist | undefined): string => {
  if (typeof touristId === "object" && touristId) {
    return touristId.name || "Tourist";
  }
  return "Tourist";
};

// Helper function to get payment status
const getPaymentStatus = (paymentId: string | IPayment | undefined): string => {
  if (typeof paymentId === "object" && paymentId) {
    return paymentId.status || "UNPAID";
  }
  return "UNPAID";
};

export default function ChangeBookingStatusDialog({
  booking,
  isOpen,
  onClose,
}: ChangeStatusDialogProps) {
  const [newStatus, setNewStatus] = useState<BookingStatus>(booking.status);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statusOptions = [
    { value: BookingStatus.PENDING, label: "Pending" },
    { value: BookingStatus.CONFIRMED, label: "Confirmed" },
    { value: BookingStatus.PAID, label: "Paid" },
    { value: BookingStatus.COMPLETED, label: "Completed" },
    { value: BookingStatus.CANCELLED, label: "Cancelled" },
  ];

  const handleSubmit = async () => {
    if (newStatus === booking.status) {
      toast.info("No changes made");
      onClose();
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await updateBookingStatus(booking._id!, newStatus);

      if (result.success) {
        toast.success("Booking status updated successfully");

        // Show reminder if the payment status is unpaid and guide wants to change the status to completed
        // because a tourist can pay after the tour is completed
        const paymentStatus = getPaymentStatus(booking.paymentId);
        if (
          newStatus === BookingStatus.COMPLETED &&
          paymentStatus === "UNPAID"
        ) {
          setTimeout(() => {
            toast.info("Remember to contact your tourist for payment", {
              duration: 5000,
            });
          }, 1000);
        }

        onClose();
      } else {
        toast.error(result.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("An error occurred while updating status");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  const touristName = getTouristName(booking.touristId);
  const paymentStatus = getPaymentStatus(booking.paymentId);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Change Booking Status</DialogTitle>
          <DialogDescription>
            Update the status for {touristName}&apos;s booking
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Current Status */}
          <div className="space-y-2">
            <Label>Current Status</Label>
            <div className="text-sm font-medium">
              {
                statusOptions.find((opt) => opt.value === booking.status)
                  ?.label
              }
            </div>
          </div>

          {/* New Status */}
          <div className="space-y-2">
            <Label htmlFor="status">New Status</Label>
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value as BookingStatus)}
              disabled={isSubmitting}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Warning for Completion with Unpaid Payment */}
          {newStatus === BookingStatus.COMPLETED && paymentStatus === "UNPAID" && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
                <div className="text-sm text-amber-800">
                  <strong>Reminder:</strong> The tourist has not paid yet. After
                  marking as completed, please contact them to complete the payment.
                </div>
              </div>
            </div>
          )}

          {/* Info for Confirming Booking */}
          {newStatus === BookingStatus.CONFIRMED && booking.status === BookingStatus.PENDING && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <strong>Info:</strong> Once confirmed, the tourist can proceed
                  with payment now or later.
                </div>
              </div>
            </div>
          )}

          {/* Info for Cancelling Booking */}
          {newStatus === BookingStatus.CANCELLED && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                <div className="text-sm text-red-800">
                  <strong>Warning:</strong> Cancelled bookings cannot be changed back.
                  This action is permanent.
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
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
