/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createTourZodSchema } from "@/zod/tour.validation";

export async function createTour(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
      // description: formData.get("description") as string,
      // itinerary: formData.get("itinerary") as string,
      // category: formData.get("category") as string,
      // city: formData.get("city") as string,
      // price: formData.get("price") as string,
      // duration: formData.get("duration") as string,
      // meetingPoint: formData.get("meetingPoint") as string,
      // maxGroupSize: formData.get("maxGroupSize") as string,
      // image: formData.get("image") as string,
    };

    if (zodValidator(payload, createTourZodSchema).success === false) {
      return zodValidator(payload, createTourZodSchema);
    }

    const validatedPayload = zodValidator(payload, createTourZodSchema).data;

    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const res = await serverFetch.post("/tours/create-tour", {
      body: newFormData,
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
export async function getTours() {
  try {
    const response = await serverFetch.get("/tours/all-tours");
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}

export async function updateTours() {}

export async function deleteTours(id: string) {
  try {
    const response = await serverFetch.delete(`/tours/${id}`);
    const data = await response.json();
    return data;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong"
      }`,
    };
  }
}
