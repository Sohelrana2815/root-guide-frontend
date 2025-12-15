/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import z from "zod";

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
    console.log(formData.get("role"));
    const registerData = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
    };

    const validateRequest = registerValidationZodSchema.safeParse(registerData);
    if (!validateRequest.success) {
      return {
        success: false,
        errors: validateRequest.error.issues.map((issue) => {
          return {
            field: issue.path[0],
            message: issue.message,
          };
        }),
      };
    }

    const res = await fetch(`${process.env.BASE_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });
    const data = await res.json();
    console.log(res, data);
    return data;
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
