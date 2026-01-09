export const dynamic = "force-dynamic";
import { BookingBarChart } from "@/components/shared/BookingBarChart";
import { BookingPieChart } from "@/components/shared/BookingPieChart";
import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";
import { StatsCard } from "@/components/shared/StatCard";
import getDashboardMetaData from "@/services/meta/dashboard.service";
import { IGuideDashboardMeta } from "@/types/meta.interface";
import { Suspense } from "react";
async function GuideDashboardContent() {
  const result = await getDashboardMetaData();
  const data: IGuideDashboardMeta = result.data || {
    earnings: 0,
    activeBookings: 0,
    completedTours: 0,
    pendingRequests: 0,
    averageRating: "0.0",
    totalReviews: 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-3">
        <StatsCard
          title="Earnings"
          value={`$${data.earnings}`}
          iconName="DollarSign"
          description="Total earnings"
          iconClassName="bg-emerald-100"
        />
        <StatsCard
          title="Active Bookings"
          value={data.activeBookings}
          iconName="CalendarDays"
          description="Running / upcoming"
          iconClassName="bg-blue-100"
        />
        <StatsCard
          title="Completed Tours"
          value={data.completedTours}
          iconName="CheckCircle"
          description="Finished tours"
          iconClassName="bg-green-100"
        />
        <StatsCard
          title="Pending Requests"
          value={data.pendingRequests}
          iconName="Hourglass"
          description="Needs confirmation"
          iconClassName="bg-yellow-100"
        />
        <StatsCard
          title="Avg. Rating"
          value={data.averageRating}
          iconName="Star"
          description="Based on reviews"
          iconClassName="bg-yellow-100"
        />
        <StatsCard
          title="Total Reviews"
          value={data.totalReviews}
          iconName="MessageSquare"
          description="Customer reviews"
          iconClassName="bg-violet-100"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {data.barChartData && data.barChartData.length > 0 && (
          <BookingBarChart data={data.barChartData} />
        )}
        {data.pieChartData && data.pieChartData.length > 0 && (
          <BookingPieChart
            data={data.pieChartData.map((p) => ({
              status: p._id,
              count: p.count,
            }))}
            title="Booking Status Distribution"
            description="Overview of your booking statuses"
          />
        )}
      </div>
    </div>
  );
}

const GuideDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Guide Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your guiding experience and earnings.
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <GuideDashboardContent />
      </Suspense>
    </div>
  );
};

export default GuideDashboardPage;
