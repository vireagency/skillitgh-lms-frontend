import React from "react";

const CoursesDashboard = () => {
  return (
    <div className="min-h-screen bg-white px-4 py-10 flex flex-col items-center">
      {/* Heading */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-slate-800">Courses</h1>
        <p className="text-sm text-gray-500 mt-1">
          Register for any course you are interested in
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-10">
        <button className="px-6 py-2 bg-green-500 text-white rounded-full font-medium">
          Enrolled Courses
        </button>
        <button className="px-6 py-2 text-gray-700 font-medium">
          Other Courses
        </button>
      </div>

      {/* Course Card */}
      <div className="w-full max-w-sm bg-gray-100 rounded-xl shadow-sm p-4">
        <img
          src="/image 6.png"
          alt="Course"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <p className="text-sm text-gray-500 mb-1">01/05/25 - <span className="text-green-600">New</span></p>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Graphic Design</h2>
        
        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
          <div className="bg-green-500 h-full w-[10%]"></div>
        </div>
        <p className="text-sm text-gray-500 text-right">10%</p>
      </div>
    </div>
  );
};

export default CoursesDashboard;
