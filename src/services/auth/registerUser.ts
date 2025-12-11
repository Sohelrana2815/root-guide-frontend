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
    // --- FIX START ---

    // 2. Make the API call
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      // 3. IMPORTANT: Stringify the body data for the JSON API
      body: JSON.stringify(registerData),
      // 4. IMPORTANT: Set the Content-Type header to tell the server it's JSON
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Handle non-2xx HTTP status codes (e.g., 400, 500)
    if (!res.ok) {
      // Parse the error response from the server if available
      const errorData = await res.json();
      console.error("Server Registration Error:", errorData);
      // Throw an error to be caught by the catch block
      throw new Error(errorData.message || "Registration failed on server.");
    }

    // Parse the successful JSON response
    const data = await res.json();

    if (data.success) {
      await loginUser(_currentState, formData);
    }

    // How to see the formatted data in console:
    console.log("Successful API Response Data (JSON):", data);

    // --- FIX END ---

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
