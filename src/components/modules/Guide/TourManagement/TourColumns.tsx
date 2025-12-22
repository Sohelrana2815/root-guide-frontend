import { Column } from "@/components/shared/managementTables/ManagementTable";
import { ITour } from "@/types/tour.interface";

export const tourColumns: Column<ITour>[] = [
  {
    header: "Title",
    accessor: (tour) => tour.title,
    className: "text-left",
  },
  {
    header: "Description",
    accessor: (tour) => tour.description,
    className: "text-left",
  },
];
