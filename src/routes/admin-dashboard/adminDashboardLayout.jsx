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
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";

function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState("");
  const [showProfilePanel, setShowProfilePanel] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [adminProfile, setAdminProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [adminForm, setAdminForm] = useState({});
  const [imageFile, setImageFile] = useState(null);

  // Refs for click outside
  const profilePanelRef = useRef(null);
  const notificationPanelRef = useRef(null);

  // Fetch admin profile
  const fetchProfile = useCallback(async () => {
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get("https://skillitgh-lms.onrender.com/api/v1/dashboard/profile", {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setProfileImage(res.data.user.userImage);
      setAdminProfile(res.data.user);
      setAdminForm({
        firstName: res.data.user.firstName || "",
        lastName: res.data.user.lastName || "",
        email: res.data.user.email || "",
        phoneNumber: res.data.user.phoneNumber || "",
        location: res.data.user.location || "",
        gender: res.data.user.gender || "",
      });
    } catch (err) {
      console.error("Admin fetch error:", err);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Close panels when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profilePanelRef.current &&
        !profilePanelRef.current.contains(event.target) &&
        showProfilePanel
      ) {
        setShowProfilePanel(false);
        setIsEditing(false);
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
    setIsEditing(false);
  };
  const handleNotificationsClick = () => {
    setShowNotifications((prev) => !prev);
    setShowProfilePanel(false);
    setIsEditing(false);
  };

  // Handle form changes
  const handleAdminChange = (e) => {
    const { name, value } = e.target;
    setAdminForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  // Handle save
  const handleAdminSave = async () => {
    try {
      const formDataToSend = new FormData();
      Object.entries(adminForm).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });
      if (imageFile) {
        formDataToSend.append("userImage", imageFile);
      }
      const response = await axios.put(
        "https://skillitgh-lms.onrender.com/api/v1/dashboard/profile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setAdminProfile(response.data.user);
      setProfileImage(response.data.user.userImage);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating admin profile:", error);
    }
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
                className={`w-8 h-8 cursor-pointer transition-colors duration-150 ${showNotifications ? "text-green-600 scale-110" : "hover:text-green-500"}`}
                onClick={handleNotificationsClick}
                aria-label="Show notifications"
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter") handleNotificationsClick(); }}
              />
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 max-w-xs bg-white shadow-2xl rounded-2xl z-50 border border-gray-100 animate-fade-in overflow-hidden">
                  <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <span className="font-semibold text-gray-800">Notifications</span>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => setShowNotifications(false)}
                      aria-label="Close notifications"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    <NotificationPanel />
                  </div>
                </div>
              )}
            </div>
            {/* Profile Avatar */}
            <div className="relative" ref={profilePanelRef}>
              <img
                src={profileImage}
                alt="Admin avatar"
                className={`w-10 h-10 rounded-full border-2 cursor-pointer object-cover transition-shadow duration-150 ${showProfilePanel ? "ring-2 ring-green-500 shadow-lg" : "hover:ring-2 hover:ring-green-300"}`}
                onClick={handleProfileClick}
                tabIndex={0}
                onKeyDown={e => { if (e.key === "Enter") handleProfileClick(); }}
              />
              {showProfilePanel && (
                <div className="absolute right-0 mt-3 w-96 max-w-sm bg-white shadow-2xl rounded-2xl z-50 border border-gray-100 animate-fade-in overflow-hidden">
                  <div className="p-4 border-b flex items-center justify-between bg-gray-50">
                    <span className="font-semibold text-gray-800">Admin Profile</span>
                    <button
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      onClick={() => { setShowProfilePanel(false); setIsEditing(false); }}
                      aria-label="Close profile"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="max-h-96 overflow-y-auto p-4">
                    {!isEditing ? (
                      <div>
                        <div className="flex flex-col items-center mb-4">
                          <img
                            src={profileImage}
                            alt="Admin"
                            className="w-20 h-20 rounded-full border mb-2 object-cover"
                          />
                          <Button size="sm" className="mt-2" onClick={() => setIsEditing(true)}>
                            Edit Profile
                          </Button>
                        </div>
                        <div className="space-y-2">
                          <div><strong>Name:</strong> {adminProfile?.firstName} {adminProfile?.lastName}</div>
                          <div><strong>Email:</strong> {adminProfile?.email}</div>
                          <div><strong>Phone:</strong> {adminProfile?.phoneNumber}</div>
                          <div><strong>Location:</strong> {adminProfile?.location}</div>
                          <div><strong>Gender:</strong> {adminProfile?.gender}</div>
                        </div>
                      </div>
                    ) : (
                      <form
                        className="space-y-3"
                        onSubmit={e => { e.preventDefault(); handleAdminSave(); }}
                      >
                        <div className="flex flex-col items-center">
                          <label htmlFor="admin-avatar-upload" className="cursor-pointer">
                            <img
                              src={imageFile ? URL.createObjectURL(imageFile) : profileImage}
                              alt="Admin"
                              className="w-20 h-20 rounded-full border mb-2 object-cover"
                            />
                          </label>
                          <input
                            id="admin-avatar-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </div>
                        <input
                          className="w-full border rounded px-3 py-2"
                          name="firstName"
                          placeholder="First Name"
                          value={adminForm.firstName}
                          onChange={handleAdminChange}
                        />
                        <input
                          className="w-full border rounded px-3 py-2"
                          name="lastName"
                          placeholder="Last Name"
                          value={adminForm.lastName}
                          onChange={handleAdminChange}
                        />
                        <input
                          className="w-full border rounded px-3 py-2"
                          name="email"
                          placeholder="Email"
                          value={adminForm.email}
                          onChange={handleAdminChange}
                        />
                        <input
                          className="w-full border rounded px-3 py-2"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={adminForm.phoneNumber}
                          onChange={handleAdminChange}
                        />
                        <input
                          className="w-full border rounded px-3 py-2"
                          name="location"
                          placeholder="Location"
                          value={adminForm.location}
                          onChange={handleAdminChange}
                        />
                        <input
                          className="w-full border rounded px-3 py-2"
                          name="gender"
                          placeholder="Gender"
                          value={adminForm.gender}
                          onChange={handleAdminChange}
                        />
                        <div className="flex gap-2 justify-end pt-2">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsEditing(false)}
                          >
                            Cancel
                          </Button>
                          <Button type="submit">Save</Button>
                        </div>
                      </form>
                    )}
                  </div>
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
