/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export const getGlobalMeta = async () => {
  try {
    const res = await serverFetch.get("/stats/global-meta", {
      next: { revalidate: 3600 },
    });
    const result = await res.json();
    console.log("From server action:", result);
    return result;
  } catch (error: any) {
    console.log(error);
    return { success: false, message: "Failed to get global meta" };
  }
};
