"use client";

import { ShieldCheck } from "lucide-react";

interface AdminCredentialsFillerProps {
  onFill: (credentials: { email: string; password: string }) => void;
}

export default function AdminCredentialsFiller({
  onFill,
}: AdminCredentialsFillerProps) {
  const handleAdminClick = () => {
    onFill({
      email: "admin@gmail.com",
      password: "12345678",
    });
  };

  return (
    <div className="flex justify-center mb-6">
      <button
        type="button"
        onClick={handleAdminClick}
        className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-full transition-all duration-300 hover:bg-blue-100 dark:hover:bg-blue-900/40 hover:shadow-sm cursor-pointer"
      >
        <div className="flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform" />
        </div>
        <span className="text-[11px] font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider">
          Quick Admin Access
        </span>
      </button>
    </div>
  );
}
