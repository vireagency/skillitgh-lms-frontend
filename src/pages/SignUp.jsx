import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("https://skillitgh-lms.onrender.com/api/v1/auth/register", data, { timeout: 5000 });
      console.log("Response:", response.data);
      console.log("formData:", data);
      navigate("/choosepath");
      
      toast.success("Successfully registered!", {
        position: "top-right",
        autoClose: 10000,
      });

    } catch (error) {
     const msg =
        error.response?.data?.message || "An error occurred. Try again.";
      toast.error(msg, {
        position: "top-right",
        autoClose: 10000,
      });
    }
  };



  return (
    <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 bg-white ">
      
      {/* Left Image Side */}
      <div className="h-2/3 w-full relative ">
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  {...register("firstName", { required: true })}
                  placeholder="John"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                />
                {errors.firstName && <p className="text-red-500 text-xs">First name is required</p>}
              </div>
              <div className="w-1/2">
                <label className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  {...register("lastName", { required: true })}
                  placeholder="Doe"
                  className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
                />
                {errors.lastName && <p className="text-red-500 text-xs">Last name is required</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i
                })}
                placeholder="example@gmail.com"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
              />
              {errors.email && <p className="text-red-500 text-xs">Valid email is required</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Your Password</label>
              <input
                type="password"
                {...register("password", { required: true, minLength: 6 })}
                placeholder="********"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
              />
              {errors.password && <p className="text-red-500 text-xs">Minimum 6 characters</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === password || "Passwords do not match"
                })}
                placeholder="********"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-emerald-500 py-2"
              />
              {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
            </div>

            <div className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                {...register("terms", { required: true })}
                className="form-checkbox text-emerald-500"
              />
              <span>
                I agree to the <a href="#" className="text-blue-600 underline">Terms & Conditions</a> of SkillitGh
              </span>
              {errors.terms && <p className="text-red-500 text-xs ml-2">You must accept the terms</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-full font-semibold"
            >
              {isSubmitting ? "Signing Up..." : "Sign Up"}
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
