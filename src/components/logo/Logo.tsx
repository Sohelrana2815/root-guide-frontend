// components/Logo.jsx
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* image from public/logo.png */}
      <Image
        src="/logo/logo13.png"
        alt="Root Guide"
        width={50}
        height={100}
        priority
        className="block"
      />
      {/* site name: hidden on very small screens */}
      <span className="hidden sm:inline self-center text-xl font-bold text-foreground">
        Root <span className="text-primary">Guide</span>
      </span>
    </Link>
  );
};

export default Logo;
