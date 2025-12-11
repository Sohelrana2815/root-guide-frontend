import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import DashboardNavbarContent from "./DashboardNavbarContent";
import { getNavItemsByRole } from "@/lib/navItems.config";
import { getUserInfo } from "@/services/auth/getUserInfo";
import { UserInfo } from "@/types/user.interface";
import { redirect } from "next/navigation";

const DashboardNavbar = async () => {
  const userInfo = (await getUserInfo()) as UserInfo | null;

  if (!userInfo) {
    redirect("/login");
  }

  const navItems = getNavItemsByRole(userInfo.role);
  const dashboardHome = getDefaultDashboardRoute(userInfo.role);

  return (
    <DashboardNavbarContent
      userInfo={userInfo}
      navItems={navItems}
      dashboardHome={dashboardHome}
    />
  );
};

export default DashboardNavbar;
