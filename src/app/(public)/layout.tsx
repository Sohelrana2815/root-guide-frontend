import Footer from "@/Components/Footer";
import Navbar from "@/Components/shared/Navbar";
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
