/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z, { success } from "zod";
import { setCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";

const loginValidationZodSchema = z.object({
  email: z.email({
    message: "Email is required",
  }),
  password: z
    .string("Password is required")
    .min(6, {
      error: "Password is required and must be at least 6 characters long",
    })
    .max(100, {
      error: "Password must be at most 100 characters long",
    }),
});

export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const loginData = {
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

    // Use serverFetch helper which points to BACKEND_API_URL
    const res = await serverFetch.post("/auth/login", {
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json",
      },
      // include credentials so backend Set-Cookie headers are honored
      credentials: "include",
    });

    const data = await res.json();

    // Try to read Set-Cookie headers (some runtimes expose getSetCookie)
    // Fallback to reading raw header if needed
    const setCookieHeaders = (res.headers as any).getSetCookie
      ? (res.headers as any).getSetCookie()
      : res.headers.get("set-cookie")
      ? [res.headers.get("set-cookie") as string]
      : null;

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
      // If backend does not set cookies (or runtime strips them), try to read tokens from JSON body
      if (data?.accessToken && data?.refreshToken) {
        accessTokenObject = { accessToken: data.accessToken };
        refreshTokenObject = { refreshToken: data.refreshToken };
      } else {
        throw new Error("No Set-Cookie header found and tokens missing in response");
      }
    }

    if (!accessTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    if (!refreshTokenObject) {
      throw new Error("Tokens not found in cookies");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: parseInt(accessTokenObject["Max-Age"]) || 1000 * 60 * 60,
      path: accessTokenObject.Path || "/",
      sameSite: accessTokenObject["SameSite"] || "none",
    });

    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge:
        parseInt(refreshTokenObject["Max-Age"]) || 1000 * 60 * 60 * 24 * 90,
      path: refreshTokenObject.Path || "/",
      sameSite: refreshTokenObject["SameSite"] || "none",
    });
    // Use the access secret env var used by middleware/backend. Keep a fallback
    const jwtSecret =
      (process.env.JWT_ACCESS_SECRET as string) ||
      (process.env.JWT_SECRET as string) ||
      "";

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      jwtSecret
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    if (redirectTo) {
      const requestedPath = redirectTo.toString();
      if (isValidRedirectForRole(requestedPath, userRole)) {
        redirect(`${requestedPath}?loggedIn=true`);
      } else {
        redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
      }
    } else {
      redirect(`${getDefaultDashboardRoute(userRole)}?loggedIn=true`);
    }
  } catch (error: any) {
    // Re-throw NEXT_REDIRECT errors so Next.js can handle them
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login failed. You might have entered the wrong email or password."
      }`,
    };
  }
};
