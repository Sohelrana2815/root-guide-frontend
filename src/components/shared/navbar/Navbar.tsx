import { ModeToggle } from "@/components/ModeToggler";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import NavbarMenuClient from "./NavbarMenuClient";
import { Button } from "@/components/ui/button";
import { getUserInfo } from "@/services/auth/getUserInfo"; // আপনার ফাংশনটি ইম্পোর্ট করুন

import UserDropdown from "@/components/modules/Dashboard/UserDropdown";
import Logo from "@/components/logo/Logo";

const Navbar = async () => {
  const accessToken = await getCookie("accessToken");
  const userInfo = accessToken ? await getUserInfo() : null;
  const role = userInfo?.role;

  // আপনার রিকোয়ারমেন্ট অনুযায়ী ডায়নামিক নেভিগেশন আইটেম
  const getNavItems = () => {
    // ১. যখন ইউজার লগআউট অবস্থায় (Guest)
    if (!accessToken || !userInfo) {
      return [
        { href: "/", label: "Home" },
        { href: "/tours", label: "Explore Tours" },
        { href: "#", label: "Become a Guide" },
      ];
    }

    // ২. যখন ইউজার Tourist হিসেবে লগইন করা
    if (role === "TOURIST") {
      return [
        { href: "/", label: "Home" },
        { href: "/tours", label: "Explore Tours" },
        { href: "/dashboard/", label: "Tourist Dashboard" },
        { href: "/dashboard/my-bookings", label: "My Bookings" },
        { href: "/my-profile", label: "My Profile" },
      ];
    }

    // ৩. যখন ইউজার Guide হিসেবে লগইন করা
    if (role === "GUIDE") {
      return [
        { href: "/", label: "Home" },
        { href: "/tours", label: "Explore" },
        { href: "/guide/dashboard", label: "Guide Dashboard" },
        {
          href: "/guide/dashboard/tours-management",
          label: "Manage Your Tours",
        },
        {
          href: "/guide/dashboard/bookings-management",
          label: "Bookings Received",
        },
        { href: "/my-profile", label: "My Profile" },
      ];
    }

    // ৪. যখন ইউজার Admin হিসেবে লগইন করা
    if (role === "ADMIN") {
      return [
        { href: "/", label: "Home" },
        { href: "/tours", label: "See All Tours" },
        { href: "/admin/dashboard", label: "Admin Dashboard" },
        {
          href: "/admin/dashboard/users-management",
          label: "Manage All Users",
        },
        {
          href: "/admin/dashboard/tours-management",
          label: "Manage All Tours",
        },
        {
          href: "/admin/dashboard/bookings-management",
          label: "Manage All Bookings",
        },
      ];
    }

    return [{ href: "/", label: "Home" }];
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-background fixed w-full z-[999] top-0 left-0 border-b border-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Mobile Menu + Logo */}
          <div className="flex items-center gap-4">
            {/* <NavbarMenuClient navItems={navItems} /> */}
            {/* <Link href="/" className="flex items-center gap-2">
              <span className="self-center text-xl font-bold text-foreground">
                Root <span className="text-primary">Guide</span>
              </span>
            </Link> */}
            <div className="flex items-center gap-4 hover:cursor-pointer">
              <NavbarMenuClient navItems={navItems} />
              <Logo />
            </div>
          </div>

          {/* CENTER: Desktop Links (Filtered by Role) */}
          <div className="hidden lg:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* RIGHT: Buttons & Dark Mode */}
          <div className="flex items-center gap-4">
            {accessToken ? (
              <>
                <UserDropdown userInfo={userInfo} />
              </>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">Register</Button>
                </Link>
              </div>
            )}
            <ModeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
