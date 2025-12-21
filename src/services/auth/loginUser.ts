/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { parse } from "cookie";
import {
  getDefaultDashboardRoute,
  isValidRedirectForRole,
  UserRole,
} from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { setCookie } from "./tokenHandlers";
import { serverFetch } from "@/lib/server-fetch";
import { zodValidator } from "@/lib/zodValidator";
import { loginValidationZodSchema } from "@/zod/auth.validation";
// zod validation for login


export const loginUser = async (
  _currentState: any,
  formData: any
): Promise<any> => {
  try {
    const redirectTo = formData.get("redirect") || null;
    console.log("redirect from server action: ", redirectTo);
    let accessTokenObject: null | any = null;
    let refreshTokenObject: null | any = null;
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    if (zodValidator(payload, loginValidationZodSchema).success === false) {
      return zodValidator(payload, loginValidationZodSchema);
    }

    const validatedPayload = zodValidator(
      payload,
      loginValidationZodSchema
    ).data;

    const res = await serverFetch.post(`/auth/login`, {
      body: JSON.stringify(validatedPayload),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    const setCookieHeaders = res.headers.getSetCookie();

    if (setCookieHeaders && setCookieHeaders.length > 0) {
      setCookieHeaders.forEach((cookie: string) => {
        const parsedCookie = parse(cookie);

        if (parsedCookie.accessToken) {
          accessTokenObject = parsedCookie;
        }
        if (parsedCookie.refreshToken) {
          refreshTokenObject = parsedCookie;
        }

        // console.log("parsed cookie = ", parsedCookie);
      });
    } else {
      throw new Error("No Set-Cookie header found");
    }

    if (!accessTokenObject) {
      throw new Error("You are not authorized (cookies empty)");
    }
    if (!refreshTokenObject) {
      throw new Error("You are not authorized (cookies empty)");
    }

    await setCookie("accessToken", accessTokenObject.accessToken, {
      secure: true,
      httpOnly: true,
      maxAge: 1 * 24 * 60 * 60,
      sameSite: accessTokenObject.SameSite || "none",
      path: accessTokenObject.path || "/",
    });
    await setCookie("refreshToken", refreshTokenObject.refreshToken, {
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: refreshTokenObject.SameSite || "none",
      path: refreshTokenObject.path || "/",
    });

    const verifiedToken: JwtPayload | string = jwt.verify(
      accessTokenObject.accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      throw new Error("Invalid token");
    }

    const userRole: UserRole = verifiedToken.role;

    if (!data.success) {
      throw new Error(data.message || "Login failed");
    }

    const redirectPath =
      redirectTo && isValidRedirectForRole(redirectTo, userRole)
        ? redirectTo
        : getDefaultDashboardRoute(userRole);
    redirect(`${redirectPath}?login=true`);

    // return data;
    // console.log({
    //   accessTokenObject,
    //   refreshTokenObject,
    // });

    // console.log("set cookie", setCookieHeaders);

    // console.log({ res, data });
  } catch (error: any) {
    if (error?.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    console.log(error);
    return {
      success: false,
      message: `${
        process.env.NODE_ENV === "development"
          ? error.message
          : "Login Failed. Please try again."
      }`,
    };
  }
};
