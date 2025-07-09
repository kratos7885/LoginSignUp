import React, { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Usage = () => {
  const { userData } = useContext(AppContent);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar /> {/* Display the Navbar at the top of the page */}

      { !userData ? (
        // If user is not logged in, show a message and a button to log in
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="mb-6 text-lg">Please log in to access this page.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 text-lg font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition-all duration-300 ease-in-out"
          >
            Go to Login
          </button>
        </div>
      ) : (
        // If user is logged in, show the usage page content
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-700">
          <h1 className="text-3xl font-bold mb-4">Welcome, {userData.name}!</h1>
          <p className="text-lg">This is your usage page where you can access your account details.</p>
        </div>
      )}
    </div>
  );
};

export default Usage;
