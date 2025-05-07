/*import WorkshopCard from "../Components/WorkshopCard";
import React from "react";
import "../index.css"; 
// import { useNavigate } from "react-router-dom";

/*const workshops = Array(6).fill({
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

export default WorkshopsPage;*

import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkshopCard from "../Components/WorkshopCard";
import "../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://skillitgh-lms.onrender.com/api/v1/workshops/upcoming") // Replace with your actual backend endpoint
      .then((response) => {
        setWorkshops(response.data.data);
        console.log(response.data);
        toast.success(response.data.message || "Workshops loaded successfully!");
      })
      .catch((err) => {
        toast.error("Failed to load workshops. Please try again.");
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="px-4 md:px-20 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Workshops</h1>
        <p className="text-sm text-gray-500">
          Register for any upcoming workshop you are interested in attending
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button className="bg-green-500 text-white px-4 py-2 rounded-full font-medium">
            Upcoming Workshops
          </button>
          <button className="text-gray-700 px-4 py-2 rounded-full font-medium">
            Previous Workshops
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading workshops...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(workshops) &&
        workshops.map((workshop) => (
          <WorkshopCard key={workshop._id}
            title={workshop.title}
            date={new Date(workshop.date).toLocaleDateString()}
            image={workshop.workshopImage || "/image 6.png"} 
            description={workshop.description}
            //facilitator={workshop.facilitator}
            //location={workshop.location}
            id={workshop._id} // Pass the workshop ID to the card
          />
        ))}
      </div>
    </div>
  );
};

export default WorkshopsPage;
*/

import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkshopCard from "../Components/WorkshopCard";
import "../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const WorkshopsPage = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("upcoming"); 
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const openModal = (workshop) => {
    setSelectedWorkshop(workshop);
  };

  const closeModal = () => {
    setSelectedWorkshop(null);
  };

  const fetchWorkshops = () => {
    setLoading(true);
    setErrorMessage(""); 
    setStatus(view === "upcoming" ? "Upcoming" : "Previous"); // Set status based on view

    const token = localStorage.getItem("token");
    if (!token) {
      toast("Please sign in first.");
      return;
    }
    
    const url =
    view === "upcoming"
    ? "https://skillitgh-lms.onrender.com/api/v1/workshops/upcoming"
    : "https://skillitgh-lms.onrender.com/api/v1/workshops/previous";

    axios
    .get(url, 
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => { /*
      setWorkshops(response.data.data);
      console.log(response.data.data);
      console.log(response.data);
      toast.success(response.data.message || "Workshops loaded!");*/
      const data = response.data.workshops;
      if (Array.isArray(data) && data.length > 0) {
        setWorkshops(data);
        toast.success(response.data.message || "Workshops loaded!");
      } /*else {
        setWorkshops([]); // ✅ Clear workshops
        setErrorMessage(response.data.message || "No workshops available.");
      }*/
    })
    .catch((err) => {
      setWorkshops([]); 
      const backendMessage = err.response?.data?.message || "Failed to load workshops.";
      setErrorMessage(backendMessage);
      console.error(err);
      /*
      const backendMessage = err.response?.data?.message || "Failed to load workshops.";
      setErrorMessage(backendMessage);
      toast.error(backendMessage);
      console.error(err);*/
    })      
    .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkshops();
  }, [view]);

  return (
    <div className="px-4 md:px-20 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">Workshops</h1>
        <p className="text-sm text-gray-500">
          Register for any workshop you are interested in attending
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            onClick={() => setView("upcoming")}
            className={`px-4 py-2 rounded-full font-medium ${
              view === "upcoming"
                ? "bg-green-500 text-white"
                : "text-gray-700 bg-gray-200"
            }`}
          >
            Upcoming Workshops
          </button>
          <button
            onClick={() => setView("previous")}
            className={`px-4 py-2 rounded-full font-medium ${
              view === "previous"
                ? "bg-green-500 text-white"
                : "text-gray-700 bg-gray-200"
            }`}
          >
            Previous Workshops
          </button>
        </div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading workshops...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(workshops) &&
          workshops.map((workshop) => (
            <WorkshopCard
              key={workshop._id}
              title={workshop.title}
              date={new Date(workshop.date).toLocaleDateString()}
              status={status}
              image={workshop.workshopImage || "/image 6.png"}
              description={workshop.description}
              id={workshop._id}
              view={view}
              onClick={() => view === "upcoming" && setSelectedWorkshop(workshop)}
            />
        ))}
        {selectedWorkshop && view === "upcoming" && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative">
              <button
                className="absolute top-2 right-4 text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedWorkshop(null)}
              >
                &times;
              </button>
              <img
                src={selectedWorkshop.workshopImage}
                alt="Workshop"
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{selectedWorkshop.title}</h2>
              <p className="text-sm text-gray-700 mb-4">{selectedWorkshop.description}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => {
                  axios
                    .post(
                      `https://skillitgh-lms.onrender.com/api/v1/workshops/${selectedWorkshop._id}/register`, 
                      {}, 
                      {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem("token")}`
                        }
                      }
                    )
                    .then((response) => {
                      toast.success(response.data.message || "Registration successful!");
                    })
                    .catch((err) => {
                      const backendMessage = err.response?.data?.message || "Registration failed.";
                      toast.error(backendMessage);
                      console.error(err);
                    });
                  setSelectedWorkshop(null);
                  setShowSuccessModal(true);
                }}
              >
                Register
              </button>
            </div>
          </div>
        )}

        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-[90%] max-w-md relative text-center">
              <button
                className="absolute top-3 right-4 text-gray-500 hover:text-gray-800"
                onClick={() => setShowSuccessModal(false)}
              >
                &times;
              </button>
              <div className="text-4xl mb-2">🎉</div> {/* or use an image/icon */}
              <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
              <p className="text-sm text-gray-700">
                You have successfully registered for <strong>{selectedWorkshop?.title}</strong>.
              </p>
              <p className="text-sm text-gray-500 mt-2">Stay tuned</p>
            </div>
          </div>
        )}


      </div>

      {!loading && workshops.length === 0 && (
        <p className="text-center text-gray-500 mt-10">{errorMessage}</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default WorkshopsPage;
