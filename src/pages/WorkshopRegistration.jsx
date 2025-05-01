// WorkshopRegistration.jsx
import React, { useState } from 'react';

const WorkshopRegistration = () => {
    const [selectedWorkshops, setSelectedWorkshops] = useState([]);
    const [feedback, setFeedback] = useState('');

    const workshops = ['Workshop 1', 'Workshop 2', 'Workshop 3']; // Example workshops

    const handleSelectWorkshop = (workshop) => {
        setSelectedWorkshops((prev) => [...prev, workshop]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Implement workshop registration logic here
        console.log('Registered workshops:', selectedWorkshops, 'Feedback:', feedback);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Select Workshops</h2>
            {workshops.map((workshop) => (
                <div key={workshop} className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        onChange={() => handleSelectWorkshop(workshop)}
                        className="mr-2"
                    />
                    <label>{workshop}</label>
                </div>
            ))}
            <textarea
                placeholder="Feedback or reason for attending"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                Register
            </button>
        </form>
    );
};

export default WorkshopRegistration;