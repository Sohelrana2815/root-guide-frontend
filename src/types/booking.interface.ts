export enum BookingStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface IBooking {
  _id?: string;
  touristId: string;
  tourId: string;
  guideId: string;
  paymentId?: string;
  guestCount: number;
  bookingDate: Date;
  totalPrice: number;
  status: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
