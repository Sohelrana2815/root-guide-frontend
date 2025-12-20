/* eslint-disable @typescript-eslint/no-explicit-any */

import { serverFetch } from "@/lib/server-fetch";
import z from "zod";

const createTourZodSchema = z.object({
  title: z
    .string()
    .min(3, { error: "Title must be at least 3 characters long." })
    .max(50, { error: "Title cannot exceed 50 characters." }),
  description: z
    .string()
    .min(3, { error: "Description must be at least 3 characters long." })
    .max(250, { error: "Description cannot exceed 50 characters." }),
  //   itinerary: z
  //     .string()
  //     .min(3, { error: "Itinerary must be at least 3 characters long." })
  //     .max(50, { error: "Itinerary cannot exceed 50 characters." }),
  //   category: z
  //     .string()
  //     .min(3, { error: "Category must be at least 3 characters long." })
  //     .max(50, { error: "Category cannot exceed 50 characters." }),
  //   city: z
  //     .string()
  //     .min(3, { error: "City must be at least 3 characters long." })
  //     .max(50, { error: "City cannot exceed 50 characters." }),
  //   price: z,
});
export async function createTours(_prevState: any, formData: FormData) {
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

    const validatedPayload = createTourZodSchema.safeParse(payload);
    if (!validatedPayload.success) {
      return {
        success: false,
        errors: validatedPayload.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }
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
