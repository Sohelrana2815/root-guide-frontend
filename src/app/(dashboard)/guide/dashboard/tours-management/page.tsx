import TourManagementHeader from "@/components/modules/Guide/TourManagement/TourManagementHeader";
import TourTable from "@/components/modules/Guide/TourManagement/TourTable";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import TableSkeleton from "@/components/shared/managementTables/TableSkeleton";
import { getTours } from "@/services/guide/toursManagement";
import { Suspense } from "react";

const ToursManagementPage = async () => {
  const result = await getTours();
  return (
    <div className="space-y-6">
      <TourManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <TourTable tours={result.data} />
      </Suspense>
    </div>
  );
};

export default ToursManagementPage;
