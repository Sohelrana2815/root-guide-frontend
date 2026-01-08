

import AdminBookingTable from "@/components/modules/Admin/AdminBookings/AdminBookingTable";
import { getAdminBookings } from "@/services/admin/booking.admin.service";
import { Suspense } from "react";

async function BookingsContent() {
  const response = await getAdminBookings();
  const bookings = response?.data || [];
  return <AdminBookingTable bookings={bookings} />;
}

const AdminBookingsPage = async () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Booking Management</h1>
        <p className="text-muted-foreground mt-2">Manage all bookings</p>
      </div>

      <Suspense fallback={<div>Loading bookings...</div>}>
        <BookingsContent />
      </Suspense>
    </div>
  );
};

export default AdminBookingsPage;
