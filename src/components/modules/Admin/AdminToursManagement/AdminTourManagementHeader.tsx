import ManagementPageHeader from "@/components/shared/managementTables/ManagementPageHeader";
import { ITour } from "@/types/tour.interface";

interface ITourManagementHeaderProps {
  tour?: ITour[];
}
const AdminTourManagementHeader = ({}: ITourManagementHeaderProps) => {
  return (
    <>
      <ManagementPageHeader
        title="Admin Tours Management"
        description="Manage Tours information and details"
      />
    </>
  );
};

export default AdminTourManagementHeader;
