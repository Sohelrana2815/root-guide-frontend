export const dynamic = "force-dynamic";
import UserManagementHeader from "@/components/modules/Admin/UsersManagement/UserManagementHeader";
import UserTable from "@/components/modules/Admin/UsersManagement/UserTable";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import SearchFilter from "@/components/shared/managementTables/SearchFilter";
import SelectFilter from "@/components/shared/managementTables/SelectFilter";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import TableSkeleton from "@/components/shared/managementTables/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllUsers } from "@/services/admin/usersManagement";
import { IUser } from "@/types/user.interface";
import { Suspense } from "react";

const AdminUsersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const usersResult = await getAllUsers(queryString);

  const meta = usersResult?.meta ?? { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil((meta.total ?? 0) / (meta.limit ?? 10));
  return (
    <div className="space-y-6">
      <UserManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" />
        <SelectFilter
          options={[
            ...new Set<string>(
              usersResult.data.map((user: IUser) => user.role)
            ),
          ].map((role) => ({
            label: role,
            value: role,
          }))}
          placeholder="Filter by role..."
          paramName="role"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={4} rows={10} />}>
        <UserTable users={usersResult.data} />
        <TablePagination currentPage={meta.page} totalPages={totalPages} />
      </Suspense>
    </div>
  );
};

export default AdminUsersManagementPage;
