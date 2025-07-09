import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../context/AppContext';

const Header = () => {
    const navigate=useNavigate();
    const {userData}=useContext(AppContent)
  return (
    <header className="bg-white text-black h-screen flex flex-col justify-center items-center text-center p-8">
      <motion.h1 
        className="text-5xl font-extrabold tracking-wide mb-4 animate-grow-shrink"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Empower Your Stock Predictions {userData && userData.name && `, ${userData.name}`}!
      </motion.h1>
      
      <motion.p 
        className="text-lg font-medium mb-6 max-w-3xl px-4 animate-grow-shrink"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Leverage cutting-edge AI technology to predict stock trends. Get started now and take your market insights to the next level!
      </motion.p>

      <motion.button
        onClick={()=>navigate('/login')}
        className="px-8 py-4 text-lg font-medium text-white bg-gradient-to-r from-purple-900 to-indigo-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:bg-gradient-to-l hover:from-purple-800 hover:to-indigo-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        Get Started
      </motion.button>
    </header>
  );
};

export default Header;
