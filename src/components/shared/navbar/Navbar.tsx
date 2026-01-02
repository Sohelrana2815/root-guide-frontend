import { ModeToggle } from "@/components/ModeToggler";
import { getCookie } from "@/services/auth/tokenHandlers";
import Link from "next/link";
import NavbarMenuClient from "./NavbarMenuClient";
import { Button } from "@/components/ui/button";
import LogoutButton from "../auth/LogoutButton";

const Navbar = async () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/tours", label: "Explore Tours" },
    { href: "/register", label: "Register" },
    { href: "/dashboard", label: "Dashboard" },
    { href: "#", label: "Become a Guide" },
  ];

  const accessToken = await getCookie("accessToken");

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-pr bg-background fixed w-full z-20 top-0 left-0 border-b border-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LEFT SIDE: Menu Button (Mobile/Tablet) + Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle - Visible on md and below, hidden on lg */}
              <NavbarMenuClient navItems={navItems} />

              {/* Brand Logo */}
              <Link href="/" className="flex items-center gap-2">
                {/* <img src="/logo.svg" className="h-8" alt="Logo" /> */}
                <span className="self-center text-xl font-bold text-foreground whitespace-nowrap">
                  Root <span className="text-primary">Guide</span>
                </span>
              </Link>
            </div>

            {/* CENTER: Desktop Navigation - Hidden on md/sm, Visible on lg */}
            <div className="hidden lg:flex space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE: Login Button */}
            <div className="flex items-center">
              {accessToken ? (
                <LogoutButton />
              ) : (
                <Link href="/login">
                  <Button
                    type="button"
                    className="text-white bg-primary/90 hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-all"
                  >
                    Login
                  </Button>
                </Link>
              )}
              {/* dark/light mode toggler */}
              <div className="px-4">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
