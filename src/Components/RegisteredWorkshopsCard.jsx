const mockWorkshops = [
    { name: "Web Dev Bootcamp", attendees: ["👨‍💻", "👨‍🏫", "👩‍💼"] },
    { name: "Productivity Hacks", attendees: ["👩‍💻", "👨‍💼"] },
  ];
  
  export default function RegisteredWorkshopsCard() {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Registered Workshops</h2>
        {mockWorkshops.map((workshop, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span>{workshop.name}</span>
            <div className="flex space-x-1">
              {workshop.attendees.map((att, i) => (
                <span key={i} className="text-xl">{att}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
  