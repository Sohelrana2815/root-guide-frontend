/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidatePath } from "next/cache";

export async function getAllUsers(queryString?: string) {
  try {
    const response = await serverFetch.get(
      `/users/all-users${queryString ? `?${queryString}` : ""}`
    );

    const result = await response.json();

    // Ensure meta defaults if backend fails to provide them
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
          : "Failed to fetch users",
    };
  }
}

export async function updateUserRole(id: string, role: string) {
  try {
    const response = await serverFetch.patch(`/users/${id}/role`, {
      body: JSON.stringify({ role }),
    });

    const result = await response.json();
    revalidatePath("/admin/users"); // Refresh the users table
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to update role",
    };
  }
}

export async function blockUser(id: string) {
  try {
    const response = await serverFetch.patch(`/users/${id}/block`);
    const result = await response.json();
    revalidatePath("/admin/users-management");
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function unblockUser(id: string) {
  try {
    const response = await serverFetch.patch(`/users/${id}/unblock`);
    const result = await response.json();
    revalidatePath("/admin/users-management");
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Something went wrong",
    };
  }
}

export async function deleteUser(id: string) {
  try {
    const response = await serverFetch.delete(`/users/${id}`);
    const result = await response.json();
    revalidatePath("/admin/users-management");
    return result;
  } catch (error: any) {
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to delete user",
    };
  }
}
