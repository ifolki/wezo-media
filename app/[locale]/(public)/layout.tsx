import Navbar from "@/components/public/Navbar";
import Footer from "@/components/public/Footer";
import MobileHeader from "@/components/public/MobileHeader";
import MobileBottomNav from "@/components/public/MobileBottomNav";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen relative pb-[calc(76px+env(safe-area-inset-bottom))] md:pb-0">
      {/* Mobile Top Header (hidden >= 768px) */}
      <MobileHeader />

      {/* Desktop Navigation Navbar (hidden < 768px) */}
      <Navbar />

      {/* Page Content with responsive top offset */}
      <div className="flex-grow pt-[60px] md:pt-20">
        {children}
      </div>

      {/* Footer Section */}
      <Footer />

      {/* Mobile Bottom Navigation Bar (hidden >= 768px) */}
      <MobileBottomNav />
    </div>
  );
}
