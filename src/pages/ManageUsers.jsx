// src/pages/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

const API = "https://skillitgh-lms.onrender.com/api/v1/dashboard/users";
const PROFILE_API = "https://skillitgh-lms.onrender.com/api/v1/dashboard/profile";
const token = localStorage.getItem("token");

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [updateUser, setUpdateUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data.users);
    } catch (err) {
      console.error("Failed to fetch users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users by search
  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  // Handle update
  const handleUpdate = async () => {
    try {
      await axios.patch(`${PROFILE_API}/${updateUser._id}`, updateUser, {
        withCredentials: true,
      });
      setShowUpdateModal(false);
      setUpdateUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // Handle delete
  const handleDelete = async () => {
    try {
      await axios.delete(`${API}/${updateUser._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShowDeleteModal(false);
      setUpdateUser(null);
      fetchUsers();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>
      <Input
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 max-w-sm"
      />
      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="text-left p-2">First Name</th>
            <th className="text-left p-2">Last Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Role</th>
            <th className="text-left p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id} className="border-t">
              <td className="p-2">{user.firstName}</td>
              <td className="p-2">{user.lastName}</td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.role}</td>
              <td className="p-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setUpdateUser(user);
                    setShowUpdateModal(true);
                  }}
                >
                  Update
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => {
                    setUpdateUser(user);
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="bg-white p-6 rounded-lg shadow max-w-sm mx-auto">
          <h3 className="text-lg font-medium mb-4">
            Update information for {updateUser?.firstName} {updateUser?.lastName}
          </h3>
          <Input
            placeholder="First Name"
            value={updateUser?.firstName || ""}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, firstName: e.target.value })
            }
            className="mb-4"
          />
          <Input
            placeholder="Last Name"
            value={updateUser?.lastName || ""}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, lastName: e.target.value })
            }
            className="mb-4"
          />
          <Input
            placeholder="Email"
            value={updateUser?.email || ""}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, email: e.target.value })
            }
            className="mb-4"
          />
          <Input
            placeholder="Role"
            value={updateUser?.role || ""}
            onChange={(e) =>
              setUpdateUser({ ...updateUser, role: e.target.value })
            }
            className="mb-4"
          />
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setShowUpdateModal(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="bg-white p-6 rounded-lg shadow max-w-sm mx-auto">
          <h3 className="text-lg font-medium mb-4 text-red-600">
            Confirm Deletion
          </h3>
          <p className="mb-4">
            Are you sure you want to delete <strong>{updateUser?.firstName} {updateUser?.lastName}</strong>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setShowDeleteModal(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
