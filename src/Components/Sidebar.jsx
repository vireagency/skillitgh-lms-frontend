/*import Button from "./Button";
import { Home, BookOpen, ClipboardList, User } from "lucide-react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col p-4">
      <div className="text-2xl font-bold mb-8"><img src="./image 45.png" alt="sidebar image" /></div>
      <nav className="flex flex-col space-y-4">
        <Link to="/" className="flex items-center space-x-2">
          <Button variant="ghost" className="justify-start flex-1">
            <Home className="mr-2 h-5 w-5" />
            Workshops
          </Button>
        </Link>
        <Link to="/courses" className="flex items-center space-x-2">
          <Button variant="ghost" className="justify-start flex-1">
            <BookOpen className="mr-2 h-5 w-5" />
            Courses
          </Button>
        </Link>
        <Link to="/assignments" className="flex items-center space-x-2">
          <Button variant="ghost" className="justify-start flex-1">
            <ClipboardList className="mr-2 h-5 w-5" />
            Profile
          </Button>
        </Link>
        <Link to="/profile" className="flex items-center space-x-2">
          <Button variant="ghost" className="justify-start flex-1">
            <User className="mr-2 h-5 w-5" />
            Sign Out
          </Button>
        </Link>
      </nav>
    </aside>
  );
}*/

import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "./ui/sidebar";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Home, BookOpen, Anvil } from "lucide-react";


export function AppSidebar() {
  return (
    <Sidebar className="h-screen w-64 bg-[#F6F8F9] text-gray-500 flex flex-col p-4">
      <SidebarHeader className="text-2xl font-bold mb-8">
        <img src="/image 45.png" alt="sidebar image" />
      </SidebarHeader>
      <SidebarContent className="flex flex-col space-y-4">
      <Link to="/dasboard/workshops" className="flex items-center space-x-2">
          <Button variant="ghost" className="justify-start flex-1  hover:bg-[#C2FFE1] hover:text-[#08C76A]">
            <Anvil className="mr-2 h-5 w-5 " />
            Workshops
          </Button>
        </Link>
        <Link to="/dashboard/courses-dashboard" className="flex items-center space-x-2">
          <Button variant="ghost" className="justify-start flex-1  hover:bg-[#C2FFE1] hover:text-[#08C76A]">
            <BookOpen className="mr-2 h-5 w-5" />
            Courses
          </Button>
        </Link>
      </SidebarContent>
      <SidebarFooter className="text-center mt-auto" />
      <SidebarRail className="flex items-center justify-center h-full" />
    </Sidebar>
  );
}

export default AppSidebar;
