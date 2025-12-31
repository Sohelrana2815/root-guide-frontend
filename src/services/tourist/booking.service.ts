/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";
import { IBooking } from "@/types/booking.interface";

export async function createBooking(data: IBooking) {
  try {
    const response = await serverFetch.post("/bookings", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error while booking a tour:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to book a tour",
    };
  }
}
