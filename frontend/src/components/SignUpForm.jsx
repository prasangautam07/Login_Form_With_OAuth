import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Signup } from "../api/authapi";
import toast from "react-hot-toast";

export const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !fullName || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const signupPromise = Signup({ username, email, fullName, password });

    toast.promise(signupPromise, {
      loading: "Signing up...",
      success: "Account created successfully!",
      error: (err) => err?.response?.data?.message || err?.message || "Error when fetching",
    });

    try {
      const response = await signupPromise;
      if (response.status === 201) {
        setError("");
        setUsername("");
        setEmail("");
        setFullName("");
        setPassword("");
      } else {
        setError(response.data?.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm sm:max-w-sm gap-4 p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <div className="flex justify-between w-full items-start">
        <div className="flex flex-col gap-1 flex-1">
          <h1 className="text-md font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground text-gray-600">
            Enter your details to create a new account.
          </p>
        </div>
        <Link
          to="/login"
          className="text-sm font-semibold hover:underline mt-1"
        >
          Login
        </Link>
      </div>

      <form
        className="flex flex-col gap-4 w-full"
        type="submit"
        onSubmit={handleSubmit}
      >
        <div>
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="full-name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 flex justify-center">{error}</p>
        )}
        <div className="flex flex-col gap-2 p-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-85 transition-colors cursor-pointer font-semibold text-sm"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};
