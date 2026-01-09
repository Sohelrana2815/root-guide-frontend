/* eslint-disable @typescript-eslint/no-explicit-any */
// @/app/(dashboard)/guide/bookings/page.tsx
export const dynamic = "force-dynamic";
import GuideBookingTable from "@/components/modules/Guide/GuideBookings/GuideBookingTable";
import GuideBookingFilters from "@/components/modules/Guide/GuideBookings/GuideBookingFilters";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import { getGuideBookings } from "@/services/tourist/booking.service";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const GuideBookingsManagementPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;

  const queryString = new URLSearchParams(params as any).toString();

  // সার্ভার অ্যাকশন কল
  const response = await getGuideBookings(queryString);

  const bookings = response?.data || [];
  const meta = response?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Bookings Received
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage and monitor your upcoming tourist assignments
          </p>
        </div>
      </div>

      {/* ফিল্টার কম্পোনেন্ট */}
      <GuideBookingFilters />

      <Suspense
        key={queryString}
        fallback={<div className="py-10 text-center">Loading Bookings...</div>}
      >
        <div className="bg-card rounded-lg border min-h-[400px]">
          <GuideBookingTable bookings={bookings} />

          {bookings.length === 0 && (
            <div className="py-20 text-center text-muted-foreground">
              No bookings found matching your filters.
            </div>
          )}
        </div>
      </Suspense>

      {/* প্যাগিনেশন */}
      {totalPages > 1 && (
        <div className="mt-6">
          <TablePagination
            currentPage={Number(meta.page)}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default GuideBookingsManagementPage;
