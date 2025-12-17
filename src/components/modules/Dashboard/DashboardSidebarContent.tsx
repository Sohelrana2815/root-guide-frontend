"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardSidebarContentProps {
  userInfo: UserInfo;
  navItems: NavSection[];
  dashboardHome: string;
}

const DashboardSidebarContent = ({
  userInfo,
  navItems,
  dashboardHome,
}: DashboardSidebarContentProps) => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex h-full w-64 flex-col border-r bg-card">
      {/* logo/brand */}
      <div className="flex h-16 items-center border-b px-6">
        <Link href={dashboardHome} className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">Root Guide</span>
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="space-y-6">
          {navItems.map((section, sectionIdx) => (
            <div key={sectionIdx}>
              {section.title && (
                <h4 className="mb-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {section.title}
                </h4>
              )}
              {/* <div className="space-y-1">
 {section.items}
</div> */}
            </div>
          ))}
        </nav>
      </ScrollArea>
    </div>
  );
};

export default DashboardSidebarContent;
