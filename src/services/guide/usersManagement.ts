/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";

export async function getMe() {
  try {
    const res = await serverFetch.get("/users/me");
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
