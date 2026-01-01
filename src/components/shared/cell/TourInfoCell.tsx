"use client";

interface TourInfoCellProps {
  title?: string;
  subtitle?: string;
  name?: string;
  email?: string;
  photo?: string | null;
}

export function TourInfoCell({
  title,
  subtitle,
  name,
  email,
}: TourInfoCellProps) {
  const resolvedTitle = title ?? name ?? "";
  const resolvedSubtitle = subtitle ?? email;

  return (
    <div className="flex items-center gap-3 mx-2">
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
