/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import {
  createTourZodSchema,
  // createTourZodSchema,
  updateTourZodSchema,
} from "@/zod/tour.validation";

export async function createTour(_prevState: any, formData: FormData) {
  try {
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      itinerary: formData.get("itinerary") as string,
      category: formData.get("category") as string,
      city: formData.get("city") as string,
      price: Number(formData.get("price")) || 0,
      duration: Number(formData.get("duration")) || 0,
      meetingPoint: formData.get("meetingPoint") as string,
      maxGroupSize: Number(formData.get("maxGroupSize")) || 0,
      languages: formData.getAll("languages").map(String).filter(Boolean),
      expertise: formData.getAll("expertise").map(String).filter(Boolean),
    };
    // log the payload so you can inspect shape in server console
    console.log("createTour - raw payload from form:", payload);

    if (zodValidator(payload, createTourZodSchema).success === false) {
      return zodValidator(payload, createTourZodSchema);
    }

    const validatedPayload = zodValidator(payload, createTourZodSchema).data;
    if (!validatedPayload) {
      return {
        success: false,
        message: "Invalid payload",
      };
    }
    console.log("createTour - validated payload:", validatedPayload);
    // console.log(validatedPayload);
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      newFormData.append("file", file);
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

export async function getTours(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/tours/my-tours${queryString ? `?${queryString}` : ""}`
    );

    const result = await response.json();
    const meta = result?.meta ?? { total: 0, page: 1, limit: 10 };
    const data = Array.isArray(result?.data) ? result.data : [];

    return {
      ...result,
      data,
      meta: {
        total: meta?.total ?? 0,
        page: meta?.page ?? 1,
        limit: meta?.limit ?? 10,
      },
    };
  } catch (error: any) {
    // console.log(error);
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, limit: 10 },
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong!"
      }`,
    };
  }
}

export async function getPublicTours() {
  try {
    const response = await serverFetch.get("/tours");

    const result = await response.json();
    const data = Array.isArray(result?.data) ? result.data : [];

    return data;
  } catch (error: any) {
    // console.log(error);
    // On error, always return an empty array so callers can safely iterate
    return [];
  }
}

export async function getTourById(id: string) {
  try {
    const res = await serverFetch.get(`/tours/${id}`);
    const result = await res.json();
    // console.log({ result });
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong!"
      }`,
    };
  }
}

export async function updateTour(
  id: string,
  _prevState: any,
  formData: FormData
) {
  try {
    const payload = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      city: formData.get("city") as string,
      price: Number(formData.get("price")) as number,
      duration: Number(formData.get("duration")) as number,
      meetingPoint: formData.get("meetingPoint") as string,
      maxGroupSize: Number(formData.get("maxGroupSize")) as number,
      languages: formData.getAll("languages").map(String).filter(Boolean),
      expertise: formData.getAll("expertise").map(String).filter(Boolean),
    };

    // First validate the payload
    const validationResult = zodValidator(payload, updateTourZodSchema);

    // Check if validation failed
    if (!validationResult.success) {
      return {
        success: false,
        message: "Validation failed",
        errors: validationResult.errors || [],
      };
    }

    // If we get here, validation passed
    const validatedPayload = validationResult.data;
    const newFormData = new FormData();
    newFormData.append("data", JSON.stringify(validatedPayload));

    const file = formData.get("file");
    if (file instanceof File && file.size > 0) {
      newFormData.append("file", file);
    }

    const response = await serverFetch.patch(`/tours/${id}`, {
      body: newFormData,
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("Update tour error:", error);
    return {
      success: false,
      message: error.message || "Failed to update tour",
    };
  }
}

export async function softDeleteTour(id: string) {
  try {
    const response = await serverFetch.patch(`/tours/softDelete/${id}`);
    const result = await response.json();
    // console.log({ result });
    return result;
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
export async function deleteTour(id: string) {
  try {
    const response = await serverFetch.delete(`/tours/${id}`);
    const result = await response.json();
    // console.log({ result });
    return result;
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
