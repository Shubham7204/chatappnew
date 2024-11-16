import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const [setAuthUser] = useAuth();

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
          window.location.href = '/'
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data)
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
        className="w-full max-w-md p-6 space-y-6 bg-white shadow-lg rounded-lg sm:p-8"
      >
        <h1 className="text-3xl font-bold text-purple-700 text-center">Chat App</h1>
        <h2 className="text-lg font-semibold text-gray-700 text-center">Login to your Account</h2>

        {/* Email */}
        <label className="block">
          <span className="text-sm font-semibold text-gray-600">Email</span>
          <input
            type="email"
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="text-red-500 text-sm font-semibold">Email is required</span>
          )}
        </label>

        {/* Password */}
        <label className="block">
          <span className="text-sm font-semibold text-gray-600">Password</span>
          <input
            type="password"
            className="w-full mt-1 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="text-red-500 text-sm font-semibold">Password is required</span>
          )}
        </label>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-3 text-white bg-purple-600 hover:bg-purple-700 rounded-md font-semibold transition duration-200"
          >
            Login
          </button>
        </div>

        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-600 font-semibold hover:underline">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
