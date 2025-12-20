/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";

const registerValidationZodSchema = z.object({
  name: z
    .string()
    .nonempty({ error: "Name is required." })
    .min(3, { error: "Name must be at least 3 characters long." })
    .max(50, { error: "Name cannot exceed 50 characters." }),
  email: z.email("Please provide a valid email").nonempty("Email is required"),

  password: z
    .string()
    .nonempty({ error: "Password is required." })
    .min(6, { error: "Password must be at least 6 characters long." })
    .max(50, { error: "Password cannot exceed 50 characters." }),
  role: z.enum(["TOURIST", "GUIDE"], { error: "Role is required." }),
});
export const registerUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    // console.log(formData.get("role"));
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    if (zodValidator(payload, registerValidationZodSchema).success === false) {
      return zodValidator(payload, registerValidationZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      registerValidationZodSchema
    ).data;

    const res = await serverFetch.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/register`,
      {
        body: JSON.stringify(validatedPayload),
      }
    );
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      const text = await res.text().catch(() => "");
      data = {
        success: false,
        message: text || res.statusText || "Registration failed",
      };
    }

    if (data.success) {
      await loginUser(_currentState, formData);
    }

    // console.log(res, data);
    return data;
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error?.message || "Registration failed"
          : "Registration Failed. Please try again."
      }`,
    };
  }
};
