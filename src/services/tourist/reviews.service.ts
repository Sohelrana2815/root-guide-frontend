/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const createReview = async (reviewData: {
  bookingId: string;
  rating: number;
  comment: string;
}) => {
  try {
    const response = await serverFetch.post("/reviews", {
      body: JSON.stringify(reviewData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Error while creating a review:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create a review",
    };
  }
};

export const getTourReviews = async (tourId: string) => {
  try {
    const res = await serverFetch.get(`/reviews/tour/${tourId}`);
    return res.json();
  } catch (error: any) {
    console.error("Error while creating a review:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to create a review",
    };
  }
};
