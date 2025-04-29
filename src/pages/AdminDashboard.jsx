// AdminDashboard.jsx
import React from 'react';

const AdminDashboard = () => {
    // Example data for registered users and courses
    const registrations = [
        { user: 'User 1', courses: ['Course 1'], workshops: ['Workshop 1'] },
        { user: 'User 2', courses: ['Course 2'], workshops: [] },
    ];

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
            <h3 className="text-xl mb-2">Registered Users</h3>
            <ul className="list-disc pl-5">
                {registrations.map((registration, index) => (
                    <li key={index}>
                        {registration.user}: Courses - {registration.courses.join(', ')}, Workshops - {registration.workshops.join(', ')}
                    </li>
                ))}
            </ul>
            {/* Add functionality for adding/editing/removing courses here */}
        </div>
    );
};

export default AdminDashboard;