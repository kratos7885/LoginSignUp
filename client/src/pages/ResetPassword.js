import React, { useContext, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const ResetPassword = () => {
  const navigate=useNavigate();
  axios.defaults.withCredentials = true;
  const{backendUrl}=useContext(AppContent);

  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [newPassword, setNewPassword] = useState('');
  const [realotp,setrealotp]=useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl+'/api/auth/send-reset-otp', { email });
      if (data.success) {
        toast.success(data.message);
        setStep(2); // Move to OTP input step
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error sending OTP. Please try again.');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    setrealotp(otpValue);
    setStep(3);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(backendUrl+'/api/auth/reset-password', { email,otp:realotp, newPassword });
      console.log(data);
      if (data.success) {
        toast.success('Password reset successful!');
        navigate('/login');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Error resetting password. Please try again.');
    }
  };

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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-sm">
        {step === 1 && (
          <form onSubmit={handleEmailSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>
            <p className="text-center text-gray-600 mb-4">
              Enter your email to receive a One-Time Password (OTP)
            </p>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Send OTP
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Verify OTP</h2>
            <p className="text-center text-gray-600 mb-4">Enter the 6-digit OTP sent to your email</p>
            <div className="flex justify-between gap-2 mb-6">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-input-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}

        {step === 3 && (
          <form onSubmit={handlePasswordSubmit}>
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Set New Password</h2>
            <p className="text-center text-gray-600 mb-4">Enter your new password below</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new password"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
