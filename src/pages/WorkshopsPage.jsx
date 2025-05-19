import React, { useEffect, useState } from "react";
import axios from "axios";
import WorkshopCard from "../Components/WorkshopCard";
import "../index.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { FallingLines } from "react-loader-spinner";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";

const WorkshopsPage = () => {
  // Use sessionStorage instead of localStorage
  const currentUser = JSON.parse(sessionStorage.getItem("user"));
  const currentUserId = currentUser?._id;
  //const isRegistered = workshop.attendees.includes(currentUserId);

  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState("upcoming"); 
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState("Upcoming");
  const [selectedWorkshop, setSelectedWorkshop] = useState(null); 
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showUnregisterModal, setShowUnregisterModal] = useState(false);
  const [unregisterWorkshop, setUnregisterWorkshop] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchWorkshops = () => {
    setLoading(true);
    setErrorMessage(""); 
    setStatus(view === "upcoming" ? "Upcoming" : "Previous"); // Set status based on view

    const url =
      view === "upcoming"
        ? `https://skillitgh-lms.onrender.com/api/v1/workshops/upcoming?page=${page}`
        : `https://skillitgh-lms.onrender.com/api/v1/workshops/previous?page=${page}`;

    axios
      .get(url, 
        {
          withCredentials: true
        }
      )
      .then((response) => {
        const data = response.data.workshops;
        if (Array.isArray(data) && data.length > 0) {
          const enhancedData = data.map((workshop) => ({
            ...workshop,
            isRegistered: workshop.attendees?.includes(currentUserId),
          }));
          setWorkshops(enhancedData);
          setTotalPages(response.data.totalPages || 1);
          console.log(response.data);
          toast.success(response.data.message || "Workshops loaded!");
        } else {
          setWorkshops([]);
          setTotalPages(1);
        }
      })
      .catch((err) => {
        setWorkshops([]);
        setTotalPages(1);
        const backendMessage = err.response?.data?.message || "Failed to load workshops.";
        setErrorMessage(backendMessage);
        console.error(err);
      })      
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchWorkshops();
    // eslint-disable-next-line
  }, [view, page]);

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

      {loading && <div className='flex justify-center items-center'><FallingLines
          color="#4fa94d"
          width="100"
          visible={true}
          ariaLabel="falling-circles-loading"
          /></div>
      }

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(workshops) &&
          workshops.map((workshop) => {
            return (
            <WorkshopCard
              key={workshop._id}
              title={workshop.title}
              date={new Date(workshop.date).toLocaleDateString()}
              status={status}
              image={workshop.workshopImage || "/image 6.png"}
              id={workshop._id}
              price={workshop.price}
              view={view}
              isRegistered={view === "upcoming" ? workshop.isRegistered : undefined}
              onClick={() => {
                if (view === "upcoming") {
                  if (workshop.isRegistered) {
                    setUnregisterWorkshop(workshop);
                    setShowUnregisterModal(true);
                  } else {
                    setSelectedWorkshop(workshop);
                  }
                }
              }}
            />);
          })}
        {selectedWorkshop && view === "upcoming" && (
          <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl border-2 border-green-500 py-10 px-20 w-[90%] max-w-lg relative">
              <button
                className="absolute top-2 left-4 text-3xl text-red-500 hover:text-gray-800"
                onClick={() => setSelectedWorkshop(null)}
              >
                &times;
              </button>
              <img
                src={selectedWorkshop.workshopImage}
                alt="Workshop"
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <p className="text-sm text-black mb-2 ">
                {new Date(selectedWorkshop.date).toLocaleDateString()}&nbsp;<strong>&bull; {status}&nbsp;</strong><span className="ml-20"><b>Price: </b>{selectedWorkshop.price}</span>
              </p>
              <h2 className="text-xl font-semibold my-4">{selectedWorkshop.title}</h2>
              <p className="text-semibold text-gray-700 mb-4">{selectedWorkshop.description}</p>
              <p className="text-semibold text-gray-700 mb-2"><b>Duration: </b>{selectedWorkshop.duration}</p>
              <p className="text-semibold text-gray-700 mb-2"><b>Facilitator: </b>{selectedWorkshop.facilitator.name}</p>
              <p className="text-semibold text-gray-700 mb-2"><b>Email: </b>{selectedWorkshop.facilitator.email}</p>
              <p className="text-semibold text-gray-700 mb-2"><b>Location: </b>{selectedWorkshop.location}</p>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600"
                onClick={() => {
                  const token = sessionStorage.getItem("token");
                  axios
                    .post(
                      `https://skillitgh-lms.onrender.com/api/v1/workshops/${selectedWorkshop._id}/register`, 
                      {}, 
                      {
                        withCredentials: true,
                        headers: token ? { Authorization: `Bearer ${token}` } : {},
                      }
                    )
                    .then((response) => {
                      toast.success(response.data.message || "Registration successful!");
                      setWorkshops((prevWorkshops) =>
                        prevWorkshops.map((workshop) =>
                          workshop._id === selectedWorkshop._id
                            ? { ...workshop, isRegistered: true }
                            : workshop
                        )
                      );                   

                      setShowSuccessModal(true);
                      setTimeout(() => {
                        setSelectedWorkshop(null);
                        setShowSuccessModal(false);
                      }, 3000); 
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

        {showSuccessModal &&  (
          <div className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl border-2 border-green-500 p-6 w-[90%] max-w-lg h-[50%] relative text-center">
              <button
                className="absolute top-3 left-4 text-4xl text-red-500 hover:text-gray-800"
                onClick={() => setShowSuccessModal(false)}
              >
                &times;
              </button>
              <div className="text-2xl mb-2 flex justify-center items-center">
                <img
                 src="/image 8.svg" 
                 alt="congratulations" />
                 </div> 
              <h2 className="text-xl font-semibold mb-2">Congratulations!</h2>
              <p className="text-sm text-gray-700">
                You have successfully registered for <strong>{selectedWorkshop.title}</strong>.
              </p>
              <p className="text-sm text-gray-500 mt-2">Stay tuned</p>
            </div>
          </div>
        )}

        {showUnregisterModal && unregisterWorkshop && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl border-2 border-red-500 py-10 px-10 w-[90%] max-w-md relative text-center">
              <h2 className="text-xl font-semibold mb-4">Confirm Unregistration</h2>
              <p className="text-sm text-gray-700 mb-6">
                Are you sure you want to unregister from <strong>{unregisterWorkshop.title}</strong>?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  className="bg-gray-300 px-4 py-2 rounded-full text-sm"
                  onClick={() => {
                    setShowUnregisterModal(false);
                    setUnregisterWorkshop(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-full text-sm hover:bg-red-600"
                  onClick={() => {
                    axios
                      .post(
                        `https://skillitgh-lms.onrender.com/api/v1/workshops/${unregisterWorkshop._id}/unregister`,
                        {},
                        {
                          withCredentials: true
                        }
                      )
                      .then(() => {
                        toast.success("Successfully unregistered!");
                        setWorkshops((prev) =>
                          prev.map((w) =>
                            w._id === unregisterWorkshop._id ? { ...w, isRegistered: false } : w
                          )
                        );
                        setShowUnregisterModal(false);
                        setUnregisterWorkshop(null);
                      })
                      .catch((err) => {
                        toast.error("Failed to unregister");
                        console.error(err);
                      });
                  }}
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}


      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={page === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, idx) => (
                <PaginationItem key={idx}>
                  <PaginationLink
                    isActive={page === idx + 1}
                    onClick={() => setPage(idx + 1)}
                  >
                    {idx + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                  className={page === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {!loading && workshops.length === 0 && (
        <p className="text-center text-gray-500 mt-10">{errorMessage}</p>
      )}

      <ToastContainer />
    </div>
  );
};

export default WorkshopsPage;
