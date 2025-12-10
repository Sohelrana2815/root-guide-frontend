import Sidebar from "@/Components/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex ">
      <Sidebar />
      <div className="ml-80 mt-40">{children}</div>
    </div>
  );
};

export default DashboardLayout;
