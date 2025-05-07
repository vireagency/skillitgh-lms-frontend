import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "./ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "./ui/button"
import { BookOpen, Anvil, LogOut, User } from "lucide-react"

export function AppSidebar() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to sign out?");
    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/signin");
    }
  };
  

  const menu = [
    { type: "link", label: "Workshops", icon: <Anvil className="mr-2 h-5 w-5" />, path: "/dashboard/workshops" },
    { type: "link", label: "Courses", icon: <BookOpen className="mr-2 h-5 w-5" />, path: "/dashboard/courses-dashboard" },
    { type: "link", label: "Profile", icon: <User className="mr-2 h-5 w-5" />, path: "/dashboard/profile" },
    { type: "action", label: "Sign out", icon: <LogOut className="mr-2 h-5 w-5" />, action: handleLogout },
  ];
  
  return (
    <Sidebar collapsible="icon" className="h-screen bg-[#F6F8F9] text-gray-500">
      <SidebarHeader className="text-2xl font-bold p-4">
        <img src="/Layer1.png" alt="sidebar image" className="h-[75%] w-[60%]" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col space-y-4 p-2">
        {menu.map((item) => (
          <div key={item.label} className="flex items-center space-x-2">
            <Button
              variant="ghost"
              className="justify-start flex-1 active:bg-[#C2FFE1] active:text-[#08C76A]"
              tooltip={item.label}
              onClick={() => item.type === "action" ? item.action() : navigate(item.path)}
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
  )
}

export default AppSidebar
