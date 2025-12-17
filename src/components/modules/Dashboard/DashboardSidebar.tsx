import { getUserInfo } from "@/services/auth/getUserInfo";
import DashboardSidebarContent from "./DashboardSidebarContent";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { UserInfo } from "@/types/user.interface";
import { NavSection } from "@/types/dashboard.interface";
import { getNavItemsByRole } from "@/lib/navItems.config";

const DashboardSidebar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo;

  const navItems: NavSection[] = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardSidebarContent
      navItems={navItems}
      dashboardHome={dashboardHome}
      userInfo={userInfo}
    />
  );
};

export default DashboardSidebar;
