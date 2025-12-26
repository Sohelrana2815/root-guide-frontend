"use client";

import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/formatters";
import Image from "next/image";

interface UserInfoCellProps {
  name?: string;
  email?: string;
  photo?: string | null;
  role?: string;
  subtitle?: string; // optional small subtitle (e.g. city or small note)
}

export function UserInfoCell({
  name,
  email,
  photo,
  role,
  subtitle,
}: UserInfoCellProps) {
  const resolvedTitle = name ?? email ?? "Unknown";
  const resolvedSubtitle = subtitle ?? email;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {photo ? (
          <Image
            src={photo}
            alt={resolvedTitle}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold">
            {getInitials(resolvedTitle)}
          </div>
        )}
      </Avatar>

      <div className="min-w-0">
        <p className="font-medium truncate">{resolvedTitle}</p>
        {resolvedSubtitle ? (
          <p className="text-sm text-muted-foreground truncate">
            {resolvedSubtitle}
          </p>
        ) : null}
        {role ? (
          <p className="text-xs text-muted-foreground mt-0.5">
            <span className="uppercase font-medium">{role}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
