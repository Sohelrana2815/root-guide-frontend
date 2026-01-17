/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { getUserInfo } from "@/services/auth/getUserInfo";

/**
 * Fetch dashboard metadata appropriate for the current user role.
 * This runs server-side and uses authenticated cookie from `serverFetch`.
 */
export const getDashboardMetaData = async () => {
  // Try to get user info (contains `role`)
  const user = await getUserInfo();

  // default to tourist summary if role unknown
  const role = user?.role || "TOURIST";

  let endpoint = "/stats/tourist-summary";
  if (role === "GUIDE") endpoint = "/stats/guide-summary";
  if (role === "ADMIN") endpoint = "/stats/admin-summary";

  const res = await serverFetch.get(endpoint, {
    cache: "no-store",
  });

  try {
    const result = await res.json();
    return result;
  } catch (err: any) {
    console.log(err);
    return { success: false, message: "Failed to parse dashboard data" };
  }
};

export default getDashboardMetaData;
