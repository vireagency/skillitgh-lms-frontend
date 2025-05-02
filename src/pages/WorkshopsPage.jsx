import WorkshopCard from "../Components/WorkshopCard";
import React from "react";
import "../index.css"; 
import { useNavigate } from "react-router-dom";

const workshops = Array(6).fill({
  date: "01/05/25",
  title: "First Graphic Design workshop about photoshop",
  image: "/image 6.png",
});

//const navigate = useNavigate();
  //const path = {
    //route: "/workshopregistration"
  //};

const WorkshopsPage = () => {
  return (
    <div className="px-4 md:px-20 py-10">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Workshops</h1>
        <p className="text-sm text-gray-500">Register for any upcoming workshop you are interested in attending</p>

        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full font-medium">Upcoming Workshops</button>
          <button className="text-gray-700 px-4 py-2 rounded-full font-medium">Previous Workshops</button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {workshops.map((workshop, idx) => (
          <WorkshopCard key={idx} {...workshop} />
        ))}
      </div>
    </div>
  );
};

export default WorkshopsPage;
