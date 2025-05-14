
import { Outlet } from "react-router-dom"
import { AdminSidebar } from "@/Components/AdminSidebar"
import { useNavigate } from "react-router-dom"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/Components/ui/sidebar"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/Components/ui/breadcrumb"
import { Bell } from "lucide-react"
import { AdminProfilePanel, NotificationPanel } from "@/Components/AdminProfilePanel"
import { useEffect, useState } from "react"
import axios from "axios"

function AdminDashboardLayout() {
  const navigate = useNavigate()
  const [showProfile, setShowProfile] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    
    axios
      .get("https://skillitgh-lms.onrender.com/api/v1/dashboard/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setShowProfile(res.data.user.userImage))
      .catch((err) => console.error("Admin fetch error:", err))
  }, [])

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
          <div className="relative">
            <Bell
              className="w-8 h-8 cursor-pointer"
              onClick={() => setShowNotifications(!showNotifications)}
            />
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                <NotificationPanel />
              </div>
            )}
          </div>
          <div className="relative">
            <img
              src={showProfile}
              alt="avatar"
              className="w-8 h-8 rounded-full border cursor-pointer"
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className="absolute right-0 mt-2 w-96  bg-white shadow-lg rounded-md">
                <AdminProfilePanel />
              </div>
            )}
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default AdminDashboardLayout
