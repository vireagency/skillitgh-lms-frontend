import React, { useState, useEffect } from "react";
import { Button } from "@/Components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/Components/ui/tabs";
import { Card, CardContent } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import axios from "axios";
import Textarea from "@/Components/ui/textarea";

const API_BASE = "https://skillitgh-lms.onrender.com/api/v1";

const initialFormState = {
  title: "",
  description: "",
  workshopImage: null,
  date: "",
  location: "",
  facilitatorName: "",
  facilitatorEmail: "",
  duration: "",
  // resource: "",
};

const ManageContent = () => {
  const [tab, setTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);
  const [previousWorkshops, setPreviousWorkshops] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateData, setUpdateData] = useState(initialFormState);
  const [createData, setCreateData] = useState(initialFormState);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsWorkshop, setDetailsWorkshop] = useState(null);

  // Fetch courses and workshops (upcoming & previous)
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = sessionStorage.getItem("token");
        const [coursesRes, upcomingRes, previousRes] = await Promise.all([
          axios.get(`${API_BASE}/courses`, { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
          axios.get(`${API_BASE}/workshops/upcoming`, { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
          axios.get(`${API_BASE}/workshops/previous`, { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} }),
        ]);
        setCourses(coursesRes.data.courses || []);
        setUpcomingWorkshops(upcomingRes.data.workshops || []);
        setPreviousWorkshops(previousRes.data.workshops || []);
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
      const token = sessionStorage.getItem("token");
      await axios.delete(`${API_BASE}/${type}/${itemId}`, { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (type === "courses") {
        setCourses((prev) => prev.filter((item) => item.id !== itemId && item._id !== itemId));
      } else {
        setUpcomingWorkshops((prev) => prev.filter((item) => item.id !== itemId && item._id !== itemId));
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
    setUpdateData({
      title: item.title || "",
      description: item.description || "",
      workshopImage: item.workshopImage || null,
      date: item.date ? item.date.slice(0, 10) : "",
      location: item.location || "",
      facilitatorName: item.facilitator?.name || "",
      facilitatorEmail: item.facilitator?.email || "",
      duration: item.duration || "",
      // resource: item.resource || "",
    });
    setShowUpdateModal(true);
  };

  // Publish/unpublish handler
  const handleTogglePublish = async (id, type, published) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.put(
        `${API_BASE}/${type}/${id}`,
        { published: !published },
        { withCredentials: true, headers: token ? { Authorization: `Bearer ${token}` } : {} }
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
        setUpcomingWorkshops((prev) =>
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

  // --- CREATE HANDLER ---
  const handleCreate = async () => {
    const type = tab;
    if (!createData.title.trim()) return;
    try {
      let payload;
      let headers = {};
      const token = sessionStorage.getItem("token");
      if (type === "courses") {
        if (createData.courseImage) {
          payload = new FormData();
          payload.append("title", createData.title);
          payload.append("description", createData.description);
          payload.append("image", createData.courseImage);
          headers["Content-Type"] = "multipart/form-data";
        } else {
          payload = {
            title: createData.title,
            description: createData.description,
          };
        }
      } else {
        // Workshops
        if (createData.workshopImage) {
          payload = new FormData();
          payload.append("title", createData.title);
          payload.append("description", createData.description);
          payload.append("date", createData.date);
          payload.append("location", createData.location);
          payload.append("duration", createData.duration);
          // payload.append("resource", createData.resource);
          payload.append("facilitatorName", createData.facilitatorName);
          payload.append("facilitatorEmail", createData.facilitatorEmail);
          payload.append("workshopImage", createData.workshopImage);
          headers["Content-Type"] = "multipart/form-data";
        } else {
          payload = {
            title: createData.title,
            description: createData.description,
            date: createData.date,
            location: createData.location,
            duration: createData.duration,
            // resource: createData.resource,
            facilitatorName: createData.facilitatorName,
            facilitatorEmail: createData.facilitatorEmail,
          };
        }
      }
      const res = await axios.post(
        `${API_BASE}/${type}`,
        payload,
        { withCredentials: true, headers: { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
      );
      if (type === "courses") {
        setCourses((prev) => [...prev, res.data.course || res.data.courses?.[0]]);
      } else {
        setUpcomingWorkshops((prev) => [...prev, res.data.workshop || res.data.workshops?.[0]]);
      }
      setShowCreateModal(false);
      setCreateData(initialFormState);
    } catch (err) {
      console.error(`Failed to create ${type.slice(0, -1)}:`, err);
    }
  };

  // --- UPDATE HANDLER ---
  const handleUpdate = async () => {
    if (!selectedItem) return;
    const { id, _id, type } = selectedItem;
    const itemId = id || _id;
    try {
      let payload;
      let headers = {};
      const token = sessionStorage.getItem("token");
      if (type === "courses") {
        if (updateData.courseImage && updateData.courseImage instanceof File) {
          payload = new FormData();
          payload.append("title", updateData.title);
          payload.append("description", updateData.description);
          payload.append("image", updateData.courseImage);
          headers["Content-Type"] = "multipart/form-data";
        } else {
          payload = {
            title: updateData.title,
            description: updateData.description,
          };
        }
      } else {
        // Workshops
        if (updateData.workshopImage && updateData.workshopImage instanceof File) {
          payload = new FormData();
          payload.append("title", updateData.title);
          payload.append("description", updateData.description);
          payload.append("date", updateData.date);
          payload.append("location", updateData.location);
          payload.append("duration", updateData.duration);
          // payload.append("resource", updateData.resource);
          payload.append("facilitatorName", updateData.facilitatorName);
          payload.append("facilitatorEmail", updateData.facilitatorEmail);
          payload.append("workshopImage", updateData.workshopImage);
          headers["Content-Type"] = "multipart/form-data";
        } else {
          payload = {
            title: updateData.title,
            description: updateData.description,
            date: updateData.date,
            location: updateData.location,
            duration: updateData.duration,
            // resource: updateData.resource,
            facilitatorName: updateData.facilitatorName,
            facilitatorEmail: updateData.facilitatorEmail,
          };
        }
      }
      const res = await axios.put(
        `${API_BASE}/${type}/${itemId}`,
        payload,
        { withCredentials: true, headers: { ...headers, ...(token ? { Authorization: `Bearer ${token}` } : {}) } }
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
        setUpcomingWorkshops((prev) =>
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

  const renderTable = (items, type, readOnly = false, isPrevious = false) => (
    <table className="w-full table-auto text-left">
      <thead>
        <tr className="border-b">
          <th className="p-2 w-72">Title</th>
          <th className="p-2 w-60">Description</th>
          <th className="p-2">Image</th>
          <th className="p-2">Status</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          // Use courseImage for courses, workshopImage for workshops, fallback to image
          let imageUrl = "";
          if (type === "courses") {
            imageUrl = item.courseImage || item.image || "";
          } else {
            imageUrl = item.workshopImage || item.image || "";
          }
          return (
            <tr key={item.id || item._id} className="border-b">
              <td className="p-2">{item.title}</td>
              <td className="p-2">{item.description}</td>
              <td className="p-2">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt="cover"
                    className="w-16 h-10 object-cover rounded"
                    style={{ background: "#f3f3f3" }}
                  />
                )}
              </td>
              <td className="p-2">
                {item.published ? "Published" : "Unpublished"}
              </td>
              <td className="p-2 space-x-1">
                {!readOnly && (
                  <>
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
                  </>
                )}
                {isPrevious && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setDetailsWorkshop(item);
                      setShowDetailsModal(true);
                    }}
                  >
                    View Details
                  </Button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  // --- MODALS ---

  // Course Create Modal
  const CourseCreateModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Create Course</h3>
        <Input
          className="mb-4"
          placeholder="Title"
          value={createData.title}
          onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
        />
        <Textarea
          className="mb-4"
          placeholder="Description"
          value={createData.description}
          onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
          rows={3}
        />
        <label className="block mb-4">
          <span className="block mb-1 text-sm font-medium">Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={e => setCreateData({ ...createData, courseImage: e.target.files[0] })}
          />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setShowCreateModal(false); setCreateData(initialFormState); }}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </div>
  );

  // Workshop Create Modal
  const WorkshopCreateModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Create Workshop</h3>
        <Input
          className="mb-4"
          placeholder="Title"
          value={createData.title}
          onChange={(e) => setCreateData({ ...createData, title: e.target.value })}
        />
        <Textarea
          className="mb-4"
          placeholder="Description"
          value={createData.description}
          onChange={(e) => setCreateData({ ...createData, description: e.target.value })}
          rows={3}
        />
        <Input
          className="mb-4"
          type="date"
          placeholder="Date"
          value={createData.date}
          onChange={(e) => setCreateData({ ...createData, date: e.target.value })}
        />
        <Input
          className="mb-4"
          placeholder="Location"
          value={createData.location}
          onChange={(e) => setCreateData({ ...createData, location: e.target.value })}
        />
        <Input
          className="mb-4"
          placeholder="Duration"
          value={createData.duration}
          onChange={(e) => setCreateData({ ...createData, duration: e.target.value })}
        />
        {/* <Input
          className="mb-4"
          placeholder="Resource Link"
          value={createData.resource}
          onChange={(e) => setCreateData({ ...createData, resource: e.target.value })}
        /> */}
        <Input
          className="mb-4"
          placeholder="Facilitator Name"
          value={createData.facilitatorName}
          onChange={(e) => setCreateData({ ...createData, facilitatorName: e.target.value })}
        />
        <Input
          className="mb-4"
          placeholder="Facilitator Email"
          value={createData.facilitatorEmail}
          onChange={(e) => setCreateData({ ...createData, facilitatorEmail: e.target.value })}
        />
        <label className="block mb-4">
          <span className="block mb-1 text-sm font-medium">Workshop Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={e => setCreateData({ ...createData, workshopImage: e.target.files[0] })}
          />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => { setShowCreateModal(false); setCreateData(initialFormState); }}>
            Cancel
          </Button>
          <Button onClick={handleCreate}>Create</Button>
        </div>
      </div>
    </div>
  );

  // Course Update Modal
  const CourseUpdateModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Edit Course</h3>
        <Input
          className="mb-4"
          placeholder="Title"
          value={updateData.title}
          onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
        />
        <Textarea
          className="mb-4"
          placeholder="Description"
          value={updateData.description}
          onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
          rows={3}
        />
        <label className="block mb-4">
          <span className="block mb-1 text-sm font-medium">Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={e => setUpdateData({ ...updateData, courseImage: e.target.files[0] })}
          />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  );

  // Workshop Update Modal
  const WorkshopUpdateModal = (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm">
        <h3 className="text-lg font-semibold mb-4">Edit Workshop</h3>
        <Input
          className="mb-4"
          placeholder="Title"
          value={updateData.title}
          onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
        />
        <Textarea
          className="mb-4"
          placeholder="Description"
          value={updateData.description}
          onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
          rows={3}
        />
        <Input
          className="mb-4"
          type="date"
          placeholder="Date"
          value={updateData.date}
          onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })}
        />
        <Input
          className="mb-4"
          placeholder="Location"
          value={updateData.location}
          onChange={(e) => setUpdateData({ ...updateData, location: e.target.value })}
        />
        <Input
          className="mb-4"
          placeholder="Duration"
          value={updateData.duration}
          onChange={(e) => setUpdateData({ ...updateData, duration: e.target.value })}
        />
        {/* <Input
          className="mb-4"
          placeholder="Resource Link"
          value={updateData.resource}
          onChange={(e) => setUpdateData({ ...updateData, resource: e.target.value })}
        /> */}
        <Input
          className="mb-4"
          placeholder="Facilitator Name"
          value={updateData.facilitatorName}
          onChange={(e) => setUpdateData({ ...updateData, facilitatorName: e.target.value })}
        />
        <Input
          className="mb-4"
          placeholder="Facilitator Email"
          value={updateData.facilitatorEmail}
          onChange={(e) => setUpdateData({ ...updateData, facilitatorEmail: e.target.value })}
        />
        <label className="block mb-4">
          <span className="block mb-1 text-sm font-medium">Workshop Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={e => setUpdateData({ ...updateData, workshopImage: e.target.files[0] })}
          />
        </label>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setShowUpdateModal(false)}>
            Cancel
          </Button>
          <Button onClick={handleUpdate}>Update</Button>
        </div>
      </div>
    </div>
  );

  // Previous Workshop Details Modal
  const PreviousWorkshopDetailsModal = detailsWorkshop && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
          onClick={() => setShowDetailsModal(false)}
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold mb-2">{detailsWorkshop.title}</h3>
        <p className="mb-2 text-gray-600">{detailsWorkshop.description}</p>
        {detailsWorkshop.workshopImage && (
          <img
            src={detailsWorkshop.workshopImage}
            alt="Workshop"
            className="w-full h-40 object-cover rounded mb-4"
          />
        )}
        <div className="mb-2">
          <strong>Date:</strong>{" "}
          {detailsWorkshop.date
            ? new Date(detailsWorkshop.date).toLocaleString()
            : "N/A"}
        </div>
        <div className="mb-2">
          <strong>Location:</strong> {detailsWorkshop.location || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Duration:</strong> {detailsWorkshop.duration || "N/A"}
        </div>
        {/* <div className="mb-2">
          <strong>Resource:</strong>{" "}
          {detailsWorkshop.resource ? (
            <a
              href={detailsWorkshop.resource}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline"
            >
              View Resource
            </a>
          ) : (
            "N/A"
          )}
        </div> */}
        <div className="mb-2">
          <strong>Facilitator:</strong>{" "}
          {detailsWorkshop.facilitator?.name || detailsWorkshop.facilitatorName || "N/A"}
        </div>
        <div className="mb-2">
          <strong>Facilitator Email:</strong>{" "}
          {detailsWorkshop.facilitator?.email || detailsWorkshop.facilitatorEmail || "N/A"}
        </div>
      </div>
    </div>
  );

  return (
    <Card className="p-4 rounded-2xl shadow-md">
      <Tabs defaultValue="courses" value={tab} onValueChange={setTab}>
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="workshops">Workshops</TabsTrigger>
          </TabsList>
          {(tab === "courses" || tab === "workshops") && (
            <Button onClick={() => setShowCreateModal(true)}>
              Create New {tab === "courses" ? "Course" : "Workshop"}
            </Button>
          )}
        </div>

        <TabsContent value="courses">
          <CardContent>
            {loading ? <div>Loading...</div> : renderTable(courses, "courses")}
          </CardContent>
        </TabsContent>

        <TabsContent value="workshops">
          <div className="mb-6">
            <h4 className="font-semibold mb-2">Upcoming Workshops</h4>
            <CardContent>
              {loading ? <div>Loading...</div> : renderTable(upcomingWorkshops, "workshops")}
            </CardContent>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Previous Workshops (Read Only)</h4>
            <CardContent>
              {loading ? (
                <div>Loading...</div>
              ) : (
                renderTable(previousWorkshops, "workshops", true, true)
              )}
            </CardContent>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Modal */}
      {showCreateModal &&
        (tab === "courses" ? CourseCreateModal : WorkshopCreateModal)}

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
      {showUpdateModal && selectedItem &&
        (selectedItem.type === "courses"
          ? CourseUpdateModal
          : WorkshopUpdateModal)}

      {/* Previous Workshop Details Modal */}
      {showDetailsModal && PreviousWorkshopDetailsModal}
    </Card>
  );
};

export default ManageContent;

