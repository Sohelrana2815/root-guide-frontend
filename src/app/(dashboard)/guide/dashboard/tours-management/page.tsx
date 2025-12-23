import TourManagementHeader from "@/components/modules/Guide/TourManagement/TourManagementHeader";
import TourTable from "@/components/modules/Guide/TourManagement/TourTable";
import RefreshButton from "@/components/shared/managementTables/RefreshButton";
import SearchFilter from "@/components/shared/managementTables/SearchFilter";
import SelectFilter from "@/components/shared/managementTables/SelectFilter";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import TableSkeleton from "@/components/shared/managementTables/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getTours } from "@/services/guide/toursManagement";
import { ITour } from "@/types/tour.interface";
import { Suspense } from "react";

const ToursManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj); // {searchTerm: "sun shine", category: "Food" => "?searchTerm=sun shine&speciality=Food"}
  const toursResult = await getTours(queryString);
  const meta = toursResult?.meta ?? { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil((meta.total ?? 0) / (meta.limit ?? 10));
  const tours = (Array.isArray(toursResult?.data) ? toursResult.data : []) as ITour[];
  const categoryOptions = Array.from(
    new Set(tours.map((tour) => tour.category).filter(Boolean))
  ).map((category) => ({
    label: category,
    value: category,
  }));

  return (
    <div className="space-y-6">
      <TourManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search tours..." />
        <SelectFilter
          paramName="category"
          options={categoryOptions}
          placeholder="Filter by category"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <TourTable tours={tours} />
        <TablePagination
          currentPage={meta.page ?? 1}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default ToursManagementPage;
