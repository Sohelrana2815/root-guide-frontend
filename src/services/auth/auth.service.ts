/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";
import { revalidateTag } from "next/cache";

export async function updateMyProfile(formData: FormData) {
  try {
    const uploadFormData = new FormData();
    const userId = formData.get("id") as string;

    // 1. Create a clean object for the payload
    const data: Record<string, any> = {};

    // 2. list of fields that are Arrays in your backend interface
    const arrayFields = ["languages", "expertise", "preferences"];

    // 3. list of fields that must be Numbers
    const numberFields = ["dailyRate", "averageRating"];

    // 4. Manually extract keys to avoid the 'forEach' overwrite bug
    // specific logic for array fields
    arrayFields.forEach((field) => {
      const values = formData.getAll(field);
      // Only add if there are values (prevents sending empty arrays if not intended)
      if (values.length > 0) {
        data[field] = values;
      }
    });

    // 5. Handle all other single value fields
    formData.forEach((value, key) => {
      // Skip array fields (handled above) and file/id
      if (!arrayFields.includes(key) && key !== "file" && key !== "id") {
        // Handle Number conversion
        if (numberFields.includes(key)) {
          data[key] = Number(value);
        } else {
          data[key] = value;
        }
      }
    });

    // Debugging: Check what is actually being sent now
    // console.log("Final Payload:", data);

    // 6. Append the JSON stringified data
    uploadFormData.append("data", JSON.stringify(data));

    // 7. Handle File Upload
    const file = formData.get("file");
    if (file && file instanceof File && file.size > 0) {
      uploadFormData.append("file", file);
    }

    const response = await serverFetch.patch(`/users/${userId}`, {
      body: uploadFormData,
    });

    const result = await response.json();
    revalidateTag("user-info", "max"); // using default cache tag strategy
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