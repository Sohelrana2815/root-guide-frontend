"use client";

import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { IBooking } from "@/types/booking.interface";
import { useRouter } from "next/navigation";

interface Props {
  booking: IBooking | null;
  open: boolean;
  onClose: () => void;
}

const AdminBookingDetailDialog = ({ booking, open, onClose }: Props) => {
  const router = useRouter();
  if (!booking) return null;

  const tourist =
    typeof booking.touristId === "object" ? booking.touristId : null;
  const payment =
    typeof booking.paymentId === "object" ? booking.paymentId : null;

  const handleClose = () => {
    onClose();
    router.refresh();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-muted-foreground">Tourist</p>
              <p className="font-medium">{tourist?.name || "N/A"}</p>
              <p className="text-sm">{tourist?.email}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Booked At</p>
              <p className="font-medium">
                {booking.createdAt
                  ? format(new Date(booking.createdAt), "PPP p")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Status</p>
              <Badge variant="outline">{booking.status}</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Payment</p>
              <Badge
                variant={payment?.status === "PAID" ? "default" : "secondary"}
              >
                {payment?.status || "UNPAID"}
              </Badge>
            </div>
          </div>

          <div className="border rounded-md p-3">
            <p className="text-muted-foreground">Tour Details</p>
            <p className="font-medium">
              {typeof booking.tourId === "object"
                ? booking.tourId.title
                : "N/A"}
            </p>
            <p className="text-sm">
              Price: $
              {typeof booking.tourId === "object"
                ? booking.tourId.price
                : booking.totalPrice}
            </p>
          </div>
        </div>

        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AdminBookingDetailDialog;
