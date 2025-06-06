import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const attendanceData = [
  { date: 'Aug 14', attendees: 120 },
  { date: 'Aug 15', attendees: 110 },
  { date: 'Aug 16', attendees: 140 },
  { date: 'Aug 17', attendees: 60 },
  { date: 'Aug 18', attendees: 100 },
  { date: 'Aug 19', attendees: 70 },
  { date: 'Aug 20', attendees: 110 },
];

export default function WorkshopAttendanceGraph() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-64">
      <h2 className="text-lg font-semibold mb-4">Workshop Attendance Overview</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={attendanceData}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="attendees" fill="#4F46E5" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
