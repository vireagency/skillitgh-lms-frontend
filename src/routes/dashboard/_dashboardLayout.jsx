
import { Outlet } from "react-router-dom"
import { AppSidebar } from "@/Components/Sidebar"
import { useNavigate } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/Components/ui/breadcrumb"

function DashboardLayout() {
  const navigate = useNavigate()

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex items-center p-4 border-b bg-white">
          <SidebarTrigger className="mr-4" />
          <Breadcrumb >
            <BreadcrumbList className="flex items-center space-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/dashboard")}>Courses</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/dashboard/workshops")}>Workshops</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="cursor-pointer" onClick={() => navigate("/dashboard/profile")}>Profile</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="p-4 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
