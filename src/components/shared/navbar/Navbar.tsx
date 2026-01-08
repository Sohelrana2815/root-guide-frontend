import { ModeToggle } from "@/components/ModeToggler";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import NavbarMenuClient from "./NavbarMenuClient";
import { Button } from "@/components/ui/button";
import LogoutButton from "../auth/LogoutButton";
import { getUserInfo } from "@/services/auth/getUserInfo"; // আপনার ফাংশনটি ইম্পোর্ট করুন

const Navbar = async () => {
  const accessToken = await getCookie("accessToken");
  const user = accessToken ? await getUserInfo() : null;
  const role = user?.role;

  // আপনার রিকোয়ারমেন্ট অনুযায়ী ডায়নামিক নেভিগেশন আইটেম
  const getNavItems = () => {
    // ১. যখন ইউজার লগআউট অবস্থায় (Guest)
    if (!accessToken || !user) {
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
        { href: "/dashboard/my-bookings", label: "My Bookings" },
        { href: "/my-profile", label: "Profile" },
      ];
    }

    // ৩. যখন ইউজার Guide হিসেবে লগইন করা
    if (role === "GUIDE") {
      return [
        { href: "/", label: "Home" },
        { href: "/tours", label: "Explore" },
        { href: "/guide/dashboard", label: "Dashboard" },
        { href: "/my-profile", label: "Profile" },
      ];
    }

    // ৪. যখন ইউজার Admin হিসেবে লগইন করা
    if (role === "ADMIN") {
      return [
        { href: "/", label: "Home" },
        { href: "/admin/dashboard", label: "Admin Dashboard" },
        { href: "/admin/dashboard/users-management", label: "Manage Users" },
        { href: "/admin/dashboard/tours-management", label: "Manage Listings" },
        { href: "/my-profile", label: "Profile" },
      ];
    }

    return [{ href: "/", label: "Home" }];
  };

  const navItems = getNavItems();

  return (
    <nav className="bg-background fixed w-full z-20 top-0 left-0 border-b border-primary/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* LEFT: Mobile Menu + Logo */}
          <div className="flex items-center gap-4">
            <NavbarMenuClient navItems={navItems} />
            <Link href="/" className="flex items-center gap-2">
              <span className="self-center text-xl font-bold text-foreground">
                Root <span className="text-primary">Guide</span>
              </span>
            </Link>
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
              <div className="flex items-center gap-3">
                {/* প্রোফাইল নেম দেখাতে চাইলে নিচের লাইনটি ব্যবহার করতে পারেন */}
                <span className="hidden md:inline text-xs text-muted-foreground">
                  Hi, {user.name}
                </span>
                <LogoutButton />
              </div>
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
