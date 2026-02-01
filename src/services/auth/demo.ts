import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { createAdminZodSchema } from "@/zod/auth.validation";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const createAdmin = async (
  _currentState: any,
  formData: any,
): Promise<any> => {
  try {
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };
    console.log("From create admin server action fn: ", payload);

    if (zodValidator(payload, createAdminZodSchema).success === false) {
      return zodValidator(payload, createAdminZodSchema);
    }

    const validatedPayload = zodValidator(payload, createAdminZodSchema).data;

    const res = await serverFetch.post("/auth/create-admin", {
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
        message: text || res.statusText || "Admin Creation failed.",
      };
    }
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
          ? error?.message || "Admin creation failed"
          : "Admin Creation Failed. Please try again"
      }`,
    };
  }
};
