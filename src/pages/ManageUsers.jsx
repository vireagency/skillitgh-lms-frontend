// src/pages/ManageUsers.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";

const API = "https://skillitgh-lms.onrender.com/api/v1/dashboard/users";
const token = localStorage.getItem("token");
// const data = response.data.users;

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [updateUser, setUpdateUser] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  

  useEffect(() => {
    axios.get(API,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
    setUsers(response.data.users);
    console.log(response.data.users);
    }
    )
  }, []);

  // const fetchUsers = async () => {
  //   try {
  //      await axios.get(API, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setUsers(data);
  //   } catch (err) {
  //     console.error("Failed to fetch users:", err);
  //   }
  // };

  useEffect(() => {
    axios.patch(API,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
    setUpdateUser(response.data.users);
    console.log(response.data.users);
    }
    )
  }, []);

  useEffect(() => {
    axios.delete(API,
      {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => {
    setDeleteUser(response.data.users);
    console.log(response.data.users);
    }
    )
  }, []);

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase()) ||
    user.lastName.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

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

      {/* Role Modal */}
      <Dialog open={showUpdateModal} onOpenChange={setShowUpdateModal}>
        <div className="bg-white p-6 rounded-lg shadow max-w-sm mx-auto">
          <h3 className="text-lg font-medium mb-4">
            Update information for {updateUser?.name}
          </h3>
          <div className="flex gap-2">
            <Button onClick={() => handleRoleUpdate("user")}>User</Button>
            {/* <Button onClick={() => handleRoleUpdate("instructor")}>Instructor</Button> */}
            <Button onClick={() => handleRoleUpdate("admin")}>Admin</Button>
          </div>
        </div>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <div className="bg-white p-6 rounded-lg shadow max-w-sm mx-auto">
          <h3 className="text-lg font-medium mb-4 text-red-600">
            Confirm Deletion
          </h3>
          <p className="mb-4">
            Are you sure you want to delete <strong>{updateUser?.name}</strong>?
          </p>
          <div className="flex gap-2 justify-end">
            <Button onClick={() => setShowDeleteModal(false)} variant="outline">
              Cancel
            </Button>
            <Button onClick={setDeleteUser} variant="destructive">
              Delete
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
