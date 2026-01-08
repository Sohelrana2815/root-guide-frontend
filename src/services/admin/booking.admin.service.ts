/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export async function getAdminBookings(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/bookings/admin/all-bookings${queryString ? `?${queryString}` : ""}`
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
    return {
      success: false,
      data: [],
      meta: { total: 0, page: 1, limit: 10 },
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong while fetching bookings!",
    };
  }
}

export async function updateBookingStatusAdmin(id: string, status: string) {
  try {
    const res = await serverFetch.patch(`/bookings/${id}/status`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    const result = await res.json();
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update booking status",
    };
  }
}

export async function toggleBookingActiveAdmin(id: string) {
  try {
    const res = await serverFetch.patch(`/bookings/admin/${id}/toggle-active`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed" };
  }
}

export async function softDeleteBookingAdmin(id: string) {
  try {
    const res = await serverFetch.patch(`/bookings/admin/${id}/soft-delete`);
    const result = await res.json();
    return result;
  } catch (error: any) {
    return { success: false, message: error.message || "Failed" };
  }
}


