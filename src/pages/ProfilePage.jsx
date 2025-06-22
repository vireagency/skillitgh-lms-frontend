import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../index.css";
import { FallingLines } from 'react-loader-spinner';
import { Pen } from 'lucide-react';

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get(
          'https://skillitgh-lms-backend.onrender.com/api/v1/dashboard/profile',
          {
            withCredentials: true,
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        const data = response.data.user;
        setProfile(data);
        setFormData(data);
        console.log('Fetched profile:', data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      }
    };

    fetchProfile();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const formDataToSend = new FormData();

      // Append form data
      formDataToSend.append("firstName", formData.firstName);
      formDataToSend.append("lastName", formData.lastName);
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("location", formData.location);

      // Append image file if selected
      if (imageFile) {
        formDataToSend.append("userImage", imageFile);
      }

      const token = sessionStorage.getItem("token");
      const response = await axios.put(
        "https://skillitgh-lms-backend.onrender.com/api/v1/dashboard/profile",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          withCredentials: true,
        }
      );

      setProfile(response.data.user);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred. Try again.";
      toast.error(msg, {
        position: "top-right",
        autoClose: 2500,
      });
      console.error("Error updating profile:", error);
    }
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
          <h1 className="text-3xl font-bold font-montserrat text-[#3E584C] text-center md:text-left">Profile</h1>
          <p className="text-sm text-gray-500">Manage your profile information</p>
        </div>
        
      </div>
      <div className="flex items-center justify-between space-x-4 mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative w-16 h-16">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : profile.userImage}
              alt="avatar"
              className="w-16 h-16 rounded-full object-cover border"
            />

            {isEditing && (
              <>
                <label
                  htmlFor="profileImageInput"
                  className="absolute bottom-0 right-0 p-1 rounded-full cursor-pointer hover:bg-green-700"
                >
                  <Pen className="text-white text-xs" />
                </label>
                <input
                  id="profileImageInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="hidden"
                />
              </>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold">{profile.firstName}</h2>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
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
              <input name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" placeholder='Enter your active phone number'/>
            </div>
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full p-2 border rounded">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input name="country" type="text" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Location</label>
              <input name="location" type="text" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded" placeholder='Enter your current location' />
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
            <p><strong>Phone:</strong> {profile.phoneNumber}</p>
            <p><strong>Gender:</strong> {profile.gender}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Location:</strong> {profile.location}</p>            
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
