import jwt, { JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
// import {
//   getDefaultDashboardRoute,
//   getRouteOwner,
//   isAuthRoute,
//   UserRole,
// } from "./lib/auth-utils";

// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const pathname = request.nextUrl.pathname;

  let accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;
  if (accessToken) {
    try {
      const verifiedToken: JwtPayload | string = jwt.verify(
        accessToken,
        process.env.JWT_ACCESS_SECRET as string
      );

      if (typeof verifiedToken === "string") {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
        accessToken = null;
      } else {
        userRole = (verifiedToken as JwtPayload).role as UserRole;
      }
    } catch (err) {
      // Token invalid or expired — clear auth cookies and treat as unauthenticated
      try {
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");
      } catch (e) {
        // ignore
      }
      accessToken = null;
    }
  }

  const routerOwner = getRouteOwner(pathname);
  //path = /guide/my-created-tours => "GUIDE"
  //path = /my-profile => "COMMON"
  //path = /login => null

  const isAuth = isAuthRoute(pathname);

  // Rule 1 : User is logged in and trying to access auth route. Redirect to default dashboard
  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // Rule 2 : User is trying to access open public route
  if (routerOwner === null) {
    return NextResponse.next();
  }

  // Rule 1 & 2 for open public routes and auth routes

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Rule 3 : User is trying to access common protected route
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule 4 : User is trying to access role based protected route
  if (
    routerOwner === "ADMIN" ||
    routerOwner === "GUIDE" ||
    routerOwner === "TOURIST"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }
  }
  console.log(userRole);

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.well-known).*)",
  ],
};
