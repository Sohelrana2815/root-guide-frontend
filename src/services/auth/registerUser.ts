/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";
import { loginUser } from "./loginUser";

const registerValidationZodSchema = z.object({
  name: z.string().nonempty("Name is required."),
  email: z
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),

  role: z.enum(["TOURIST", "GUIDE"], {
    error: "Role is required and role must be TOURIST or GUIDE.",
  }),

  password: z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must be at least 6 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .trim(),
});

export const registerUser = async (
  _currentState: any,
  formData: FormData // Use the correct type hint for clarity
): Promise<any> => {
  try {
    // 1. Convert FormData to a standard JavaScript object
    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const validatedFields = registerValidationZodSchema.safeParse(registerData);
    if (!validatedFields.success) {
      return {
        success: false,
        errors: validatedFields.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }
    console.log(validatedFields);
    // Console log the data to verify it's being sent correctly (on the server side)
    console.log("Data being sent to API:", registerData);
    // Use serverFetch helper to hit BACKEND_API_URL + /auth/register
    const res = await (await import("@/lib/server-fetch")).serverFetch.post("/auth/register", {
      body: JSON.stringify(registerData),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
      // bubble server validation errors back to client
      throw new Error(data.message || "Registration failed on server.");
    }

    // On success, auto-login the user by calling loginUser (which will set cookies and redirect)
    if (data.success) {
      await loginUser(_currentState, formData);
    }

    // Return the response data to the client-side useActionState hook
    return data;
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    // console.error("Client-Side or Network Error:", error.message);
    // Return an error object to the client
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Registration failed. You might have entered the wrong email or password."
      }`,
    };
  }
};
