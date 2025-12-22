"use client";
import ManagementTable from "@/components/shared/managementTables/ManagementTable";
import { ITour } from "@/types/tour.interface";
import { tourColumns } from "./TourColumns";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteTour } from "@/services/guide/toursManagement";
import { toast } from "sonner";

interface TourTableProps {
  tours: ITour[];
}
const TourTable = ({ tours }: TourTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [deletingTour, setDeletingTour] = useState<ITour | null>(null);
  const [isDeletingDialog, setIsDeletingDialog] = useState(false);

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  const handleDelete = (tour: ITour) => {
    setDeletingTour(tour);
  };

  const confirmDelete = async () => {
    if (!deletingTour) return;
    setIsDeletingDialog(true);
    const result = await deleteTour(deletingTour.id);
    setIsDeletingDialog(false);
    if (result.success) {
      toast.success(result.message || "Tour deleted successfully");
      setDeletingTour(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Something went wrong");
    }
  };

  return (
    <>
      <ManagementTable
        data={tours}
        columns={tourColumns}
        onDelete={handleDelete}
        getRowKey={(tour) => tour.id}
        emptyMessage="No Tour found"
      />
      {/* Delete confirmation dialog */}
      <DeleteConfirmation
        open={!!deletingTour}
        onOpenChange={(open) => !open && setDeletingTour(null)}
        onConfirm={confirmDelete}
        title="Delete tour"
        description={`Are you sure you want to delete ${deletingTour?.title} this action cannot be undone.`}
        isDeleting={isDeletingDialog}
      />
    </>
  );
};

export default TourTable;
