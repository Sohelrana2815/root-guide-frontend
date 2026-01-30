import { NavSection } from "@/types/dashboard.interface";
import { getDefaultDashboardRoute, UserRole } from "./auth-utils";

export const getCommonNavItems = (role: UserRole): NavSection[] => {
  const defaultDashboard = getDefaultDashboardRoute(role);

  return [
    {
      items: [
        {
          title: "Home",
          href: "/",
          icon: "Home",
          roles: ["TOURIST", "GUIDE", "ADMIN"],
        },
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
  ];
};

export const touristNavItems: NavSection[] = [
  {
    title: "See Tours and Bookings",
    items: [
      {
        title: "Book Tour",
        href: "/tours",
        icon: "Bus",
        roles: ["TOURIST"],
      },
      {
        title: "My Wishlist",
        href: "/dashboard/my-bookings",
        icon: "Ticket",
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
        icon: "Bus",
        roles: ["GUIDE"],
      },
    ],
  },
  {
    title: "Bookings Management",
    items: [
      {
        title: "Bookings Received",
        href: "/guide/dashboard/bookings-management",
        icon: "Ticket",
        roles: ["GUIDE"],
      },
    ],
  },
];

export const adminNavItems: NavSection[] = [
  {
    title: "Admin",
    items: [
      {
        title: "Create Admin",
        href: "/admin/dashboard/create-admin",
        icon: "UserPlus",
        roles: ["ADMIN"],
      },
    ],
  },
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
        icon: "Bus",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Bookings Management",
    items: [
      {
        title: "Bookings",
        href: "/admin/dashboard/bookings-management",
        icon: "Ticket",
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
