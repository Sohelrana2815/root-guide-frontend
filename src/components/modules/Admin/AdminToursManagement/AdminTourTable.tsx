"use client";
import ManagementTable from "@/components/shared/managementTables/ManagementTable";
import { ITour } from "@/types/tour.interface";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { AdminTourColumns } from "./AdminTourColumns";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { softDeleteTour } from "@/services/admin/adminToursManagement";

interface TourTableProps {
  tours: ITour[];
}

const AdminTourTable = ({ tours }: TourTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTour, setDeletingTour] = useState<ITour | null>(null);
  const [viewingTour, setViewingTour] = useState<ITour | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const getTourId = (tour: ITour) => tour._id;

  // Refresh
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  // view tour
  const handleView = (tour: ITour) => {
    setViewingTour(tour);
  };

  // delete tour
  const handleDelete = (tour: ITour) => {
    setDeletingTour(tour);
  };
  // confirm to delete a tour

  const confirmDelete = async () => {
    if (!deletingTour) return;

    const tourId = getTourId(deletingTour);
    if (!tourId) return;

    setIsDeleting(true);
    const result = await softDeleteTour(tourId);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "Tour deleted successfully");
      setDeletingTour(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete tour");
    }
  };

  return (
    <>
      <ManagementTable
        data={tours}
        columns={AdminTourColumns}
        onView={handleView}
        onDelete={handleDelete}
        getRowKey={(tour) => getTourId(tour) ?? tour.title}
        emptyMessage="No tours found"
      />
      {/* view tour details dialog */}
      {/* <TourViewDetailDialog
        open={!!viewingTour}
        onClose={() => setViewingTour(null)}
        tour={viewingTour}
      /> */}
      {/* delete confirmation dialog */}

      <DeleteConfirmation
        open={!!deletingTour}
        onOpenChange={(open) => !open && setDeletingTour(null)}
        onConfirm={confirmDelete}
        title="Delete Tour"
        description={`Are you sure you want to delete ${deletingTour?.title}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default AdminTourTable;
