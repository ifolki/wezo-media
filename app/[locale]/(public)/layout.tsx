import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-20"> {/* Padding top to accommodate fixed navbar */}
        {children}
      </div>
      <Footer />
    </div>
  );
}
