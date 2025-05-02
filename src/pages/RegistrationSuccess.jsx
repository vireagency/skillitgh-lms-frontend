import React from 'react';
import '../index.css';
import { useLocation } from 'react-router-dom';

const RegistrationSuccess = () => {
    const location = useLocation();
    const { courses} = location.state || { courses: []};
    return (
        <div className="flex items-center justify-center h-screen my-bg">
            <div className="bg-white p-12 rounded-3xl text-lg shadow-xl w-[35%] max-w-full h-[65%] max-h-full justify-center items-center text-center">
                <div className="text-8xl mb-4">
                <img src="/image 7.png" alt="Success" className="w-20 h-20 mx-auto mb-4" />
                </div>
                <h1 className="text-xl font-semibold mb-2">Congratulations!</h1>
                <div className='place-items-stretch'><p>You have successfully registered</p><p> for SkillitGh Graphic Design</p><p className='mb-20'> course </p></div>
                <button className="bg-green-500 text-white py-2 w-full px-4 mt-10 rounded-full hover:bg-green-600">
                    Dashboard
                </button>
            </div>
        </div>
    );
};

export default RegistrationSuccess;