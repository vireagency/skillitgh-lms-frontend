import React from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
    const location = useLocation();
    const { courses, reason } = location.state || { courses: "", reason: "" };

    const navigate = useNavigate();
    const handleSubmit = () => {
        navigate('/dashboard/workshops'); // Navigate to the dashboard or any other route
    };

    return (
        <div className="flex items-center justify-center h-screen my-bg">
            <div className="bg-white p-12 rounded-3xl text-lg shadow-xl w-[35%] max-w-full h-[65%] max-h-full justify-center items-center text-center">
                <div className="text-8xl mb-4">
                <img src="/image 7.png" alt="Success" className="w-20 h-20 mx-auto mb-10" />
                </div>
                <h1 className="text-3xl font-semibold mb-2">Congratulations!</h1>
                <div className='place-items-stretch text-2xl'><p>You have successfully registered</p><p> for SkillitGh <strong className="font-semibold">{courses}</strong></p><p className='mb-10'> course </p></div>
                <button type='submit' onClick={handleSubmit} className="bg-green-500 text-white py-2 w-full px-4 mt-2 rounded-full hover:bg-green-600">
                    Dashboard
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccess;