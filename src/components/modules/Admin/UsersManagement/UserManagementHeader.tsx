"use client";
import ManagementPageHeader from "@/components/shared/managementTables/ManagementPageHeader";
import { ITour } from "@/types/tour.interface";
import { Plus } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import TourFormDialog from "../../Guide/TourManagement/TourFormDialog";

interface ITourManagementHeaderProps {
  tour?: ITour[];
}
const TourManagementHeader = ({}: ITourManagementHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClose = useCallback(() => setIsDialogOpen(false), []);

  const handleSuccess = useCallback(() => {
    startTransition(() => {
      router.refresh();
    });
  }, [router, startTransition]);
  return (
    <>
      <TourFormDialog
        open={isDialogOpen}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />

      <ManagementPageHeader
        title="Tours Management"
        description="Manage Tours information and details"
        action={{
          label: "Add Tour",
          icon: Plus,
          onClick: () => setIsDialogOpen(true),
        }}
      />
    </>
  );
};

export default TourManagementHeader;
