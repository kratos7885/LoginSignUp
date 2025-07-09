import React, { useEffect, useContext, useState } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [isValid, setIsValid] = useState(true);

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== '' && index < 5) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedOtp = e.clipboardData.getData('Text').slice(0, 6);
    const newOtp = pastedOtp.split('').slice(0, 6);
    setOtp(newOtp);
    setTimeout(() => {
      document.getElementById(`otp-input-${newOtp.length - 1}`).focus();
    }, 0);
  };

  const verifyOtp = async (e) => {
    try {
      e.preventDefault();
      const otpValue = otp.join('');
      const { data } = await axios.post(`${backendUrl}/api/auth/verify-otp`, { otp: otpValue });
      if (data.success) {
        toast.success(data.message);
        getUserData();
        navigate('/usage');
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    if (isLoggedin && userData && userData.isAccountVerified) {
      navigate('/usage');
    }
  }, [isLoggedin, userData, navigate]);

  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
          <p className="mb-6">You do not have permission to access this page.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
        <p className="text-center text-gray-600 mb-4">Enter the 6-digit code sent to your email</p>
        <div className="flex justify-between gap-2 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleOtpChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onPaste={handlePaste}
            />
          ))}
        </div>
        {!isValid && (
          <p className="text-red-500 text-center text-sm mb-4">
            Invalid OTP. Please try again.
          </p>
        )}
        <button
          onClick={verifyOtp}
          className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default EmailVerify;
