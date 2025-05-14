// src/components/CalendarPanel.jsx
import React from 'react';

const CalendarPanel = () => {
  const upcomingMeetings = [
    { date: '27 Aug', title: 'Web Development Workshop', color: 'bg-red-500' },
    { date: '29 Aug', title: 'Graphic Design Classes', color: 'bg-blue-500' },
    { date: '31 Aug', title: 'Office Productivity Workshop', color: 'bg-green-500' }
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-sm">
      <div className="text-right mb-4">
        <div className="text-sm text-gray-500">Aug, 26 Tuesday</div>
      </div>

      {/* Calendar grid mockup */}
      <div className="grid grid-cols-7 gap-1 text-center text-xs mb-4">
        {/* Days header */}
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
          <div key={day} className="font-medium text-gray-600">{day}</div>
        ))}
        {/* Dates */}
        {[...Array(31).keys()].map(i => {
          const day = i + 1;
          const isToday = day === 26;
          return (
            <div
              key={day}
              className={`p-1 rounded-full ${
                isToday ? 'bg-green-500 text-white font-semibold' : 'text-gray-700'
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Incoming Meetings */}
      <div className="text-xs font-semibold text-gray-500 mb-2">Incoming Meetings</div>
      <div className="space-y-2">
        {upcomingMeetings.map((meeting, index) => (
          <div
            key={index}
            className={`text-white px-2 py-1 rounded ${meeting.color} text-sm font-medium`}
          >
            <span className="mr-2">{meeting.date}</span>
            {meeting.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarPanel;
