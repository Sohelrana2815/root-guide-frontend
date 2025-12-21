import TourManagementHeader from "@/components/modules/Guide/TourManagement/TourManagementHeader";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";

const ToursManagementPage = () => {
  return (
    <div className="space-y-6">
      <TourManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      {/* <h1>Guide Tours Management Page</h1> */}
    </div>
  );
};

export default ToursManagementPage;
