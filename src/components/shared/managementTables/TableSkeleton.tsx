import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showActions?: boolean;
}

export function TableSkeleton({
  columns,
  rows = 10,
  showActions = true,
}: TableSkeletonProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        {/* showing column skeleton */}
        <TableHeader>
          <TableRow>
            {[...Array(columns)].map((_, colIdx) => (
              <TableHead key={colIdx}>
                <Skeleton className="h-4 w-full" />
              </TableHead>
            ))}
            {showActions && (
              <TableHead className="w-17.5 ">
                <Skeleton className="h-4 w-full" />
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
        {/* showing row skeleton*/}
        <TableBody>
          {[...Array(rows)].map((_, rowIdx) => (
            <TableRow key={rowIdx}>
              {[...Array(columns)].map((_, colIndex) => (
                <TableCell key={colIndex}>
                  <div className="flex items-center gap-2">
                    {colIndex === 0 && (
                      <Skeleton className="h-10 w-10 rounded-full" />
                    )}
                    <Skeleton className="h-4 w-full" />
                  </div>
                </TableCell>
              ))}
              {showActions && (
                <TableCell>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableSkeleton;
