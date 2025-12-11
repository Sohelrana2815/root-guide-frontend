import Footer from "@/components/Footer";
import PublicFooter from "@/components/shared/PublicFooter";
import PublicNavbar from "@/components/shared/PublicNavbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <PublicNavbar />
      <main className="min-h-dvh mt-20 max-w-7xl mx-auto p-6">{children}</main>
      <PublicFooter />
    </div>
  );
};

export default CommonLayout;
