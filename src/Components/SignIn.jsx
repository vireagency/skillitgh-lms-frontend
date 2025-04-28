import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signing In:", formData);
    navigate("/choosepath");
  };

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      {/* Left Image Side */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative shadow-[0_0_30px_rgba(255,230,141,0.8)]">
        <img
          src="./About1.jpg"
          alt="Sign up visual"
          className="w-full h-5/6 object-cover"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-stretch justify-start p-10 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-normal font-montserrat text-gray-800 mb-8">Sign In</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-sm font-semibold font-montserrat text-gray-700">Email</label>
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
              <label className="text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                required
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 rounded-full hover:bg-emerald-600 font-semibold transition duration-200"
            >
              Sign In
            </button>
          </form>

          <p className="text-sm mt-6">
            Don't have an account?
            <Link to="/signup" className="text-blue-600 ml-1 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
