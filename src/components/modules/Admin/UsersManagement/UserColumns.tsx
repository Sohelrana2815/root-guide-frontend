"use client";

import { Column } from "@/components/shared/managementTables/ManagementTable";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { IUser } from "@/types/user.interface";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";
import { Star } from "lucide-react";
import { formatDateTime } from "@/lib/formatters";

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
      {children}
    </span>
  );
}

export const UserColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.photo ?? null}
      />
    ),
    sortKey: "name",
  },
  {
    header: "Role",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.role}</span>
    ),
  },

  {
    header: "Expertise",
    accessor: (user) => (
      <div className="flex flex-wrap gap-1">
        {Array.isArray(user.expertise) && user.expertise.length > 0 ? (
          user.expertise.slice(0, 3).map((e) => <Badge key={e}>{e}</Badge>)
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </div>
    ),
  },
  {
    header: "User Since",
    accessor: (user) => (
      <span className="text-sm font-medium">
        {formatDateTime(user.createdAt || new Date())}
      </span>
    ),
    sortKey: "createdAt",
  },
  {
    header: "Status",
    accessor: (user) => (
      <StatusBadgeCell
        isDeleted={!!user.isDeleted}
        activeText={user.userStatus ?? (user.isDeleted ? "Deleted" : "Active")}
      />
    ),
  },
  {
    header: "Average Rating",
    accessor: (user) => {
      const rating = user.averageRating || 0;

      return (
        <div className="flex items-center gap-1" title={rating.toFixed(1)}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            ({rating.toFixed(1)})
          </span>
        </div>
      );
    },
    sortKey: "averageRating",
  },
];
