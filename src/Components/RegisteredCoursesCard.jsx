import axios from "axios";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

export default function RegisteredCoursesCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "https://skillitgh-lms.onrender.com/api/v1/dashboard/registeredCourses",
          { withCredentials: true }
        );
        setCourses(res.data.courses);
        console.log(res.data.courses);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md flex justify-center items-center h-40">
        <FallingLines
          color="#08C76A"
          width="100"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Registered Courses</h2>
      {courses.length === 0 ? (
        <p>No registered courses.</p>
      ) : (
        courses.map((course, index) => (
          <div
            key={course.id || index}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{course.name}</span>
            <div className="flex space-x-1">
              {(course.attendees || []).map((att, i) => (
                <span key={i} className="text-xl">{att}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
