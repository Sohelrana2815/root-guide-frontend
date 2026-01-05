"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  IBooking,
  ITourist,
  ITour,
  IPayment,
  BookingStatus,
} from "@/types/booking.interface";
import { DialogTitle } from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

interface GuideBookingDetailDialogProps {
  booking: IBooking | null;
  open: boolean;
  onClose: () => void;
}

// Helper functions to safely access populated data
const getTouristData = (touristId: string | ITourist | undefined) => {
  if (typeof touristId === "object" && touristId) {
    return touristId;
  }
  return null;
};

const getTourData = (tourId: string | ITour | undefined) => {
  if (typeof tourId === "object" && tourId) {
    return tourId;
  }
  return null;
};

const getPaymentData = (paymentId: string | IPayment | undefined) => {
  if (typeof paymentId === "object" && paymentId) {
    return paymentId;
  }
  return null;
};

const statusColorConfig: Record<BookingStatus, string> = {
  [BookingStatus.PENDING]: "border-blue-500 text-blue-700 bg-blue-50",
  [BookingStatus.CONFIRMED]: "border-purple-500 text-purple-700 bg-purple-50",
  [BookingStatus.PAID]: "border-green-500 text-green-700 bg-green-50",
  [BookingStatus.COMPLETED]: "border-green-500 text-green-700 bg-green-50",
  [BookingStatus.CANCELLED]: "border-red-500 text-red-700 bg-red-50",
  [BookingStatus.FAILED]: "border-red-500 text-red-700 bg-red-50",
};

const GuideBookingDetailDialog = ({
  booking,
  open,
  onClose,
}: GuideBookingDetailDialogProps) => {
  const router = useRouter();

  if (!booking) return null;

  const tourist = getTouristData(booking.touristId);
  const tour = getTourData(booking.tourId);
  const payment = getPaymentData(booking.paymentId);

  const handleClose = () => {
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="min-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Tourist Information */}
          {tourist && (
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold text-lg mb-3">
                Tourist Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Name</p>
                  <p className="font-medium">{tourist.name || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{tourist.email || "N/A"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone Number</p>
                  <p className="font-medium">
                    {tourist.phoneNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Address</p>
                  <p className="font-medium">
                    {tourist.address || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Details */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Booking Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Tour</p>
                <p className="font-medium">{tour?.title || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Booking Date</p>
                <p className="font-medium">
                  {booking.createdAt
                    ? format(new Date(booking.createdAt), "PPP")
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Guest Count</p>
                <p className="font-medium">{booking.guestCount}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tour Price</p>
                <p className="font-medium">${tour?.price || "N/A"}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Price</p>
                <p className="font-medium text-lg text-green-600">
                  ${booking.totalPrice}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Booking Status</p>
                <div>
                  <Badge
                    variant="outline"
                    className={statusColorConfig[booking.status]}
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          {payment && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-3">
                Payment Information
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Payment Status</p>
                  <div>
                    <Badge
                      variant={
                        payment.status === "PAID" ? "default" : "secondary"
                      }
                      className={
                        payment.status === "PAID"
                          ? "bg-green-500 hover:bg-green-600"
                          : ""
                      }
                    >
                      {payment.status}
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Transaction ID</p>
                  <p className="font-medium text-xs">{payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Amount</p>
                  <p className="font-medium">${payment.amount}</p>
                </div>
              </div>
            </div>
          )}

          {/* Booking Status Information */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-lg mb-3">Status Information</h3>
            {booking.status === "CANCELLED" && (
              <div className="text-sm text-red-800 p-4 bg-red-50 border border-red-200 rounded-md">
                <p>
                  ⚠️ This booking has been cancelled and cannot be modified.
                </p>
              </div>
            )}
            {booking.status === "COMPLETED" && (
              <div className="text-sm text-green-800 p-4 bg-green-50 border border-green-200 rounded-md">
                <p>✓ This booking has been completed.</p>
                {payment?.status === "UNPAID" && (
                  <p className="mt-2">
                    📌 The tourist still needs to complete the payment.
                  </p>
                )}
              </div>
            )}
            {booking.status === "PENDING" && (
              <div className="text-sm text-blue-800 p-4 bg-blue-50 border border-blue-200 rounded-md">
                <p>
                  ⏳ This booking is pending confirmation. You can confirm,
                  cancel, or wait for the tourist to pay.
                </p>
              </div>
            )}
            {booking.status === "CONFIRMED" && (
              <div className="text-sm text-purple-800 p-4 bg-purple-50 border border-purple-200 rounded-md">
                <p>✓ This booking has been confirmed.</p>
                {payment?.status === "UNPAID" && (
                  <p className="mt-2">
                    📌 Waiting for payment from the tourist. They can pay now or
                    later.
                  </p>
                )}
                {payment?.status === "PAID" && (
                  <p className="mt-2">✓ Payment has been received.</p>
                )}
              </div>
            )}
            {booking.status === "PAID" && (
              <div className="text-sm p-4 bg-amber-50 border border-purple-200 rounded-md">
                <p className="text-green-600">
                  ✓ Tourist has already paid for this tour.
                </p>
                {payment?.status === "PAID" && (
                  <p className="mt-2 text-amber-800">
                    ⚠️ Please change the booking status to{" "}
                    <Badge
                      variant="secondary"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      COMPLETED
                    </Badge>
                    .
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GuideBookingDetailDialog;
