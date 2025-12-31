"use client";
import ManagementTable from "@/components/shared/managementTables/ManagementTable";
import { IUser } from "@/types/user.interface";
import { UserColumns } from "./UserColumns";
import DeleteConfirmation from "@/components/shared/DeleteConfirmation";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import {
  blockUser,
  deleteUser,
  unblockUser,
} from "@/services/admin/usersManagement";
import { toast } from "sonner";
import UserViewDetailDialog from "./UserViewDetailDialog";

interface UserTableProps {
  users: IUser[];
}

const UserTable = ({ users }: UserTableProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [viewingUser, setViewingUser] = useState<IUser | null>(null);
  const [deletingUser, setDeletingUser] = useState<IUser | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const getUserId = (user: IUser) => user._id;

  // Refresh
  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };
  // // view user
  const handleView = (user: IUser) => {
    setViewingUser(user);
  };
  const handleDelete = (user: IUser) => {
    setDeletingUser(user);
  };

  // block user
  const handleBlock = async (user: IUser) => {
    const userId = getUserId(user);
    if (!userId) return;

    const result = await blockUser(userId);
    if (result.success) {
      toast.success(result.message || "User blocked successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to block user");
    }
  };

  const handleUnblock = async (user: IUser) => {
    const userId = getUserId(user);
    if (!userId) return;

    const result = await unblockUser(userId);
    if (result.success) {
      toast.success(result.message || "User unblocked successfully");
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to unblock user");
    }
  };

  // confirm to delete a user

  const confirmDelete = async () => {
    if (!deletingUser) return;

    const userId = getUserId(deletingUser);
    if (!userId) return;

    setIsDeleting(true);
    const result = await deleteUser(userId);
    setIsDeleting(false);

    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      setDeletingUser(null);
      handleRefresh();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  return (
    <>
      <ManagementTable
        data={users}
        columns={UserColumns}
        onDelete={handleDelete}
        onView={handleView}
        onBlock={handleBlock}
        onUnblock={handleUnblock}
        getRowKey={(user) => user._id!}
        emptyMessage="No users found"
      />
      {/* view user detail */}
      <UserViewDetailDialog
        open={!!viewingUser}
        onClose={() => setViewingUser(null)}
        user={viewingUser}
      />
      {/* Delete confirmation dialog */}

      <DeleteConfirmation
        open={!!deletingUser}
        onOpenChange={(open) => !open && setDeletingUser(null)}
        onConfirm={confirmDelete}
        title="Delete User"
        description={`Are you sure you want to delete ${deletingUser?.name}? This action cannot be undone.`}
        isDeleting={isDeleting}
      />
    </>
  );
};

export default UserTable;
