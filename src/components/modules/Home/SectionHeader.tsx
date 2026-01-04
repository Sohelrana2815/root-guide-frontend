import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkText?: string;
  linkHref?: string;
}

const SectionHeader = ({
  title,
  subtitle,
  linkText = "View All",
  linkHref = "/tours",
}: SectionHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row items-end justify-between mb-10 gap-4">
      <div className="max-w-xl">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            {subtitle}
          </p>
        )}
      </div>
      {linkHref && (
        <Link
          href={linkHref}
          className="text-blue-600 font-semibold hover:text-blue-700 transition-colors flex items-center gap-1 group"
        >
          {linkText}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
};

export default SectionHeader;
