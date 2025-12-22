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
  const totalPages = Math.ceil(toursResult.meta.total / toursResult.meta.limit);

  return (
    <div className="space-y-6">
      <TourManagementHeader />
      <div className="flex space-x-2">
        <SearchFilter paramName="searchTerm" placeholder="Search tours..." />
        <SelectFilter
          paramName="category"
          options={toursResult.data.map((tour: ITour) => ({
            label: tour.id,
            value: tour.id,
          }))}
          placeholder="Filter by category"
        />
        <RefreshButton />
      </div>
      <Suspense fallback={<TableSkeleton columns={8} rows={10} />}>
        <TourTable tours={toursResult.data} />
        <TablePagination
          currentPage={toursResult.meta.page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
};

export default ToursManagementPage;
