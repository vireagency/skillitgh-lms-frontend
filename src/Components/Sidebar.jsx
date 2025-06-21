import { useState } from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "./ui/sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { BookOpen, Anvil, LogOut, User } from "lucide-react";
import axios from "axios";

const MENU_ITEMS = [
  { type: "link", label: "Courses", icon: <BookOpen className="mr-2 h-5 w-5" />, path: "/dashboard" },
  { type: "link", label: "Workshops", icon: <Anvil className="mr-2 h-5 w-5" />, path: "/dashboard/workshops" },
  { type: "link", label: "Profile", icon: <User className="mr-2 h-5 w-5" />, path: "/dashboard/profile" },
  { type: "action", label: "Sign out", icon: <LogOut className="mr-2 h-5 w-5" /> },
];

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleMenuClick = (item) => {
    if (item.type === "action") {
      setShowModal(true);
    } else {
      navigate(item.path);
    }
  };

  const confirmLogout = async () => {
    setShowModal(false);
    try {
      await axios.post(
        "https://skillitgh-lms-backend.onrender.com/api/v1/auth/signout",
        { withCredentials: true }
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      sessionStorage.removeItem("token");
      navigate("/signin");
    }
  };

  return (
    <>
      <Sidebar collapsible="icon" className="h-screen bg-[#F6F8F9] text-gray-500">
        <SidebarHeader className="text-2xl font-bold p-4">
          <img src="/Layer1.png" alt="sidebar logo" className="h-auto w-28" />
        </SidebarHeader>
        <SidebarContent className="flex flex-col space-y-4 p-2">
          {MENU_ITEMS.map((item) => (
            <div key={item.label} className="flex items-center space-x-2">
              <Button
                variant="ghost"
                className={`justify-start flex-1 ${
                  location.pathname === item.path ? "bg-[#C2FFE1] text-[#08C76A]" : ""
                } hover:bg-[#E9FCF3]`}
                tooltip={item.label}
                onClick={() => handleMenuClick(item)}
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
            </div>
          ))}
        </SidebarContent>
        <SidebarFooter className="text-center mt-auto" />
        <SidebarRail />
      </Sidebar>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-3xl border-2 border-green-500 shadow-lg py-10 px-10 w-[90%] max-w-md relative text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Confirm Sign Out</h2>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to sign out?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 rounded-full text-gray-600 hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-green-500 text-white rounded-full hover:bg-green-600"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default AppSidebar;
