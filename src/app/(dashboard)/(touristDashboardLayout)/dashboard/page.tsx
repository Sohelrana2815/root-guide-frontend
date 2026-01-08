import { BookingBarChart } from "@/components/shared/BookingBarChart";
import { BookingPieChart } from "@/components/shared/BookingPieChart";
import { DashboardSkeleton } from "@/components/shared/DashboardSkeleton";
import { StatsCard } from "@/components/shared/StatCard";
import getDashboardMetaData from "@/services/meta/dashboard.service";
import { ITouristDashboardMeta } from "@/types/meta.interface";
import { Suspense } from "react";

// Dynamic SSR with fetch-level caching (30s in service for real-time stats)
export const dynamic = "force-dynamic";

async function TouristDashboardContent() {
  // CRITICAL: Server-side role verification before rendering
  const result = await getDashboardMetaData();

  const data: ITouristDashboardMeta = result.data || {
    tripsTaken: 0,
    totalSpent: 0,
    upcomingTrips: 0,
    pendingReviews: 0,
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <StatsCard
          title="Trips Taken"
          value={data.tripsTaken}
          iconName="Map"
          description="Completed trips"
          iconClassName="bg-blue-100"
        />
        <StatsCard
          title="Total Spent"
          value={`$${data.totalSpent}`}
          iconName="CreditCard"
          description="Total amount spent"
          iconClassName="bg-emerald-100"
        />
        <StatsCard
          title="Upcoming Trips"
          value={data.upcomingTrips}
          iconName="CalendarDays"
          description="Confirmed upcoming trips"
          iconClassName="bg-yellow-100"
        />
        <StatsCard
          title="Pending Reviews"
          value={data.pendingReviews}
          iconName="MessageSquare"
          description="Reviews to write"
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

const TouristDashboardPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your health records and appointment history
        </p>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <TouristDashboardContent />
      </Suspense>
    </div>
  );
};

export default TouristDashboardPage;
