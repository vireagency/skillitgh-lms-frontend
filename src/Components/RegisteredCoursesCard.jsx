// const mockCourses = [
//     { name: "Graphic Design 101", attendees: ["👩‍🎨", "👨‍🎨", "👩‍💻"] },
//     { name: "UI/UX Basics", attendees: ["👨‍💻", "👩‍💼"] },
//   ];
  
//   export default function RegisteredCoursesCard() {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-4">Registered Courses</h2>
//         {mockCourses.map((course, index) => (
//           <div key={index} className="flex justify-between items-center border-b py-2">
//             <span>{course.name}</span>
//             <div className="flex space-x-1">
//               {course.attendees.map((att, i) => (
//                 <span key={i} className="text-xl">{att}</span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }
  
import axios from "axios";
import { useEffect, useState } from "react";
import { FallingLines } from "react-loader-spinner";

export default function RegisteredCoursesCard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://skillitgh-lms.onrender.com/api/v1/dashboard/registeredUsers"); 
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

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
        courses.map((course, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{course.name}</span>
            <div className="flex space-x-1">
              {course.attendees?.map((att, i) => (
                <span key={i} className="text-xl">{att}</span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
