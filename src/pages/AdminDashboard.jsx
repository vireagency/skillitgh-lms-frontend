import RegisteredCoursesCard from '../Components/RegisteredCoursesCard';
import RegisteredWorkshopsCard from '../Components/RegisteredWorkshopsCard';
import WorkshopAttendanceGraph from '../Components/WorkshopAttendanceGraph';
import CalendarPanel from '../Components/CalendarPanel'; 

export default function AdminDashboard() {
  return (
    <div className="flex flex-col lg:flex-row p-6 gap-6">
      {/* Main content area */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RegisteredCoursesCard />
          <RegisteredWorkshopsCard />
        </div>

        <WorkshopAttendanceGraph />
      </div>

      {/* Right side calendar */}
      <div className="w-full lg:w-80">
        <CalendarPanel />
      </div>
    </div>
  );
}
