import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaChartLine } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin,logout } = useContext(AppContent);
  const [showDropdown, setShowDropdown] = useState(false);
  const sendVerificationOtp = async () => {
    console.log('Sending verification OTP');
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp');
      console.log(data);
      if (data.success) {
        navigate('/email-verify');
        toast.success(data.message);
      } else {  
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // Logout logic using AppContext
  return (
    <nav className="bg-gradient-to-r from-purple-900 to-indigo-700 text-white shadow-2xl backdrop-blur-lg bg-opacity-40">
      <div className="container mx-auto flex items-center justify-between p-8">
        {/* Logo and Title */}
        <div className="flex items-center space-x-6">
          <FaChartLine className="text-4xl text-white transform transition-all duration-300 hover:scale-110" />
          <motion.h1
            className="text-3xl font-extrabold tracking-widest text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            Stock Market Predictor
          </motion.h1>
        </div>

        {/* Middle Navigation Links */}
        <div className="flex space-x-10 mx-auto">
          <button
            onClick={() => navigate('/')}
            className="text-lg font-medium text-white hover:text-pink-300 transition-all duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => navigate('/about')}
            className="text-lg font-medium text-white hover:text-pink-300 transition-all duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer"
          >
            About Us
          </button>
          <button
            onClick={() => navigate('/contact-us')}
            className="text-lg font-medium text-white hover:text-pink-300 transition-all duration-300 ease-in-out transform hover:scale-110 hover:cursor-pointer"
          >
            Contact Us
          </button>
        </div>

        {/* Right-aligned Buttons */}
        <div className="flex items-center space-x-6">
          {userData ? (
            // Profile Section for Logged-In Users
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-xl font-bold text-black cursor-pointer">
                {userData.name.charAt(0).toUpperCase()}
              </div>

              {showDropdown && (
                <div className="absolute right-0 -translate-y-[8px] mt-2 w-56 bg-white rounded-lg shadow-lg text-black">
                  {!userData.isAccountVerified && (
                    <div
                    onClick={sendVerificationOtp}
                      className="px-4 py-3 border-b hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <span className="text-indigo-700 font-medium">Verify Account</span>
                    </div>
                  )}
                  <div
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={logout}
                  >
                    <span className="text-red-500 font-medium">Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            // Login and Sign Up Buttons for Guests
            <>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-700 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-indigo-700 hover:to-purple-800 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/login')}
                className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-pink-600 to-pink-800 rounded-lg shadow-md hover:bg-gradient-to-l hover:from-pink-700 hover:to-pink-900 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
