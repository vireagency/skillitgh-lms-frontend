import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";
import { FallingLines } from 'react-loader-spinner';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
        const response = await axios.get('https://skillitgh-lms.onrender.com/api/v1/dashboard/profile');
        const data = response.data.user;
      setProfile(data);
      setFormData(data);
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    axios.put('https://skillitgh-lms.onrender.com/api/v1/dashboard/profile', formData)
      .then((response) => {
        console.log('Profile updated:', response.data);
        setProfile(response.data.profile);
        setIsEditing(false);
      })
      .catch((error) => {
        const msg = error.response?.data?.message || "An error occurred. Try again.";
        toast.error(msg, {
            position: "top-right",
            autoClose: 2500,
        });
        console.error('Error updating profile:', error);
      });
    setProfile(formData);
    setIsEditing(false);
    console.log('Saved profile:', formData);
  };

  if (!profile) return <div className='flex justify-center items-center'><FallingLines
    color="#4fa94d"
    width="100"
    visible={true}
    ariaLabel="falling-circles-loading"
    /></div>;

  return (
    <div className="p-10">
      <div className="flex justify-center items-center mb-6">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold font-[Playfair] text-[#3E584C] text-center md:text-left">Profile</h1>
          <p className="text-sm text-gray-500">Manage your profile information</p>
        </div>
        
      </div>
      <div className="flex items-center justify-between space-x-4 mb-6">
        <div className='flex'>
          <img src={profile.userImage} alt="avatar" className="w-16 h-16 rounded-full" />
          <span>
            <h2 className="text-lg font-semibold">{profile.firstName}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </span>
        </div>
        {!isEditing && (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>

      {isEditing ? (
        <>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium">First Name</label>
              <input name="firstName" type="text" value={formData.firstName} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Last Name</label>
              <input name="lastName" type="text" value={formData.lastName} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <input name="phone" type="text" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="country" type="text" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input name="location" type="text" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
          
          </div>
          <div className="mt-6 flex gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleSave}>Save Changes</button>
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-4 mt-6">
            <p><strong>First Name:</strong> {profile.firstName}</p>
            <p><strong>Last Name:</strong> {profile.lastName}</p>
            <p><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Location:</strong> {profile.location}</p>            
          </div>
          {/* <div className="flex space-x-10 mt-10">
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-purple-500 stroke-current"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${profile.attendanceRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                  {profile.attendanceRate}%
                </div>
              </div>
              <p className="mt-2">Attendance Rate</p>
            </div>
            <div className="text-center">
              <div className="relative w-24 h-24 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-red-400 stroke-current"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${profile.completionRate}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-xl font-semibold">
                  {profile.completionRate}%
                </div>
              </div>
              <p className="mt-2">Completion Rate</p>
            </div>
          </div> */}
        </>
      )}
    </div>
  );
};

export default ProfilePage;
