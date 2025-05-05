import { React, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/Components/Sidebar";
import { useNavigate } from "react-router-dom";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar";

function DashboardLayout() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggle = () => {
    setCollapsed(!collapsed);
  }

  return (
    <SidebarProvider>
        <SidebarInset className="fixed inset-0 z-10 bg-black/50"> 
      <div className="flex h-screen bg-gray-100">
        <AppSidebar collapsed={collapsed} />
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <SidebarTrigger onClick={handleToggle} />
          </div>
          <Outlet />
        </div>
      </div>
        </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;