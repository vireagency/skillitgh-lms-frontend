import Button from "./Button";
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
}
