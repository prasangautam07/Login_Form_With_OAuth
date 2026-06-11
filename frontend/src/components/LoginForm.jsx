import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GitHubLight, Google } from "@ridemountainpig/svgl-react";
import { Login } from "../api/authapi";
import toast from "react-hot-toast";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please enter both username and password.");
      return;
    }
    const loginPromise = Login(username, password);
    toast.promise(loginPromise, {
      loading: "Loginng in...",
      success: "Logged in successfully!",
      error: (err) =>
        err?.response?.data?.message || err?.message || "Error when fetching",
    });

    try{
        const response = await loginPromise;
        if (response.status === 200) {
            setError("");
            navigate("/");
        }else{
            setError(response?.data?.message || "Login failed. Please try again.");
        }
    }catch(err){
        setError(err?.response?.data?.message || err?.message || "Login failed. Please try again.");
    }
  };
  return (
    <div className="flex flex-col items-center w-full max-w-sm gap-4 p-6 bg-white rounded-lg border border-gray-200 shadow-md">
      <div className="flex justify-between w-full items-start">
        <div className="flex flex-col gap-1 flex-4">
          <h1 className="text-md font-semibold">Login to your account </h1>
          <p className="text-sm text-muted-foreground text-gray-600">
            Enter your username and password to login to your account.
          </p>
        </div>
        <Link
          to="/signup"
          className="text-sm font-semibold hover:underline flex-1 mt-1"
        >
          Sign up
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-300"
          />
        </div>
        {error && (
          <p className="text-sm text-red-500 flex items-center justify-center">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-2 p-4">
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:opacity-85 transition-colors cursor-pointer font-semibold text-sm"
          >
            Login
          </button>
          <button className="w-full font-semibold text-sm py-2 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors">
            <Google width={20} height={20} className="inline-block mr-2" />
            <a href="http://localhost:8000/api/users/google/login">
              Login with Google
            </a>
          </button>
          <button className="w-full font-semibold text-sm py-2 hover:bg-gray-100 border border-gray-300 rounded-lg transition-colors">
            <GitHubLight width={20} height={20} className="inline-block mr-2" />
            <a href="http://localhost:8000/api/users/github/login">
              Login with GitHub
            </a>
          </button>
        </div>
      </form>
    </div>
  );
};
