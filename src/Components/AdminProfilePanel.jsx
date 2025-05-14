import { useEffect, useState } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";

export function AdminProfilePanel() {
  const [admin, setAdmin] = useState(null);
 

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
    .get("https://skillitgh-lms.onrender.com/api/v1/dashboard/profile", {
    headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => setAdmin(res.data.user))
    .catch((err) => console.error("Admin fetch error:", err));
    }, []);

  return (  
    <div className="bg-white p-4 rounded-xl shadow-md h-auto w-auto">
    <h2 className="text-lg font-semibold mb-4">Admin Profile</h2>
    {admin ? (
        <div className="flex items-center space-x-4">
        <img
            src={admin.userImage || "/default-avatar.png"}
            alt="avatar"
            className="w-14 h-14 rounded-full border"
        />
        <div>
            <p className="font-bold text-base">{admin.firstName}</p>
            <p className="text-sm text-gray-500">{admin.lastName}</p>
            <p className="text-sm text-gray-500">{admin.email}</p>
            <p className="text-xs text-gray-400 mt-1">Role: {admin.role || "Administrator"}</p>
        </div>
        </div>
    ) : (
        <div className="flex justify-center items-center h-full">
            <FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
            />
        </div>
    )}
    </div>      
    
  );
}

export function NotificationPanel(){ 
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
        .get("https://skillitgh-lms.onrender.com/api/v1/notifications", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setNotifications(res.data))
        .catch((err) => console.error("Notification fetch error:", err));
    }, []);


    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            
            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                    <p className="text-sm text-gray-400">No new notifications</p>
                ) : (
                    notifications.map((note, index) => (
                    <li key={index} className="bg-gray-100 text-sm text-gray-700 p-2 rounded">
                        {note.message}
                    </li>
                    ))
                )}
                </ul>
            </div>
        </div>
    );
}