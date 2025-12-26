"use client";

import { Column } from "@/components/shared/managementTables/ManagementTable";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { TourInfoCell } from "@/components/shared/cell/TourInfoCell";
import { ITour } from "@/types/tour.interface";
import { Star } from "lucide-react";

export const TourColumns: Column<ITour>[] = [
  {
    header: "Tour",
    accessor: (tour) => (
      <TourInfoCell
        title={tour.title}
        subtitle={
          tour.city
            ? `${tour.city}${tour.category ? ` • ${tour.category}` : ""}`
            : tour.category
        }
        photo={tour.image}
      />
    ),
    sortKey: "title",
  },
  {
    header: "Category",
    accessor: (tour) => (
      <div className="flex flex-wrap gap-1">
        {tour.category && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {tour.category || "N/A"}
          </span>
        )}
      </div>
    ),
  },
  {
    header: "City",
    accessor: (tour) => (
      <div className="flex flex-col">
        <span className="text-sm">{tour.city}</span>
      </div>
    ),
  },
  // {
  //   header: "Itinerary",
  //   accessor: (tour) => (
  //     <div className="flex flex-col">
  //       <span className="text-sm">{tour.itinerary}</span>
  //     </div>
  //   ),
  // },
  {
    header: "Price",
    accessor: (tour) => (
      <div className="flex flex-col">
        <span className="text-sm">
          {typeof tour.price === "number" ? `$${tour.price}` : "N/A"}
        </span>
      </div>
    ),
    sortKey: "price",
  },
  {
    header: "Duration",
    accessor: (tour) => (
      <span className="text-sm font-medium">{tour.duration ?? 0} hours</span>
    ),
    sortKey: "duration",
  },
  {
    header: "Meeting Point",
    accessor: (tour) => (
      <span className="text-sm font-medium">{tour.meetingPoint} </span>
    ),
  },
  {
    header: "Max Group Size",
    accessor: (tour) => (
      <span className="text-sm font-medium">{tour.maxGroupSize} </span>
    ),
    sortKey: "maxGroupSize",
  },
  {
    header: "Rating",
    accessor: (tour) => (
      <div className="flex items-center gap-1">
        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm font-medium">
          {typeof tour.averageRating === "number"
            ? tour.averageRating.toFixed(1)
            : "N/A"}
        </span>
      </div>
    ),
    sortKey: "averageRating",
  },
  {
    header: "Status",
    accessor: (tour) => (
      <StatusBadgeCell
        isDeleted={tour.isDelete}
        activeText={tour.isActive === false ? "Inactive" : "Active"}
      />
    ),
  },
];
