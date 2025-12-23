/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { ITour } from "@/types/tour.interface";
import {
  createTourZodSchema,
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
      price: Number(formData.get("price")) as number,
      duration: Number(formData.get("duration")) as number,
      meetingPoint: formData.get("meetingPoint") as string,
      maxGroupSize: Number(formData.get("maxGroupSize")) as number,
    };

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
    // console.log(validatedPayload);
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
    console.log(error);
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
    };

    const validatedPayload = zodValidator(payload, updateTourZodSchema).data;

    const newFormData = new FormData();

    newFormData.append("data", JSON.stringify(validatedPayload));
    if (formData.get("file")) {
      newFormData.append("file", formData.get("file") as Blob);
    }

    const response = await serverFetch.patch(`/tours/${id}`, {
      body: newFormData,
    });

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
    const response = await serverFetch.patch(`/tours/${id}`);
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
