"use client";
import { ITour } from "@/types/tour.interface";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { softDeleteTour } from "@/services/guide/toursManagement";
import { toast } from "sonner";
import ManagementTable from "@/components/shared/managementTables/ManagementTable";
import TourFormDialog from "../../Guide/TourManagement/TourFormDialog";
import { TourColumns } from "../../Guide/TourManagement/TourColumns";
import TourViewDetailDialog from "../../Guide/TourManagement/TourViewDetailDialog";

interface TourTableProps {
  tours: ITour[];
}
const TourTable = ({ tours }: TourTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTour, setDeletingTour] = useState<ITour | null>(null);
  const [viewingTour, setViewingTour] = useState<ITour | null>(null);
  const [editingTour, setEditingTour] = useState<ITour | null>(null);
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
  // Edit tour
  const handleEdit = (tour: ITour) => {
    setEditingTour(tour);
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
        columns={TourColumns}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getRowKey={(tour) => getTourId(tour) ?? tour.title}
        emptyMessage="No tours found"
      />
      {/* Edit tour form dialog */}
      <TourFormDialog
        open={!!editingTour}
        onClose={() => setEditingTour(null)}
        tour={editingTour!}
        onSuccess={() => {
          setEditingTour(null);
          handleRefresh();
        }}
      />

      {/* view tour details dialog */}
      <TourViewDetailDialog
        open={!!viewingTour}
        onClose={() => setViewingTour(null)}
        tour={viewingTour}
      />

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

export default TourTable;
