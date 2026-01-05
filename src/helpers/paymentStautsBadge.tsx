import { Badge } from "@/components/ui/badge";
import { IPayment } from "@/types/booking.interface";

export const getPaymentStatus = (
  paymentId: string | IPayment | undefined
): "PAID" | "UNPAID" => {
  if (typeof paymentId === "object" && paymentId !== null) {
    return paymentId.status === "PAID" ? "PAID" : "UNPAID";
  }
  return "UNPAID";
};

const PaymentStatusBadge = ({
  paymentId,
}: {
  paymentId: string | IPayment | undefined;
}) => {
  const status = getPaymentStatus(paymentId);
  const isPaid = status === "PAID";

  return (
    <Badge
      variant="outline"
      className={`px-3 py-1 font-medium capitalize ${
        isPaid
          ? "bg-emerald-100 text-emerald-700 border-emerald-200"
          : "bg-amber-100 text-amber-700 border-amber-200"
      }`}
    >
      {status.toLowerCase()}
    </Badge>
  );
};

export default PaymentStatusBadge;
