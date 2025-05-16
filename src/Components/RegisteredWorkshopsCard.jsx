// const mockWorkshops = [
//     { name: "Web Dev Bootcamp", attendees: ["👨‍💻", "👨‍🏫", "👩‍💼"] },
//     { name: "Productivity Hacks", attendees: ["👩‍💻", "👨‍💼"] },
//   ];
  
//   export default function RegisteredWorkshopsCard() {
//     return (
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-4">Registered Workshops</h2>
//         {mockWorkshops.map((workshop, index) => (
//           <div key={index} className="flex justify-between items-center border-b py-2">
//             <span>{workshop.name}</span>
//             <div className="flex space-x-1">
//               {workshop.attendees.map((att, i) => (
//                 <span key={i} className="text-xl">{att}</span>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }
  
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

export default function RegisteredWorkshopsCard() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const res = await axios.get("https://skillitgh-lms.onrender.com/api/v1/workshops/registeredWorkshops",
          {
            withCredentials: true
          }
        ); 
        setWorkshops(res.data.workshops);
        console.log(res.data.workshops);
      } catch (err) {
        console.error("Failed to fetch workshops:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkshops();
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Registered Workshops</h2>

      {loading ? (
        <div className="flex justify-center items-center h-full">
          <FallingLines
            color="#08C76A"
            width="100"
            visible={true}
            ariaLabel="falling-lines-loading"
          />
        </div>
      ) : workshops.length === 0 ? (
        <p>No registered workshops.</p>
      ) : (
        workshops.map((workshop, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{workshop.title}</span>
            <div className="flex space-x-1">
              {workshop.attendees?.map((att, i) => (
                <span key={i} className="text-xl">
                  <img 
                  src={att.userImage} 
                  alt="description"
                  className="w-8 h-8 rounded-full"
                   />
                </span>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
