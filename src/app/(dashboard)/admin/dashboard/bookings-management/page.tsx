/* eslint-disable @typescript-eslint/no-explicit-any */

export const dynamic = "force-dynamic";
import AdminBookingTable from "@/components/modules/Admin/AdminBookingsManagement/AdminBookingTable";
import BookingFilters from "@/components/modules/Admin/AdminBookingsManagement/BookingFilters";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import { getAdminBookings } from "@/services/admin/booking.admin.service";
import { getAllGuidesForFilter } from "@/services/admin/usersManagement";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminBookingsManagementPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;

  // কুয়েরি স্ট্রিং তৈরি করা
  const queryString = new URLSearchParams(params as any).toString();

  const [bookingResponse, guides] = await Promise.all([
    getAdminBookings(queryString),
    getAllGuidesForFilter(),
  ]);

  const bookings = bookingResponse?.data || [];
  const meta = bookingResponse?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Booking Management
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage and monitor all tourist bookings
        </p>
      </div>

      {/* ফিল্টার কম্পোনেন্ট */}
      <BookingFilters guides={guides} />

      <Suspense fallback={<div>Loading bookings...</div>}>
        <div className="bg-card rounded-lg border">
          <AdminBookingTable bookings={bookings} />
        </div>
      </Suspense>

      {/* প্যাগিনেশন */}
      {totalPages > 0 && (
        <div className="mt-6">
          <TablePagination currentPage={meta.page} totalPages={totalPages} />
        </div>
      )}
    </div>
  );
};

export default AdminBookingsManagementPage;
