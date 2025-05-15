import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/Components/AdminSidebar";
import { useNavigate } from "react-router-dom";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/Components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { Bell } from "lucide-react";
import { AdminProfilePanel, NotificationPanel } from "@/Components/AdminProfilePanel";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Refs for click outside
  const profilePanelRef = useRef(null);
  const notificationPanelRef = useRef(null);

  useEffect(() => {
    axios
      .get("https://skillitgh-lms.onrender.com/api/v1/dashboard/profile", {
        withCredentials: true,
      })
      .then((res) => setProfileImage(res.data.user.userImage))
      .catch((err) => console.error("Admin fetch error:", err));
  }, []);

  // Close panels when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profilePanelRef.current &&
        !profilePanelRef.current.contains(event.target) &&
        showProfilePanel
      ) {
        setShowProfilePanel(false);
      }
      if (
        notificationPanelRef.current &&
        !notificationPanelRef.current.contains(event.target) &&
        showNotifications
      ) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showProfilePanel, showNotifications]);

  const handleProfileClick = () => {
    setShowProfilePanel((prev) => !prev);
    setShowNotifications(false);
  };
  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfilePanel(false);
  };

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <div className="flex items-center p-4 border-b bg-white relative">
          <SidebarTrigger className="mr-4" />
          <Breadcrumb className="mr-96">
            <BreadcrumbList className="flex items-center space-x-2">
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => navigate("/admin-dashboard")}
                >
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => navigate("/admin-dashboard/users")}
                >
                  Manage Users
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  className="cursor-pointer"
                  onClick={() => navigate("/admin-dashboard/content")}
                >
                  Manage Content
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex items-center gap-4 ml-auto">
            {/* Notification Bell */}
            <div className="relative" ref={notificationPanelRef}>
              <Bell
                className={`w-8 h-8 cursor-pointer transition-colors ${showNotifications ? "text-green-600" : ""}`}
                onClick={handleNotificationsClick}
              />
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-xl rounded-xl z-50 border border-gray-100 animate-fade-in">
                  <NotificationPanel />
                </div>
              )}
            </div>
            {/* Profile Avatar */}
            <div className="relative" ref={profilePanelRef}>
              <img
                src={profileImage}
                alt="avatar"
                className={`w-10 h-10 rounded-full border-2 cursor-pointer object-cover transition-shadow ${showProfilePanel ? "ring-2 ring-green-500" : ""}`}
                onClick={handleProfileClick}
              />
              {showProfilePanel && (
                <div className="absolute right-0 mt-2 w-80 bg-white shadow-xl rounded-xl z-50 border border-gray-100 animate-fade-in">
                  <AdminProfilePanel />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="p-4 overflow-y-auto">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default AdminDashboardLayout;
