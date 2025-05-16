import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import axios from "axios";

const API_BASE = "https://skillitgh-lms.onrender.com/api/v1/dashboard";

const ManageContent = () => {
  const [tab, setTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateData, setUpdateData] = useState({ title: "" });

  // Fetch courses and workshops
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [coursesRes, workshopsRes] = await Promise.all([
          axios.get(`${API_BASE}/courses`, { withCredentials: true }),
          axios.get(`${API_BASE}/workshops`, { withCredentials: true }),
        ]);
        setCourses(coursesRes.data.courses || []);
        setWorkshops(workshopsRes.data.workshops || []);
      } catch (err) {
        console.error("Failed to fetch content:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Delete handler
  const handleDelete = async () => {
    if (!selectedItem) return;
    const { id, _id, type } = selectedItem;
    const itemId = id || _id;
    try {
      await axios.delete(`${API_BASE}/${type}/${itemId}`, { withCredentials: true });
      if (type === "courses") {
        setCourses((prev) => prev.filter((item) => item.id !== itemId && item._id !== itemId));
      } else {
        setWorkshops((prev) => prev.filter((item) => item.id !== itemId && item._id !== itemId));
      }
      setShowDeleteModal(false);
      setSelectedItem(null);
    } catch (err) {
      console.error(`Failed to delete ${type.slice(0, -1)}:`, err);
    }
  };

  // Open delete modal
  const openDeleteModal = (item, type) => {
    setSelectedItem({ ...item, type });
    setShowDeleteModal(true);
  };

  // Open update modal
  const openUpdateModal = (item, type) => {
    setSelectedItem({ ...item, type });
    setUpdateData({ title: item.title || "" });
    setShowUpdateModal(true);
  };

  // Update handler
  const handleUpdate = async () => {
    if (!selectedItem) return;
    const { id, _id, type } = selectedItem;
    const itemId = id || _id;
    try {
      const res = await axios.patch(
        `${API_BASE}/${type}/${itemId}`,
        { title: updateData.title },
        { withCredentials: true }
      );
      if (type === "courses") {
        setCourses((prev) =>
          prev.map((item) =>
            (item.id === itemId || item._id === itemId)
              ? { ...item, ...res.data[type.slice(0, -1)] }
              : item
          )
        );
      } else {
        setWorkshops((prev) =>
          prev.map((item) =>
            (item.id === itemId || item._id === itemId)
              ? { ...item, ...res.data[type.slice(0, -1)] }
              : item
          )
        );
      }
      setShowUpdateModal(false);
      setSelectedItem(null);
    } catch (err) {
      console.error(`Failed to update ${selectedItem.type.slice(0, -1)}:`, err);
    }
  };

  // Publish/unpublish handler
  const handleTogglePublish = async (id, type, published) => {
    try {
      await axios.patch(
        `${API_BASE}/${type}/${id}`,
        { published: !published },
        { withCredentials: true }
      );
      if (type === "courses") {
        setCourses((prev) =>
          prev.map((item) =>
            (item.id === id || item._id === id)
              ? { ...item, published: !item.published }
              : item
          )
        );
      } else {
        setWorkshops((prev) =>
          prev.map((item) =>
            (item.id === id || item._id === id)
              ? { ...item, published: !item.published }
              : item
          )
        );
      }
    } catch (err) {
      console.error(`Failed to update ${type.slice(0, -1)}:`, err);
    }
  };

  const renderTable = (items, type) => (
    <table className="w-full table-auto text-left">
      <thead>
        <tr className="border-b">
          <th className="p-2">Title</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id || item._id} className="border-b">
            <td className="p-2">{item.title}</td>
            <td className="p-2">
              {item.published ? "Published" : "Unpublished"}
            </td>
            <td className="p-2 space-x-2">
              <Button size="sm" onClick={() => openUpdateModal(item, type)}>
                Edit
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => openDeleteModal(item, type)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  handleTogglePublish(item.id || item._id, type, item.published)
                }
              >
                {item.published ? "Unpublish" : "Publish"}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <Card className="p-4 rounded-2xl shadow-md">
      <Tabs defaultValue="courses" value={tab} onValueChange={setTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
          </TabsList>
          <Button onClick={() => alert(`Create new ${tab.slice(0, -1)}`)}>
            Create New {tab === "courses" ? "Course" : "Workshop"}
          </Button>
        </div>

        <TabsContent value="courses">
          <CardContent>
            {loading ? <div>Loading...</div> : renderTable(courses, "courses")}
          </CardContent>
        </TabsContent>

        <TabsContent value="workshops">
          <CardContent>
            {loading ? <div>Loading...</div> : renderTable(workshops, "workshops")}
          </CardContent>
        </TabsContent>
      </Tabs>

      {/* Delete Modal */}
      {showDeleteModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4 text-red-600">
              Confirm Deletion
            </h3>
            <p className="mb-6">
              Are you sure you want to delete <strong>{selectedItem.title}</strong>?
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdateModal && selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">
              Edit {selectedItem.type === "courses" ? "Course" : "Workshop"}
            </h3>
            <Input
              className="mb-4"
              placeholder="Title"
              value={updateData.title}
              onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Update</Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default ManageContent;

