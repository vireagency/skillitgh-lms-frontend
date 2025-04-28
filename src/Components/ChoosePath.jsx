import React from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

export default function ChoosePath() {
  const navigate = useNavigate();

  const paths = [
    {
      title: "Course Registration",
      icon: "/image 4.png", 
      route: "/courses",
    },
    {
      title: "Workshop Registration",
      icon: "/image 3.png", 
      route: "/workshops",
    },
  ];

  return (
    <div className="flex items-center justify-center h-screen bg-sky-100">
      <div className="bg-white p-12 rounded-3xl shadow-xl aspect-auto text-center">
            <h1 className="text-3xl font-semibold text-gray-700 mb-10">Choose a Path</h1>
            <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            {paths.map((path) => (
                <div
                key={path.title}
                onClick={() => navigate(path.route)}
                className="bg-orange-50 hover:bg-[#08C76A] transition-all duration-300 cursor-pointer rounded-xl p-8 w-64 flex flex-col items-center shadow-md group"
                >
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-4 shadow">
                        <img src={path.icon} alt={path.title} className="w-12 h-12" />
                    </div>
                    <p className="text-md font-medium text-gray-700 group-hover:text-white">{path.title}</p>
                </div>
            ))}
            </div>
      </div>
    </div>
  );
}
