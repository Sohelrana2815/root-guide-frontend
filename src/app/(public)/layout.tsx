import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/navbar/Navbar";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </nav>
  );
};

export default PublicLayout;
