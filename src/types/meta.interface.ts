// All interface meta data should be my backend related what ever the summery or stat api i makes interface need to be my backend related

export interface IBarChartData {
  month: Date | string;
  count: number;
}

export interface IPieChartData {
  status: string;
  count: number;
  // নিচের লাইনটি যোগ করুন (Index Signature)
  [key: string]: string | number | undefined;
}

export interface IAdminDashboardMeta {
  revenue: {
    adminProfit: number;
    totalTransaction: number;
  };
  bookings: {
    total: number;
    split: Array<{ _id: string; count: number }>;
  };
  users: {
    tourists: number;
    guides: number;
    admins: number;
  };
  tours: {
    active: number;
    inactive: number;
  };
  barChartData?: IBarChartData[];
}

export interface IGuideDashboardMeta {
  earnings: number;
  activeBookings: number;
  completedTours: number;
  pendingRequests: number;
  averageRating: string;
  totalReviews: number;
  barChartData?: IBarChartData[];
  pieChartData?: Array<{ _id: string; count: number }>;
}

export interface ITouristDashboardMeta {
  tripsTaken: number;
  totalSpent: number;
  upcomingTrips: number;
  pendingReviews: number;
  barChartData?: IBarChartData[];
  pieChartData?: Array<{ _id: string; count: number }>;
}

export type IDashboardMeta =
  | IAdminDashboardMeta
  | IGuideDashboardMeta
  | ITouristDashboardMeta;
