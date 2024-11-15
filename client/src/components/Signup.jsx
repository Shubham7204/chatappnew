import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-5 space-y-4 bg-white shadow-lg rounded-lg sm:p-6"
      >
        <h1 className="text-3xl font-bold text-purple-700 text-center">Chat App</h1>
        <h2 className="text-lg font-semibold text-gray-700 text-center mb-4">Create a new Account</h2>

        {/* Fullname */}
        <label className="block mb-3">
          <span className="text-sm font-semibold text-gray-600">Full Name</span>
          <input
            type="text"
            className="w-full mt-1 p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your full name"
            {...register("fullname", { required: true })}
          />
          {errors.fullname && (
            <span className="text-red-500 text-sm font-semibold">Full name is required</span>
          )}
        </label>

        {/* Email */}
        <label className="block mb-3">
          <span className="text-sm font-semibold text-gray-600">Email</span>
          <input
            type="email"
            className="w-full mt-1 p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">Email is required</span>
          )}
        </label>

        {/* Password */}
        <label className="block mb-3">
          <span className="text-sm font-semibold text-gray-600">Password</span>
          <input
            type="password"
            className="w-full mt-1 p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">Password is required</span>
          )}
        </label>

        {/* Confirm Password */}
        <label className="block mb-3">
          <span className="text-sm font-semibold text-gray-600">Confirm Password</span>
          <input
            type="password"
            className="w-full mt-1 p-2.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Confirm your password"
            {...register("confirmPassword", { required: true, validate: validatePasswordMatch })}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm font-semibold">
              {errors.confirmPassword.message || "Confirm password is required"}
            </span>
          )}
        </label>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="w-full py-2.5 text-white bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition duration-200"
          >
            Sign Up
          </button>
        </div>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;