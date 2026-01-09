export const dynamic = "force-dynamic";
import { BookingBarChart } from "@/components/shared/BookingBarChart";
import { BookingPieChart } from "@/components/shared/BookingPieChart";
import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";
import { StatsCard } from "@/components/shared/StatCard";
import { getDashboardMetaData } from "@/services/meta/dashboard.service";
import { IAdminDashboardMeta } from "@/types/meta.interface";
import { Suspense } from "react";

// I have booking not Appointment Remove and adjust as per your need
async function AdminDashboardContent() {
  const result = await getDashboardMetaData();

  const data: IAdminDashboardMeta = result.data || {
    revenue: { adminProfit: 0, totalTransaction: 0 },
    bookings: { total: 0, split: [] },
    users: { tourists: 0, guides: 0, admins: 0 },
    tours: { active: 0, inactive: 0 },
  };

  const pieData = (data.bookings.split || [])
    .filter((s) => s._id) // Remove any null statuses
    .map((s) => ({
      status: s._id, // Mapping MongoDB _id to chart "status"
      count: s.count,
    }));

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        <StatsCard
          title="Total Transactions"
          value={`$${data.revenue.totalTransaction}`}
          iconName="CreditCard"
          description="Gross transaction volume"
          iconClassName="bg-indigo-100"
        />
        <StatsCard
          title="Admin Profit"
          value={`$${data.revenue.adminProfit}`}
          iconName="DollarSign"
          description="Admin commission"
          iconClassName="bg-emerald-100"
        />
        <StatsCard
          title="Total Bookings"
          value={data.bookings.total}
          iconName="CalendarDays"
          description="All bookings"
          iconClassName="bg-blue-100"
        />
        <StatsCard
          title="Tourists"
          value={data.users.tourists}
          iconName="Users"
          description="Registered tourists"
          iconClassName="bg-green-100"
        />
        <StatsCard
          title="Guides"
          value={data.users.guides}
          iconName="User"
          description="Registered guides"
          iconClassName="bg-purple-100"
        />
        <StatsCard
          title="Active Tours"
          value={data.tours.active}
          iconName="Map"
          description="Active tour listings"
          iconClassName="bg-yellow-100"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.barChartData && data.barChartData.length > 0 && (
          <BookingBarChart data={data.barChartData} />
        )}
        <BookingPieChart
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data={pieData as any} // অথবা as unknown as ChartDataInput[]
          title="Booking Status"
          description="Split by booking status"
        />
      </div>
    </div>
  );
}

const AdminDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your Tour</p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <AdminDashboardContent />
      </Suspense>
    </div>
  );
};

export default AdminDashboardPage;
