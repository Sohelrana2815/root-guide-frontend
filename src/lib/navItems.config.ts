("");

import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Dashboard",
          href: defaultDashboard,
          icon: "LayoutDashboard",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
        {
          title: "My Profile",
          href: `/my-profile`,
          icon: "User",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Change Password",
          href: "/change-password",
          icon: "Settings", // ✅ String
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
      ],
    },
  ];
};

export const guideNavItems: NavSection[] = [
  {
    title: "Booking Management",
    items: [
      {
        title: "Bookings",
        href: "/guide/bookings",
        icon: "Calendar", // bookings calendar
        badge: "3",
        roles: ["GUIDE"],
      },
      {
        title: "Listings",
        href: "/guide/listings",
        icon: "MapPin", // tour listings (locations)
        roles: ["GUIDE"],
      },
      {
        title: "Profile",
        href: "/guide/profile",
        icon: "User", // guide profile
        roles: ["GUIDE"],
      },
    ],
  },
];

export const touristNavItems: NavSection[] = [
  {
    title: "Tours and Bookings management",
    items: [
      {
        title: "My bookings",
        href: "/tourist/my-bookings",
        icon: "Ticket", // booking tickets
        roles: ["TOURIST"],
      },
      {
        title: "Profile",
        href: "/tourist/profile",
        icon: "User", // tourist profile
        roles: ["TOURIST"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Overview",
    items: [
      {
        title: "Admins",
        href: "/admin/overview",
        icon: "ShieldCheck", // admin overview
        roles: ["ADMIN"],
      },
      {
        title: "Listings",
        href: "/admin/manage-listings",
        icon: "List", // manage listings
        roles: ["ADMIN"],
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: "Users", // manage users
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    case "GUIDE":
      return [...commonNavItems, ...guideNavItems];
    case "TOURIST":
      return [...commonNavItems, ...touristNavItems];
    default:
      return [];
  }
};
