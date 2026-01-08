/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminBookingTable from "@/components/modules/Admin/AdminBookingsManagement/AdminBookingTable";
import BookingFilters from "@/components/modules/Admin/AdminBookingsManagement/BookingFilters";
import TablePagination from "@/components/shared/managementTables/TablePagination";
import { getAdminBookings } from "@/services/admin/booking.admin.service";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminBookingsPage = async ({ searchParams }: IProps) => {
  const params = await searchParams;

  // কুয়েরি স্ট্রিং তৈরি করা
  const queryString = new URLSearchParams(params as any).toString();

  // সার্ভার থেকে ডেটা ফেচ
  const response = await getAdminBookings(queryString);

  const bookings = response?.data || [];
  const meta = response?.meta || { total: 0, page: 1, limit: 10 };
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
      <BookingFilters />

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

export default AdminBookingsPage;
