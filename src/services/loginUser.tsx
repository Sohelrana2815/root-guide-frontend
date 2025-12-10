"use server";

import z from "zod";
import { parse } from "cookie";
import { cookies } from "next/headers";

const loginValidationZodSchema = z.object({
  email: z
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),

  password: z
    .string()
    .nonempty("Password is required.")
    .min(6, "Password must be at least 6 characters long.")
    .max(50, "Password cannot exceed 50 characters.")
    .trim(),
});

export const loginUser = async (
  _currentState: any,
  formData: FormData // Use correct type for clarity
): Promise<any> => {
  try {
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
      // These will now receive the values because you added the 'name' attributes
      email: formData.get("email"),
      password: formData.get("password"),
    };

    const validatedFields = loginValidationZodSchema.safeParse(loginData);

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


    // Console log the data to verify it's being sent correctly (on the server side)

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // CRITICAL: Handle API errors (e.g., 401 Unauthorized/Bad Credentials)
    if (!res.ok) {
      const errorData = await res.json();
      console.error("API Login Error:", errorData);

      // Throw the server's error message
      throw new Error(errorData.message || "Login failed due to server error.");
    }

    // Parse the successful response
    const data = await res.json();

    const setCookieHeaders = res.headers.getSetCookie();
    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie["accessToken"]) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie["refreshToken"]) {
          refreshTokenObject = parsedCookie;
        }
      });
    } else {
      throw new Error("No Set-cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }
    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    // (await cookies()).set()
    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject.MaxAge),
      path: accessTokenObject.Path || "/",
    });

    // refresh token
    cookieStore.set("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(refreshTokenObject.MaxAge),
      path: refreshTokenObject.Path || "/",
    });

    return data;
  } catch (error: any) {
    console.error("Action Error:", error.message);
    // Return a structured error to the client component's `state`
    return {
      error: error.message || "An unknown error occurred during login.",
    };
  }
};
