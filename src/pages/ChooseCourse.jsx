import React, { useState } from 'react';
import "../index.css";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChooseCourse = () => {
    const navigate = useNavigate();
    const path = {
        route: "/registrationsuccess"
    };
    const [selectedCourse, setSelectedCourse] = useState('Graphic Design');
    const [reason, setReason] = useState('');

    /*
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://skillitgh-lms.onrender.com/api/v1/courses/register', {
            course: selectedCourse,
            reason: reason
        })
        
        console.log("Selected Course:", selectedCourse);
        console.log("Reason:", reason);
    
        navigate('/registrationsuccess', {
            state: { courses: selectedCourse, reason: reason }
        });
    };*/

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const token = sessionStorage.getItem("token"); // Use sessionStorage
        if (!token) {
            toast("Please sign in first.");
            return;
        }
    
        try {
            const response = await axios.post(
                'https://skillitgh-lms.onrender.com/api/v1/courses/register',
                {
                    courseTitle: selectedCourse,
                    messageBody: reason
                },
                {
                    withCredentials: true
                }
            );
    
            console.log("Registration success:", response.data);
    
            navigate('/registrationsuccess', {
                state: { courses: selectedCourse, reason: reason }
            });
        } catch (error) {
            console.error("Registration error:", error);
            toast(error.response?.data?.message || "Failed to register.");
        }
    };
    
    

    return (
        <div className="flex items-center justify-center h-screen my-bg">
            <div className="bg-white p-12 rounded-3xl shadow-xl text-center w-[35%] max-w-full">
                <h1 className="text-3xl font-semibold text-gray-700 mb-10">Choose a Course</h1>
                <form onSubmit={handleSubmit} className="flex flex-col">
                    <label className="text-left mb-2 font-normal font-montserrat" htmlFor="course-select">Select Course:</label>
                    <select 
                        id="course-select" 
                        value={selectedCourse} 
                        onChange={(e) => setSelectedCourse(e.target.value)} 
                        className="border border-gray-300 p-2 rounded mb-4"
                    >
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Web Development">Web Development</option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Microsoft Office">Microsoft Office</option>
                    </select>

                    <label className="text-left mb-2" htmlFor="reason">Reason for choosing {selectedCourse}:</label>
                    <textarea 
                        id="reason" 
                        value={reason} 
                        onChange={(e) => setReason(e.target.value)} 
                        placeholder="Write here..."
                        className="border border-gray-300 p-2 font-montserrat rounded mb-4"
                        rows={4}
                    />

                    <button type="submit" onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600">
                        Submit
                    </button>

                </form>
            </div>
        </div>
    );
};

export default ChooseCourse;