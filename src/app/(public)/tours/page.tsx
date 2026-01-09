/* eslint-disable @typescript-eslint/no-explicit-any */
// app/tours/page.tsx

import PublicTourFilters from "@/components/modules/Tours/PublicTourFilters";
import TourGrid from "@/components/modules/Tours/TourGrid";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import { getAllToursWithGuides } from "@/services/tourist/booking.service";
import { ITour } from "@/types/tour.interface";
import { Suspense } from "react";

const ToursPage = async ({ searchParams }: { searchParams: Promise<any> }) => {
  const params = await searchParams;
  const queryString = new URLSearchParams(params).toString();

  const response = await getAllToursWithGuides(queryString);
  const toursArray = Array.isArray(response?.data)
    ? response.data
    : Array.isArray(response?.data?.data)
    ? response.data.data
    : [];
  const meta = response?.meta ||
    response?.data?.meta || { total: 0, page: 1, limit: 12 };

  const totalPages = Math.ceil((meta.total ?? 0) / (meta.limit ?? 12));
  const tours = toursArray as ITour[];
  const languages = Array.from(
    new Set(tours.flatMap((tour) => tour.languages))
  );
  const categories = Array.from(new Set(tours.map((tour) => tour.category)));
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Explore Our Adventures
        </h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Discover hand-picked tours led by professional local guides.
        </p>
      </div>

      <PublicTourFilters categories={categories} languages={languages} />

      <Suspense
        key={queryString}
        fallback={
          <div className="text-center py-20">Loading amazing tours...</div>
        }
      >
        <TourGrid tours={toursArray} />
      </Suspense>

      {totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <TablePagination
            currentPage={Number(meta.page)}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default ToursPage;
