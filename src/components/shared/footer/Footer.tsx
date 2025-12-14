import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const socialLinks = [
  { href: "#", icon: FaXTwitter, label: "X (Twitter)" },
  { href: "#", icon: FaFacebookF, label: "Facebook" },
  { href: "#", icon: FaLinkedin, label: "LinkedIn" },
  { href: "#", icon: FaGithub, label: "GitHub" },
];
const legalLinks = [
  { href: "#", label: "About" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Licensing" },
  { href: "#", label: "Contact" },
];
const Footer = () => {
  return (
    <>
      <footer className="bg-card border-t border-primary/50">
        <div className="w-full max-w-7xl mx-auto p-4 md:py-8">
          {/* Top Section: Social Icons */}
          <div className="flex items-center justify-center mb-6">
            <div className="flex space-x-6 sm:space-x-8">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-label={`Follow us on ${item.label}`}
                  className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                >
                  <item.icon className="w-6 h-6" />
                </Link>
              ))}
            </div>
          </div>

          {/* Middle Section: Legal Links */}
          <div className="flex sm:flex-row items-center justify-center">
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 justify-center">
              {legalLinks.map((item, index) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`hover:underline ${
                      index < legalLinks.length - 1 ? "me-4 md:me-6" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Separator (Optional) */}
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

          {/* Bottom Section: Copyright */}
          <span className="block text-sm text-gray-500 text-center">
            © 2025{" "}
            <Link
              href="/"
              className="hover:underline text-blue-600 font-semibold"
            >
              Root Guide
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
