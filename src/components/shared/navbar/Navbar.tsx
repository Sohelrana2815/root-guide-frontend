"use client";
import { ModeToggle } from "@/components/ModeToggler";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore Tours" },
    { href: "#", label: "Become a Guide" },
  ];

  // Menu control toggle fn
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="bg-pr bg-background fixed w-full z-20 top-0 left-0 border-b border-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* LEFT SIDE: Menu Button (Mobile/Tablet) + Logo */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Toggle - Visible on md and below, hidden on lg */}
              <button
                type="button"
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md"
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6 text-muted-foreground" />
              </button>

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
              <Link href="/login">
                <button
                  type="button"
                  className="text-white bg-primary/90 hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none transition-all"
                >
                  Login
                </button>
              </Link>
              {/* dark/light mode toggler */}
              <div className="px-4">
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR OVERLAY & DRAWER */}
      {/* Overlay: background dimmer */}
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu} // Clicking outside closes menu
      ></div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header: Logo + Close Button */}
          <div className="flex items-center justify-between p-4 border-b border-primary/80">
            <span className="text-xl font-bold text-foreground">
              Root <span className="text-blue-600">Guide</span>
            </span>
            <button
              onClick={toggleMenu}
              className="p-1 text-gray-500 hover:text-red-500 focus:outline-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Sidebar Links */}
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)} // Close menu on click
                    className="block px-4 py-3 rounded-lg text-base font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar Footer (Optional: Extra actions like 'Help' or another Login btn) */}
          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">
              © 2025 Root Guide
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
