"use client"

import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/Components/Sidebar"
import { useNavigate } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"

function DashboardLayout() {
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="bg-gray-100">
        <div className="flex items-center p-4 border-b bg-white">
          <SidebarTrigger className="mr-4" />
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </div>
        <div className="p-4 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
