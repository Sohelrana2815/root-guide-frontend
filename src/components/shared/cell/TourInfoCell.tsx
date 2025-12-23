"use client";

import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/formatters";
import Image from "next/image";

interface TourInfoCellProps {
  title?: string;
  subtitle?: string;
  name?: string;
  email?: string;
  photo?: string | null;
}

export function TourInfoCell({ title, subtitle, name, email, photo }: TourInfoCellProps) {
  const resolvedTitle = title ?? name ?? "";
  const resolvedSubtitle = subtitle ?? email;

  return (
    <div className="flex items-center gap-3">
      <Avatar>
        {photo ? (
          <Image src={photo} alt={resolvedTitle} width={40} height={40} />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary font-semibold">
            {getInitials(resolvedTitle)}
          </div>
        )}
      </Avatar>
      <div>
        <p className="font-medium">{resolvedTitle}</p>
        {resolvedSubtitle ? (
          <p className="text-sm text-muted-foreground">{resolvedSubtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

export const UserInfoCell = TourInfoCell;
