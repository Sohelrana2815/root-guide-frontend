/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { IUser } from "@/types/user.interface";

export const getUserInfo = async (): Promise<IUser | null> => {
  try {
    const response = await serverFetch.get("/users/me", {
      cache: "force-cache",
      next: { tags: ["user-info"] },
    });
    const result = await response.json();

    const userInfo: IUser = {
      name: result.data?.name || "Unknown User",
      ...result.data,
    };
    return userInfo;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};
