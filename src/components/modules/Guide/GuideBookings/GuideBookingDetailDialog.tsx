import { Dialog, DialogContent } from "@/components/ui/dialog";
import { IBooking } from "@/types/booking.interface";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface GuideBookingDetailDialogProps {
  booking: IBooking | null;
  open: boolean;
  onClose: () => void;
}

const GuideBookingDetailDialog = ({
  booking,
  open,
  onClose,
}: GuideBookingDetailDialogProps) => {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!booking) return null;

  const { touristId, status, bookingDate, paymentId, tourId } = booking;

  const isCompleted = (status = "COMPLETED");
  const isPaid = !!paymentId.status;
  // not my project related
  const canWritePrescription = isCompleted && !hasPrescription;

  const handleSubmitPrescription = async () => {};

  //   const handleSubmitPrescription = async () => {
  //     if (!instructions.trim()) {
  //       toast.error("Please provide prescription instructions");
  //       return;
  //     }

  //     if (instructions.trim().length < 20) {
  //       toast.error(
  //         "Instructions must be at least 20 characters long for clarity"
  //       );
  //       return;
  //     }

  //     setIsSubmitting(true);

  //     try {
  //       const prescriptionData: {
  //         appointmentId: string;
  //         instructions: string;
  //         followUpDate?: string;
  //       } = {
  //         appointmentId: appointment.id,
  //         instructions: instructions.trim(),
  //       };

  //       if (followUpDate) {
  //         // Convert to ISO-8601 DateTime format
  //         prescriptionData.followUpDate = new Date(followUpDate).toISOString();
  //       }

  //       const result = await createPrescription(prescriptionData);

  //       if (result.success) {
  //         toast.success("Prescription created successfully");
  //         setInstructions("");
  //         setFollowUpDate("");
  //         onClose();
  //         router.refresh();
  //       } else {
  //         toast.error(result.message || "Failed to create prescription");
  //       }
  //     } catch (error) {
  //       console.error("Error creating prescription:", error);
  //       toast.error("An error occurred while creating prescription");
  //     } finally {
  //       setIsSubmitting(false);
  //     }
  //   };

  const handleClose = () => {
    onClose();
    router.refresh();
  };

  return (
    <Dialog>
      <DialogContent>
        
      </DialogContent>
    </Dialog>
  );
};

export default GuideBookingDetailDialog;
