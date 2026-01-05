import { IReview } from "./review.interface";

export enum BookingStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

// Support for populated tourist data
export interface ITourist {
  _id: string;
  name: string;
  email: string;
  phoneNumber?: string;
  address?: string;
}

// Support for populated tour data
export interface ITour {
  _id: string;
  title: string;
  price: number;
}

// Support for populated payment data
export interface IPayment {
  _id: string;
  status: "PAID" | "UNPAID" | "CANCELLED" | "PENDING";
  amount: number;
  transactionId: string;
}

export interface IBooking {
  _id?: string;
  touristId: string | ITourist;
  tourId: string | ITour;
  guideId: string;
  paymentId?: string | IPayment;
  guestCount: number;
  bookingDate?: Date | string;
  totalPrice: number;
  status: BookingStatus;
  review?: IReview;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  id?: string;
}
