
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "@/Components/AdminSidebar"
import { useNavigate } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/Components/ui/breadcrumb"
import { Bell } from "lucide-react"

function AdminDashboardLayout() {
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex items-center p-4 border-b bg-white">
          <SidebarTrigger className="mr-4" />
          <Breadcrumb className="mr-96" >
            <BreadcrumbList className="flex items-center space-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/admin-dashboard")}>Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/admin-dashboard/users")}>Manage Users</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/admin-dashboard/content")}>Manage Content</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <Bell className="" 
          onClick={() => {}}
          />
        </div>
        <div className="p-4 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout
