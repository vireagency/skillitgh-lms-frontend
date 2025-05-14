const mockCourses = [
    { name: "Graphic Design 101", attendees: ["👩‍🎨", "👨‍🎨", "👩‍💻"] },
    { name: "UI/UX Basics", attendees: ["👨‍💻", "👩‍💼"] },
  ];
  
  export default function RegisteredCoursesCard() {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Registered Courses</h2>
        {mockCourses.map((course, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{course.name}</span>
            <div className="flex space-x-1">
              {course.attendees.map((att, i) => (
                <span key={i} className="text-xl">{att}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  