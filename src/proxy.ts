import { type NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  getDefaultDashboardRoute as getDefaultDashboardRoute,
  getRouteOwner,
  isAuthRoute,
  UserRole,
} from "./lib/auth-utils";
import { deleteCookie } from "./services/auth/tokenHandlers";
// user role

export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const accessToken = request.cookies.get("accessToken")?.value || null;

  let userRole: UserRole | null = null;

  if (accessToken) {
    const verifiedToken: JwtPayload | string = jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_SECRET as string
    );

    if (typeof verifiedToken === "string") {
      await deleteCookie("accessToken");
      await deleteCookie("refreshToken");
      return NextResponse.redirect(new URL("/login", request.url));
    }

    userRole = verifiedToken.role;
  }

  const routerOwner = getRouteOwner(pathname);

  const isAuth = isAuthRoute(pathname);

  // Rule 1: user is logged in and trying to access auth routes

  if (accessToken && isAuth) {
    return NextResponse.redirect(
      new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
    );
  }

  // Rule 2: user is trying to access open public route

  if (routerOwner === null) {
    return NextResponse.next();
  }

  if (!accessToken) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(new URL(loginUrl));
  }

  // Rule 3: user is trying to access common protected routes
  if (routerOwner === "COMMON") {
    return NextResponse.next();
  }

  // Rule 4: user is trying to access role based protected routes
  if (
    routerOwner === "TOURIST" ||
    routerOwner === "GUIDE" ||
    routerOwner === "ADMIN"
  ) {
    if (userRole !== routerOwner) {
      return NextResponse.redirect(
        new URL(getDefaultDashboardRoute(userRole as UserRole), request.url)
      );
    }

    return NextResponse.next();
  }

  console.log(userRole);

  console.log("pathname: ", request.nextUrl.pathname);
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
