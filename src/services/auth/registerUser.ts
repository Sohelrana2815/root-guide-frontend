/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { loginUser } from "./loginUser";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { registerValidationZodSchema } from "@/zod/auth.validation";

export const registerUser = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    // console.log(formData.get("role"));
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      languages: formData.getAll("languages").map(String).filter(Boolean),
      expertise: formData.getAll("expertise").map(String).filter(Boolean),
    };
    console.log("from registerUser server action fn:", payload);
    if (zodValidator(payload, registerValidationZodSchema).success === false) {
      return zodValidator(payload, registerValidationZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      registerValidationZodSchema,
    ).data;

    const res = await serverFetch.post("/auth/register", {
      body: JSON.stringify(validatedPayload),
      headers: { "Content-Type": "application/json" },
    });
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
