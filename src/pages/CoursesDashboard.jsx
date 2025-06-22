import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import "../Components/ui/button";
import "../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FallingLines } from "react-loader-spinner";

const CoursesDashboard = () => { 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("enrolled");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const openModal = (course) => {
    setSelectedCourse(course);
  };

  const closeModal = () => {
    setSelectedCourse(null);
  };

  const fetchCourses = () => {
    setLoading(true);
    setErrorMessage("");

    const token = sessionStorage.getItem("token"); // Use sessionStorage
    if (!token) {
      toast("Please sign in first.");
      return;
    }
    
    const url =
      view === "enrolled"
        ? "https://skillitgh-lms-backend.onrender.com/api/v1/dashboard/registeredCourses"
        : "https://skillitgh-lms-backend.onrender.com/api/v1/dashboard/otherCourses";

    axios
      .get(url, {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then((response) => {
        const data = response.data.courses;
        if (Array.isArray(data) && data.length > 0) {
          setCourses(data);
          toast.success(response.data.message || "Courses loaded!");
          console.log(response.data.courses);
        }
      })
      .catch((err) => {
        setCourses([]); 
        const backendMessage = err.response?.data?.message || "Failed to load courses.";
        setErrorMessage(backendMessage);
        console.error(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCourses();
  }, [view]); 
  
  return (
    <div className="px-4 md:px-20 py-10 bg-white">
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-800">Courses</h1>
        <p className="text-sm text-gray-500 ">
          Register for any course you are interested in
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mt-6 mb-6">
          <button
            onClick={() => setView("enrolled")}
            className={`px-4 py-2 rounded-full font-medium ${
              view === "enrolled"
                ? "bg-green-500 text-white"
                : "text-gray-700 bg-gray-200"
            }`}
          >
            Enrolled Courses
          </button>
          <button
            onClick={() => setView("other")}
            className={`px-4 py-2 rounded-full font-medium ${
              view === "other"
                ? "bg-green-500 text-white"
                : "text-gray-700 bg-gray-200"
            }`}
          >
            Other Courses
          </button>
        </div>

        {loading && <div className='flex justify-center items-center'><FallingLines
            color="#4fa94d"
            width="100"
            visible={true}
            ariaLabel="falling-circles-loading"
            /></div>}

      {/* Course Card *
      <div className="w-full max-w-sm bg-gray-100 rounded-xl shadow-sm p-4">
        <img
          src="/image 6.png"
          alt="Course"
          className="w-full h-40 object-cover rounded-lg mb-4"
        />
        <p className="text-sm text-gray-500 mb-1">01/05/25 - <span className="text-green-600">New</span></p>
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Graphic Design</h2>
        
        {/* Progress Bar *
        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mb-1">
          <div className="bg-green-500 h-full w-[10%]"></div>
        </div>
        <p className="text-sm text-gray-500 text-right">10%</p>
      </div>*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(courses) &&
          courses.map((course) => (
            <CourseCard
              key={course._id}
              title={course.title}
              image={course.courseImage || "/image 6.png"}
              description={course.description}
              id={course._id}
              view={view}
              onClick={() => view === "other" && setSelectedCourse(course)}
            />
          ))}
          {selectedCourse && view === "other" && (
            <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl border-2 border-green-500 py-10 px-20 w-[90%] max-w-lg relative">
              <button
                className="absolute top-2 left-4 text-3xl text-red-500 hover:text-gray-800"
                onClick={() => setSelectedCourse(null)}
              >
                &times;
              </button>
              <img
                src={selectedCourse.courseImage}
                alt="Course"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{selectedCourse.title}</h2>
              <p className="text-sm text-gray-700 mb-4">{selectedCourse.description}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-3xl hover:bg-green-600"
                onClick={() => {
                  const token = sessionStorage.getItem("token"); // Use sessionStorage
                  axios
                    .post(
                      `https://skillitgh-lms-backend.onrender.com/api/v1/dashboard/${selectedCourse._id}/register`, 
                      {}, 
                      {
                        withCredentials: true,
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                      }
                    )
                    .then((response) => {
                      toast.success(response.data.message || "Registration successful!");

                      setCourses((prevCourses) =>
                        prevCourses.filter((course) => course._id !== selectedCourse._id)
                      );
                      setShowSuccessModal(true);
                      setTimeout(() => {
                         setSelectedCourse(null);
                        setShowSuccessModal(false);
                      }, 3000); 
                      setTimeout(() => {setView("enrolled");}, 3100);
                    })
                    .catch((err) => {
                      const backendMessage = err.response?.data?.message || "Registration failed.";
                      toast.error(backendMessage);
                      console.error(err);
                    });
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}
        {showSuccessModal && (
          <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-6 w-[90%] max-w-lg h-[50%] relative text-center">
              <button
                className="absolute top-3 left-4 text-4xl text-red-500 hover:text-gray-800"
                onClick={() => setShowSuccessModal(false)}
              >
                &times;
              </button>
              <div className="text-2xl mb-2 flex justify-center items-center">
                <img 
                src="/image 8.svg" 
                alt="congrats" />
              </div> 
              <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
              <p className="text-sm text-gray-700">
                You have successfully registered for <strong>{selectedCourse?.title}</strong>.
              </p>
              <p className="text-sm text-gray-500 mt-2">Stay tuned</p>
            </div>
          </div>
        )}

      </div>

      {!loading && courses.length === 0 && (
        <p className="text-center text-gray-500 mt-10">{errorMessage}</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default CoursesDashboard;
