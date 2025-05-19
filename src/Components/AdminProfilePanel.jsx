import React, { useEffect, useState } from "react";
import axios from "axios";
import { FallingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

export function AdminProfilePanel() {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    // Use sessionStorage instead of localStorage
    const token = sessionStorage.getItem("token");

    axios
      .get("https://skillitgh-lms.onrender.com/api/v1/dashboard/profile", {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
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

export function NotificationPanel() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications
  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      const res = await axios.get(
        "https://skillitgh-lms.onrender.com/api/v1/dashboard/notifications",
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      // Use res.data.notifications (array) from backend response
      setNotifications(res.data.notifications || []);
      // console.log(res.data.notifications);
    } catch (err) {
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // Mark as read
  const handleMarkAsRead = async (notificationId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `https://skillitgh-lms.onrender.com/api/v1/dashboard/notifications/${notificationId}`,
        {},
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isRead: true } : n
        )
      );
      toast.success("Notification marked as read");
    } catch {
      toast.error("Failed to mark as read");
    }
  };

  // Delete notification
  const handleDelete = async (notificationId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.delete(
        `https://skillitgh-lms.onrender.com/api/v1/dashboard/notifications/${notificationId}`,
        {
          withCredentials: true,
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        }
      );
      setNotifications((prev) => prev.filter((n) => n._id !== notificationId));
      toast.success("Notification deleted");
    } catch {
      toast.error("Failed to delete notification");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
        />
      </div>
    );
  }

  if (!notifications.length) {
    return <div className="p-4 text-center text-gray-500">No notifications.</div>;
  }

  return (
    <ul className="divide-y w-96">
      {notifications.map((notif, idx) => (
        <li
          key={notif._id || idx}
          className={`p-4 flex justify-between items-start hover:bg-gray-50 transition ${notif.isRead ? "opacity-60" : ""}`}
        >
          <div>
            <div className="font-medium">{notif.title || "Notification"}</div>
            <div className="text-sm text-gray-600">{notif.message || notif.body}</div>
            {notif.createdAt && (
              <div className="text-xs text-gray-400 mt-1">
                {new Date(notif.createdAt).toLocaleString()}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 ml-2">
            {!notif.isRead && (
              <button
                className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 hover:bg-green-200 transition"
                onClick={() => handleMarkAsRead(notif._id)}
              >
                Mark as read
              </button>
            )}
            <button
              className="text-xs px-2 py-1 rounded bg-red-100 text-red-700 hover:bg-red-200 transition"
              onClick={() => handleDelete(notif._id)}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}