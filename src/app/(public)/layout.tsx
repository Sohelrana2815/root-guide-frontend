import Footer from "@/components/Footer";
import Navbar from "@/components/shared/PublicNavbar";
import React from "react";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="min-h-dvh mt-20 max-w-7xl mx-auto p-6">{children}</main>
      <Footer />
    </div>
  );
};

export default CommonLayout;
