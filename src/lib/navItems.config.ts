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
          roles: ["TOURIST"],
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
        icon: "Calendar", // ✅ String
        badge: "3",
        roles: ["GUIDE"],
      },
      {
        title: "Listings",
        href: "/guide/listings",
        icon: "Clock", // ✅ String
        roles: ["GUIDE"],
      },
      {
        title: "Profile",
        href: "/guide/profile",
        icon: "FileText", // ✅ String
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
        icon: "Calendar", // ✅ String
        roles: ["TOURIST"],
      },
      {
        title: "Profile",
        href: "/tourist/profile",
        icon: "ClipboardList", // ✅ String
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
        icon: "Shield", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Listings",
        href: "/admin/manage-listings",
        icon: "Stethoscope", // ✅ String
        roles: ["ADMIN"],
      },
      {
        title: "Users",
        href: "/admin/users",
        icon: "Users", // ✅ String
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
