import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";
import { ManagementPageLoading } from "@/components/shared/ManagementPageLoader";
import TravelLoader from "@/components/shared/TravelLoader";

const page = () => {
  return (
    <div>
      <DashboardSkeleton />
      <ManagementPageLoading
        columns={10}
        hasActionButton
        filterCount={4}
        filterWidths={["w-48", "w-32", "w-60", "w-20"]}
      />
      <TravelLoader />
    </div>
  );
};

export default page;
