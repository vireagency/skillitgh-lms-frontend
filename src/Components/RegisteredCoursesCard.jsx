import axios from "axios";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

// Utility to generate a random pastel color
function getRandomColor(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const h = Math.abs(hash) % 360;
  return `hsl(${h}, 70%, 85%)`;
}

export default function RegisteredCoursesCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalCourse, setModalCourse] = useState(null);
  const [showAll, setShowAll] = useState(false);

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

  const visibleCourses = showAll ? courses : courses.slice(0, 3);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Registered Courses</h2>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <FallingLines
            color="#08C76A"
            width="100"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </div>
      ) : courses.length === 0 ? (
        <p>No registered courses.</p>
      ) : (
        <>
          {visibleCourses.map((course, index) => (
            <div
              key={course._id || index}
              className="flex justify-between items-center border-b py-2 px-2 h-24 cursor-pointer transition hover:shadow-lg"
              style={{
                background: getRandomColor(course.title || String(index)),
                borderRadius: "0.5rem",
                marginBottom: "0.5rem",
              }}
              onClick={() => setModalCourse(course)}
              tabIndex={0}
              onKeyDown={e => { if (e.key === "Enter") setModalCourse(course); }}
              aria-label={`Show details for ${course.title}`}
            >
              <span className="font-medium">{course.title}</span>
              <div className="flex space-x-1">
                {(course.attendees || []).slice(0, 4).map((att, i) => (
                  <span key={i} className="text-xl">
                    <img
                      src={att.userImage}
                      alt={att.name || "Attendee"}
                      className="w-8 h-8 rounded-full border"
                    />
                  </span>
                ))}
                {course.attendees?.length > 4 && (
                  <span className="text-xs text-gray-600 ml-2">
                    +{course.attendees.length - 4} more
                  </span>
                )}
              </div>
            </div>
          ))}
          {courses.length > 3 && (
            <div className="flex justify-center mt-2">
              <button
                className="text-green-600 hover:underline text-sm font-medium"
                onClick={() => setShowAll((prev) => !prev)}
              >
                {showAll ? "View less" : "View more"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Modal for course details */}
      {modalCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-red-500"
              onClick={() => setModalCourse(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold mb-2">{modalCourse.title}</h3>
            <p className="mb-4 text-gray-600">{modalCourse.description}</p>
            <div>
              <h4 className="font-semibold mb-2">Attendees</h4>
              {modalCourse.attendees && modalCourse.attendees.length > 0 ? (
                <ul className="space-y-2 max-h-60 overflow-y-auto">
                  {modalCourse.attendees.map((att, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <img
                        src={att.userImage}
                        alt={att.name || "Attendee"}
                        className="w-10 h-10 rounded-full border"
                      />
                      <div>
                        <div className="font-medium">
                          {att.firstName || "No Name"} <span>{att.lastName}</span>
                        </div>
                        <div className="text-xs text-gray-500">{att.email || ""}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-gray-500">No attendees yet.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
