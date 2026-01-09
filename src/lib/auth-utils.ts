export type UserRole = "TOURIST" | "GUIDE" | "ADMIN";

export type RouteConfig = {
  exact: string[];
  patterns: RegExp[];
};

export const authRoutes = [
  "/login",
  "/register",
];

export const commonProtectedRoutes: RouteConfig = {
  exact: ["/my-profile", "settings"],
  patterns: [],
};

export const touristProtectedRoutes: RouteConfig = {
  patterns: [/^\/dashboard/],
  exact: [],
};

export const guideProtectedRoutes: RouteConfig = {
  patterns: [/^\/guide/],
  exact: [],
};

const adminProtectedRoutes: RouteConfig = {
  patterns: [/^\/admin/],
  exact: [],
};

// check is auth route
export const isAuthRoute = (pathname: string): boolean => {
  return authRoutes.some((route) => route === pathname);
};

// match the route

export const isRouteMatches = (
  pathname: string,
  routes: RouteConfig
): boolean => {
  if (routes.exact.includes(pathname)) {
    return true;
  }

  return routes.patterns.some((pattern: RegExp) => pattern.test(pathname));
};

// get route owner

export const getRouteOwner = (
  pathname: string
): "TOURIST" | "GUIDE" | "ADMIN" | "COMMON" | null => {
  if (isRouteMatches(pathname, commonProtectedRoutes)) {
    return "COMMON";
  } else if (isRouteMatches(pathname, touristProtectedRoutes)) {
    return "TOURIST";
  } else if (isRouteMatches(pathname, guideProtectedRoutes)) {
    return "GUIDE";
  } else if (isRouteMatches(pathname, adminProtectedRoutes)) {
    return "ADMIN";
  } else {
    return null;
  }
};

// redirect to default dashboard route
export const getDefaultDashboardRoute = (role: UserRole) => {
  switch (role) {
    case "TOURIST":
      return "/dashboard";
    case "GUIDE":
      return "/guide/dashboard";
    case "ADMIN":
      return "/admin/dashboard";
    default:
      return "/";
  }
};

export const isValidRedirectForRole = (
  redirectPath: string,
  role: UserRole
): boolean => {
  const routeOwner = getRouteOwner(redirectPath);

  if (routeOwner === null || routeOwner === "COMMON") {
    return true;
  }

  if (routeOwner === role) {
    return true;
  }

  return false;
};
