/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();
    const userId = formData.get("id") as string;
    const data: any = {};

    formData.forEach((value, key) => {
      if (key !== "file" && value) {
        data[key] = value;
      }
    });

    // console.log(userId, "from auth service");
    uploadFormData.append("data", JSON.stringify(data));

    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch(`/users/${userId}`, {
      body: uploadFormData,
    });
    const result = await response.json();
    revalidateTag("user-info", "max");
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
