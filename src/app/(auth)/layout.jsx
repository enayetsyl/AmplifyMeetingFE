'use client'
import Footer from "@/components/shared/Footer";
import { usePathname } from "next/navigation";



export default function AuthLayout({ children }) {
  const pathname = usePathname();
  const excludeFooterRoutes = ["/setNewPassword"];
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
        <div>{children}</div>
        {!excludeFooterRoutes.includes(pathname) && <Footer />}
        
        </div>
      </body>
    </html>
  );
}
