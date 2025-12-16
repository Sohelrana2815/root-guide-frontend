"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

const NavbarMenuClient = ({ navItems }: { navItems: NavItem[] }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <button
        type="button"
        onClick={toggleMenu}
        className="lg:hidden p-2 text-gray-600 hover:text-primary focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6 text-muted-foreground" />
      </button>

      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={toggleMenu}
      ></div>

      <div
        className={`fixed top-0 left-0 z-40 h-screen w-64 bg-sidebar shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-primary/80">
            <span className="text-xl font-bold text-foreground">
              Root <span className="text-blue-600">Guide</span>
            </span>
            <button
              onClick={toggleMenu}
              className="p-1 text-gray-500 hover:text-red-500 focus:outline-none"
              type="button"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-3">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 rounded-lg text-base font-medium transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 border-t border-gray-100">
            <p className="text-xs text-center text-gray-400">© 2025 Root Guide</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMenuClient;
