"use client";

import { Column } from "@/components/shared/managementTables/ManagementTable";
import { StatusBadgeCell } from "@/components/shared/cell/StatusBadgeCell";
import { IUser } from "@/types/user.interface";
import { UserInfoCell } from "@/components/shared/cell/UserInfoCell";

/**
 * Important columns only:
 * - User (avatar, name, email, role)
 * - Role
 * - Languages (badges, truncated)
 * - Expertise (badges, truncated)
 * - Phone
 * - Status (active/deleted)
 * - Created (date)
 */

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
      {children}
    </span>
  );
}

function formatDate(date?: string | Date) {
  if (!date) return "N/A";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString();
}
export const UserColumns: Column<IUser>[] = [
  {
    header: "User",
    accessor: (user) => (
      <UserInfoCell
        name={user.name}
        email={user.email}
        photo={user.photo ?? null}
        role={user.role}
      />
    ),
  },
  {
    header: "Role",
    accessor: (user) => (
      <span className="text-sm font-medium">{user.role}</span>
    ),
  },
  {
    header: "Languages",
    accessor: (user) => (
      <div className="flex flex-wrap gap-1">
        {Array.isArray(user.languages) && user.languages.length > 0 ? (
          user.languages.slice(0, 4).map((l) => <Badge key={l}>{l}</Badge>)
        ) : (
          <span className="text-sm text-muted-foreground">N/A</span>
        )}
      </div>
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
    header: "Phone",
    accessor: (user) => (
      <span className="text-sm">{user.phoneNumber ?? "N/A"}</span>
    ),
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
    header: "Created",
    accessor: (user) => (
      <span className="text-sm">{formatDate(user.createdAt)}</span>
    ),
    className: "w-[120px]",
  },
];
