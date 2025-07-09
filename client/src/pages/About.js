import React from 'react';
import Navbar from '../components/Navbar';

const About = () => {
  return (
    <div>
      <Navbar/>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-2xl">
        <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">About Our Project</h2>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
          Welcome to our <span className="text-indigo-600 font-semibold">Stock Market Predictor</span>. 
          This innovative tool leverages advanced machine learning algorithms to analyze historical stock data and provide predictions that empower investors to make informed decisions.
        </p>
        <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
          By utilizing cutting-edge technologies such as <span className="text-purple-600 font-semibold">Python</span>, <span className="text-pink-600 font-semibold">React</span>, and real-time data processing, we aim to bridge the gap between complex financial models and user-friendly tools. 
        </p>
        <p className="text-lg text-gray-600 leading-relaxed text-center">
          Whether you're a seasoned trader or a beginner in the stock market, our project is designed to provide accurate predictions, insightful trends, and easy-to-understand visuals to help you navigate the financial markets with confidence.
        </p>
        <div className="mt-8 flex justify-center">
          <button
            className="py-3 px-8 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            onClick={() => window.location.href = '/usage'}
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
    </div>
    
  );
};

export default About;
