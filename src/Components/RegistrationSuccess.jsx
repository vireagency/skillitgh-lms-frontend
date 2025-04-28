// src/components/RegistrationSuccess.jsx
import React from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';

const RegistrationSuccess = () => {
    const location = useLocation();
    const { courses, reason } = location.state || { courses: [], reason: '' };
    return (
        <div className="flex items-center justify-center h-screen bg-sky-100">
            <div className="bg-white p-12 rounded-3xl shadow-xl w-100 aspect-auto justify-center items-center text-center">
                <div className="text-8xl mb-4">🎉</div>
                <h1 className="text-xl font-semibold mb-2">Congratulations!</h1>
                <p className="mb-4">You have successfully registered for SkillitGh {courses} course</p>
                <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                    Dashboard
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccess;