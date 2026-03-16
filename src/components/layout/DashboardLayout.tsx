import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { MobileHeader } from "./MobileHeader";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <MobileHeader />
      <Sidebar />
      <main className="flex-1 overflow-auto">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
