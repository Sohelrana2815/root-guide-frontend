"use server";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { serverFetch } from "@/lib/server-fetch";

export interface ICreateBookingPayload {
  tourId: string;
  guideId: string;
  guestCount: number;
  bookingDate?: Date | string;
}

export async function createBooking(data: ICreateBookingPayload) {
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

export const getAllToursWithGuides = async () => {
  try {
    const res = await serverFetch.get("/tours/with-guide");
    const result = await res.json();
    return result;
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
};

export async function getGuideById(id: string) {
  try {
    const response = await serverFetch.get(`/guide/${id}`);
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch guide profile");
    }
    return result;
  } catch (error: any) {
    console.error("Error while fetching bookings:", error);
    return {
      success: false,
      data: null,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching the guide profile.",
    };
  }
}
export async function getTourById() {
  try {
  } catch (error: any) {
    console.error("Error while fetching tour:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch bookings",
    };
  }
}
