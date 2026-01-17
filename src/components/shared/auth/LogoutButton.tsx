"use client";
import { logoutUser } from "@/services/auth/logoutUser";
import { LogOut } from "lucide-react";

const LogoutButton = () => {
  const handleLogout = async () => {
    await logoutUser();
  };
  return (
    <div
      className="
        flex items-center rounded-md hover:text-destructive
       cursor-pointer"
    >
      <button title="Logout" onClick={handleLogout}></button>
      <LogOut className="w-4 h-4" />
      <span className="ml-4">Logout </span>
    </div>
  );
};

export default LogoutButton;
