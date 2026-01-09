export const dynamic = "force-dynamic";
import AdminTourManagementHeader from "@/components/modules/Admin/AdminToursManagement/AdminTourManagementHeader";
import AdminTourTable from "@/components/modules/Admin/AdminToursManagement/AdminTourTable";
import ToursFilter from "@/components/modules/Guide/TourManagement/ToursFilter";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import TableSkeleton from "@/components/shared/managementTables/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getAllTours } from "@/services/admin/adminToursManagement";
import { ITour } from "@/types/tour.interface";
import { Suspense } from "react";

const AdminToursManagePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetch data
  const toursResult = await getAllTours(queryString);
  const tours = (
    Array.isArray(toursResult?.data) ? toursResult.data : []
  ) as ITour[];

  // 1. Extract Unique Categories (from plain strings)
  const uniqueCategories = Array.from(
    new Set(tours.map((tour) => tour.category))
  ).filter(Boolean) as string[];

  // 2. Extract Unique Languages (from arrays)
  const uniqueLanguages = Array.from(
    new Set(tours.flatMap((tour) => tour.languages))
  ).filter(Boolean) as string[];

  const meta = toursResult?.meta ?? { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil((meta.total ?? 0) / (meta.limit ?? 10));
  return (
    <div className="space-y-6">
      <AdminTourManagementHeader />

      {/* Our Unified Filter */}
      <ToursFilter languages={uniqueLanguages} categories={uniqueCategories} />

      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <AdminTourTable tours={tours} />
        <TablePagination currentPage={meta.page ?? 1} totalPages={totalPages} />
      </Suspense>
    </div>
  );
};

export default AdminToursManagePage;
