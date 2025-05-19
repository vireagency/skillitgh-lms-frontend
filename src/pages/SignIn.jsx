import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import { Eye, EyeOff } from 'lucide-react';


export default function SignIn() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm();

  const onSubmit = async (data) => {
    setErrorMessage("");
    try {
      const res = await axios.post(
        "https://skillitgh-lms.onrender.com/api/v1/auth/signin",
        data,
        {
          withCredentials: true,
          timeout: 5000,
        }
      );

      const { token, user } = res.data;

      if (token) {
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(user)); // Save user data

        toast.success("Successfully logged in!", { autoClose: 2000 });

        setTimeout(() => {
          const hasCourses = user?.courses?.length > 0;
          const hasWorkshops = user?.workshops?.length > 0;
          const isAdmin = user?.role === "admin";

          if (isAdmin) {
            navigate("/admin-dashboard");
          } else if (hasCourses) {
            navigate("/dashboard");
          } else if (hasWorkshops) {
            navigate("/dashboard/workshops");
          } else {
            navigate("/choosepath");
          }
        }, 2500);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "An error occurred. Try again.";
      setErrorMessage(msg);
      console.error("Error during sign-in:", error);
      toast.error(msg, { autoClose: 2000 });
    }
  };

 
    // const onSubmit = async (data) => {
    //   setErrorMessage("");
    //   try {
    //     const res = await axios.post(
    //       "https://skillitgh-lms.onrender.com/api/v1/auth/signin",
    //       data,
    //       { timeout: 5000 }
    //     );
    
    //     const { token, user } = res.data;
    
    //     if (token) {
    //       localStorage.setItem("token", token);
    //       localStorage.setItem("user", JSON.stringify(user)); // Save user data
    
    //       toast.success("Successfully logged in!", { autoClose: 2000 });
    
    //       // Conditional redirect based on registration
    //       setTimeout(() => {
    //         const hasCourses = user?.courses?.length > 0;
    //         const hasWorkshops = user?.workshops?.length > 0;
    //         const isAdmin = user?.role === "admin";

    //         if (isAdmin) {
    //           navigate("/admin-dashboard");
    //         } else if (hasCourses) {
    //           navigate("/dashboard");
    //         } else if (hasWorkshops) {
    //           navigate("/dashboard/workshops");
    //         } else {
    //           navigate("/choosepath");
    //         }
    //       }, 2500);
    //     }
    //   } catch (error) {
    //     const msg = error.response?.data?.message || "An error occurred. Try again.";
    //     setErrorMessage(msg);
    //     console.error("Error during sign-in:", error);
    //     toast.error(msg, { autoClose: 2000 });
    //   }
    // };
    
    

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      {/* Left Image Side */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full relative ">
        <img
          src="./About1.jpg"
          alt="Sign up visual"
          className="w-full h-full rounded-br-3xl rounded-r-3xl object-cover"
        />
      </div>

      {/* Right Form Side */}
      <div className="w-full md:w-1/2 h-1/2 md:h-full flex items-between justify-start pt-52 px-52 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-medium font-montserrat text-gray-800 mb-8">Sign In</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="text-sm font-semibold font-montserrat text-gray-700">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="example@gmail.com"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
              />
              {errors.email &&
                <span className="text-red-500 text-sm">
                  Email is required
                </span>
              }
            </div>
            <div>           
              
              <label className="text-sm font-medium text-gray-700">Your Password</label>

              <div className="relative">
                <input
                  {...register("password", { required: true })}
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2 pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {errors.password && (
                <span className="text-red-500 text-sm">Password is required</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 text-white py-2 rounded-full hover:bg-emerald-600 font-semibold transition duration-200"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm mt-6">
            Don't have an account?
            <Link to="/" className="text-blue-600 ml-1 underline">
              Register
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
