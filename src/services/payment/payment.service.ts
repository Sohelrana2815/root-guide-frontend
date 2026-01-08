/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export async function initiatePayment(bookingId: string) {
  try {
    const response = await serverFetch.post(`/payment/init-payment/${bookingId}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error initiating payment:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to initiate payment",
    };
  }
}

export async function getPaymentStatus(bookingId: string) {
  try {
    const response = await serverFetch.get(`/payment/booking/${bookingId}`);
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error getting payment status:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch payment status",
    };
  }
}
