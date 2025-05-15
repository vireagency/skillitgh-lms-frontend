import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const mockCourses = [
  { id: 1, title: "Intro to HTML", published: true },
  { id: 2, title: "React Basics", published: false },
];

const mockWorkshops = [
  { id: 1, title: "CSS Flexbox", published: true },
  { id: 2, title: "Tailwind Crash Course", published: false },
];

const ManageContent = () => {
  const [tab, setTab] = useState("courses");
  const [courses, setCourses] = useState(mockCourses);
  const [workshops, setWorkshops] = useState(mockWorkshops);

  const handleDelete = (id, type) => {
    const setFunc = type === "courses" ? setCourses : setWorkshops;
    const data = type === "courses" ? courses : workshops;
    setFunc(data.filter(item => item.id !== id));
  };

  const handleTogglePublish = (id, type) => {
    const setFunc = type === "courses" ? setCourses : setWorkshops;
    const data = type === "courses" ? courses : workshops;
    setFunc(
      data.map(item =>
        item.id === id ? { ...item, published: !item.published } : item
      )
    );
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
        {items.map(item => (
          <tr key={item.id} className="border-b">
            <td className="p-2">{item.title}</td>
            <td className="p-2">
              {item.published ? "Published" : "Unpublished"}
            </td>
            <td className="p-2 space-x-2">
              <Button size="sm" onClick={() => alert("Edit coming soon")}>Edit</Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(item.id, type)}
              >
                Delete
              </Button>
              <Button
                size="sm"
                onClick={() => handleTogglePublish(item.id, type)}
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
          <CardContent>{renderTable(courses, "courses")}</CardContent>
        </TabsContent>

        <TabsContent value="workshops">
          <CardContent>{renderTable(workshops, "workshops")}</CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default ManageContent;

