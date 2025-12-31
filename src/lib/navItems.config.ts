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
          href: "/my-profile",
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
          icon: "Settings",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
      ],
    },
  ];
};

export const touristNavItems: NavSection[] = [
  {
    title: "See Tours and Bookings",
    items: [
      {
        title: "Explore Tours",
        href: "/explore",
        icon: "Tours",
        roles: ["TOURIST"],
      },

      {
        title: "Book Tours",
        href: "/dashboard/bookings",
        icon: "Booking",
        roles: ["TOURIST"],
      },
      {
        title: "My Wishlist",
        href: "/dashboard/my-tours",
        icon: "Tours",
        roles: ["TOURIST"],
      },
    ],
  },
];

export const guideNavItems: NavSection[] = [
  {
    title: "Tours Management",
    items: [
      {
        title: "Tours",
        href: "/guide/dashboard/tours-management",
        icon: "Tours",
        roles: ["GUIDE"],
      },
      {
        title: "Bookings",
        href: "/guide/dashboard/bookings",
        icon: "Booking",
        roles: ["GUIDE"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Users Management",
    items: [
      {
        title: "Users",
        href: "/admin/dashboard/users-management",
        icon: "Users",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Tours Management",
    items: [
      {
        title: "Tours",
        href: "/admin/dashboard/tours-management",
        icon: "Tours",
        roles: ["ADMIN"],
      },
      {
        title: "Bookings",
        href: "/admin/dashboard/bookings",
        icon: "Booking",
        roles: ["ADMIN"],
      },
    ],
  },
];

export const getNavItemsByRole = (role: UserRole): NavSection[] => {
  const commonNavItems = getCommonNavItems(role);

  switch (role) {
    case "TOURIST":
      return [...commonNavItems, ...touristNavItems];
    case "GUIDE":
      return [...commonNavItems, ...guideNavItems];
    case "ADMIN":
      return [...commonNavItems, ...adminNavItems];
    default:
      return [];
  }
};
