import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { Eye, EyeOff } from 'lucide-react';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {

      const response = await axios.post("https://skillitgh-lms.onrender.com/api/v1/auth/register", data, { timeout: 5000 });
          
      toast.success("Successfully registered!", {
        position: "top-right",
        autoClose: 2000,
      });

      console.log("Response:", response.data);
      console.log("formData:", data);

      setTimeout(() => {navigate("/signin");}, 2500); 

    } catch (error) {
      const msg =
        error.response?.data?.message || "An error occurred. Try again.";
      toast.error(msg, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 bg-white ">
      
      {/* Left Image Side */}
      <div className="h-full w-full ">
        <img
          src="./image 23.png"
          alt="Sign up visual"
          className="w-full h-full rounded-br-3xl rounded-r-3xl object-cover "
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-2/3 min-h-screen md:h-full flex items-stretch justify-center pt-32 pl-32 bg-white">
        <div className="w-full max-w-md ">
          <h2 className="text-4xl font-normal font-montserrat text-gray-800 mb-8">Register</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  placeholder="John"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                />
                {errors.firstName && <span className="text-red-500 text-sm">First name is required</span>}
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  placeholder="Doe"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                />
                {errors.lastName && <span className="text-red-500 text-sm">Last name is required</span>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="example@gmail.com"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
              />
              {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Your Password</label>
              <div className="relative">
                <input
                  {...register("password", {
                    required: true,
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
                      message: "Password must be at least 6 characters, include upper & lower case letters, and a symbol."
                    }
                  })}
                  
                  type={showPassword ? "text" : "password"}                  
                  placeholder="********"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                />

                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-2 top-5 text-sm text-gray-500 focus:outline-none"
                  >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message || "Password is required"}
                </span>
              )}

            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="relative">
                <input
                  {...register("confirmPassword", { required: true, validate: (value) => value === password || "Paaswords do not match"})}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-2 top-5 text-sm text-gray-500 focus:outline-none"
                >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.confirmPassword && <span className="text-red-500 text-sm">Please confirm your password</span>}
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <input type="checkbox" className="form-checkbox text-emerald-500" required />
              <span>
                I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> of SkillitGh
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-full font-semibold"
            >
              {isSubmitting ? "Signing up..." : "Sign Up"}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?
            <Link to="/signin" className="text-blue-600 ml-1 underline">Sign In</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
