import UserManagementHeader from "@/components/modules/Admin/UsersManagement/UserManagementHeader";
import UserTable from "@/components/modules/Admin/UsersManagement/UserTable";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import TableSkeleton from "@/components/shared/managementTables/TableSkeleton";
import { getAllUsers } from "@/services/admin/usersManagement";
import { Suspense } from "react";

const AdminUsersManagementPage = async () => {
  const result = await getAllUsers();
  return (
    <div className="space-y-6">
      <UserManagementHeader />
      <div className="flex">
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
        <UserTable users={result.data} />
      </Suspense>
    </div>
  );
};

export default AdminUsersManagementPage;
