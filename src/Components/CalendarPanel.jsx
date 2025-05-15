// // src/components/CalendarPanel.jsx
// import React from 'react';

// const CalendarPanel = () => {
//   const upcomingMeetings = [
//     { date: '27 Aug', title: 'Web Development Workshop', color: 'bg-red-500' },
//     { date: '29 Aug', title: 'Graphic Design Classes', color: 'bg-blue-500' },
//     { date: '31 Aug', title: 'Office Productivity Workshop', color: 'bg-green-500' }
//   ];

//   return (
//     <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-sm">
//       <div className="text-right mb-4">
//         <div className="text-sm text-gray-500">Aug, 26 Tuesday</div>
//       </div>

//       {/* Calendar grid mockup */}
//       <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
//         {/* Days header */}
//         {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
//           <div key={day} className="font-medium text-gray-600">{day}</div>
//         ))}
//         {/* Dates */}
//         {[...Array(31).keys()].map(i => {
//           const day = i + 1;
//           const isToday = day === 26;
//           return (
//             <div
//               key={day}
//               className={`p-1 rounded-full ${
//                 isToday ? 'bg-green-500 text-white font-semibold' : 'text-gray-700'
//               }`}
//             >
//               {day}
//             </div>
//           );
//         })}
//       </div>

//       {/* Incoming Meetings */}
//       <div className="text-xs font-semibold text-gray-500 mb-2">Incoming Meetings</div>
//       <div className="space-y-2">
//         {upcomingMeetings.map((meeting, index) => (
//           <div
//             key={index}
//             className={`text-white px-2 py-1 rounded ${meeting.color} text-sm font-medium`}
//           >
//             <span className="mr-2">{meeting.date}</span>
//             {meeting.title}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CalendarPanel;

import React, { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FallingLines } from "react-loader-spinner";

const COLORS = ['bg-red-400', 'bg-green-400', 'bg-orange-400'];
const MAX_VISIBLE = 3;


const CalendarPanel = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const visibleEvents = showAll ? events : events.slice(0, MAX_VISIBLE);
  const today = dayjs();

  const token = localStorage.getItem("token");
      if (!token) {
        toast("Please sign in first.");
        return;
      }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get("https://skillitgh-lms.onrender.com/api/v1/workshops/upcoming",
          {
            withCredentials: true
          }
        );
        const eventsWithColors = res.data.workshops.map(event => ({
          ...event,
          color: COLORS[Math.floor(Math.random() * COLORS.length)]
        }));
        
        setEvents(eventsWithColors);
        
        //setEvents(res.data.workshops);
        console.log("Fetched events:", events);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const daysInMonth = dayjs().daysInMonth();

  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-sm">
      <div className="text-right mb-4">
        <div className="text-sm text-gray-500">{today.format("MMM, D dddd")}</div>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
          <div key={day} className="font-medium text-gray-600">{day}</div>
        ))}
        {[...Array(daysInMonth).keys()].map((i) => {
          const day = i + 1;
          const isToday = day === today.date();
          return (
            <div
              key={day}
              className={`p-1 rounded-full ${
                isToday ? "bg-green-500 text-white font-semibold" : "text-gray-700"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Incoming Meetings */}
      <div className="text-xs font-semibold text-gray-500 mb-2">Upcoming Workshops</div>
      <div className="space-y-2">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <FallingLines
              color="#08C76A"
              width="100"
              visible={true}
              ariaLabel="falling-lines-loading"
            />
          </div>
        ) : events.length === 0 ? (
          <p className="text-gray-400 text-sm">No upcoming events</p>
        ) : (
          <>
            {visibleEvents.map((meeting, index) => (
              <div
                key={index}
                className={`text-gray-900 px-2 py-1 rounded ${meeting.color || "bg-gray-500"} text-sm font-medium`}
              >
                <span className="mr-2">{dayjs(meeting.date).format("D MMM")}</span>
                {meeting.title}
              </div>
            ))}

            {events.length > MAX_VISIBLE && (
              <button
                onClick={() => setShowAll(prev => !prev)}
                className="text-blue-600 text-sm underline mt-2"
              >
                {showAll ? "Show Less" : "View More"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CalendarPanel;
