import React, { useContext, useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/AppContext.js";
import axios from 'axios';
import {toast} from 'react-toastify';

const Login = () => {
  const [state, setState] = useState("login");
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {backendUrl,setIsLoggedin,getUserData}=useContext(AppContent);

  const handleSubmit = async (e) => {
    try{
    e.preventDefault();
    axios.defaults.withCredentials=true; // this will send the cookies also with the request we are sending
    if(state==="signup"){
      const{data}= await axios.post(backendUrl+'/api/auth/register',{name,email,password},{withCredentials: true}) // data stores the response from the server
      if(data.success){
        setIsLoggedin(true)
        getUserData()
        navigate("/usage")
      }
      else{
        //we will add a toast message here
        toast.error(data.message)
      }
    }else{
      const{data}= await axios.post(backendUrl+'/api/auth/login',{email,password},{withCredentials:true}) // data stores the response from the server
      if(data.success){
        setIsLoggedin(true)
        getUserData()
        navigate("/usage")
      }
      else{
        //we will add a toast message here
        toast.error(data.message)
      }
    }
    }catch(err){
      toast.error(err.message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-700 text-white p-4 animate-gradient">
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            background-size: 300% 300%;
            animation: gradient 8s ease infinite;
          }
        `}
      </style>
      <div className="bg-white text-black w-full max-w-md rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-extrabold text-center mb-6 flex items-center justify-center space-x-2">
          {state === "login" ? (
            <>
              <FaLock className="text-purple-900" /> <span>Welcome Back!</span>
            </>
          ) : (
            <>
              <FaUser className="text-purple-900" /> <span>Create Your Account</span>
            </>
          )}
        </h2>

        {/* Login or Sign-Up Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {state === "signup" && (
            <div>
              <label htmlFor="full-name" className="block text-sm font-medium">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
                <input
                  type="text"
                  id="full-name"
                  className="w-full pl-10 mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="email"
                id="email"
                className="w-full pl-10 mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-400" />
              <input
                type="password"
                id="password"
                className="w-full pl-10 mt-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full px-4 py-2 text-lg font-medium text-white bg-gradient-to-r from-purple-900 to-indigo-700 rounded-lg hover:bg-gradient-to-l hover:from-purple-800 hover:to-indigo-600 transition-transform duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              {state === "login" ? "Login" : "Sign Up"}
            </button>

            {state === "login" && (
              <button
                type="button"
                className="text-sm font-medium text-indigo-600 hover:text-purple-800 transition-all flex items-center justify-center space-x-2"
              >
                <FaQuestionCircle />
                <span onClick={() => navigate("/reset-password")}>Forgot Password?</span>
              </button>
            )}
          </div>
        </form>

        {/* Toggle State */}
        <div className="mt-6 text-center">
          {state === "login" ? (
            <p className="text-sm">
              Don't have an account yet?{" "}
              <button
                className="text-indigo-600 hover:text-purple-800 font-medium transition-all"
                onClick={() => setState("signup")}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-sm">
              Already have an account?{" "}
              <button
                className="text-indigo-600 hover:text-purple-800 font-medium transition-all"
                onClick={() => setState("login")}
              >
                Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
