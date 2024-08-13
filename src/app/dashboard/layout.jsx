'use client'
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import Footer from "@/components/shared/Footer";
import LogoutModal from "@/components/singleComponent/LogoutModal";
import { useState } from "react";



export default function DashboardLayout({ children }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);  
  
  const handleLogoutModalOpen = (e) => {
    console.log('logout modal open', isLogoutModalOpen)
    setIsLogoutModalOpen(true);
  };

  const handleCloseLogoutModal = () => {
    setIsLogoutModalOpen(false);
  };

  return (
      <div className="min-h-screen flex flex-col h-full">
          {/* upper div */}
          <div className="flex-grow h-full flex relative">
            <div className="sticky top-0 w-[260px] h-screen z-10">
              <DashboardSidebar 
              handleLogoutModalOpen={handleLogoutModalOpen}
            
              />
            </div>
            <div className="flex-grow h-full ">
              {children}
            </div>
          </div>
          {isLogoutModalOpen && <LogoutModal onClose={handleCloseLogoutModal} />}
          {/* footer */}
          <Footer />
        </div>
  );
}
