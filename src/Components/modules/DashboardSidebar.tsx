export { default } from "@/Components/modules/DashboardSidebar";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { NavSection } from "@/types/dashboard.interface";
import { UserInfo } from "@/types/user.interface";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { redirect } from "next/navigation";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo | null;

  if (!userInfo) {
    // Not authenticated — redirect to login
    const loginUrl = new URL("/login", process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000");
    // preserve attempted path via redirect param if desired
    // loginUrl.searchParams.set('redirect', '/dashboard');
    redirect(loginUrl.toString());
  }

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardSidebar;
