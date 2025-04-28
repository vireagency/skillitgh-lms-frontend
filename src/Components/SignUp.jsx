import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../index.css';

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Signing Up:', formData);
    navigate("/choosepath");
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2  bg-white shadow-2xl">
      
      {/* Left Image Side */}
      <div className="h-2/3 w-full relative shadow-[0_0_30px_rgba(255,230,141,0.8)]  ">
        <img
          src="./About1.jpg"
          alt="Sign up visual"
          className="w-full h-full object-cover rounded-br-3xl"
        />
      </div>


      {/* Right Form Side */}
      <div className="w-full md:w-2/3 h-1/2 md:h-full flex items-stretch justify-start p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-normal font-montserrat text-gray-800 mb-8">Register</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="John"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Doe"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                  required
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Your Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                required
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="********"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="form-checkbox text-emerald-500" required />
              <span>
                I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> of SkillitGh
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-full font-semibold"
            >
              Sign Up
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?
            <Link to="/signin" className="text-blue-600 ml-1 underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
