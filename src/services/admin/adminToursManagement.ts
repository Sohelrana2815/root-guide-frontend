/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getAllTours(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/tours/all-tours${queryString ? `?${queryString}` : ""}`
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
