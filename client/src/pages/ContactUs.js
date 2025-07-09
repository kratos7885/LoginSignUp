import React from 'react';
import Navbar from '../components/Navbar';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <Navbar />
      <div className="flex justify-center items-center min-h-[90vh]">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
          <h2 className="text-4xl font-bold mb-6 text-center text-gray-800">Contact Us</h2>
          <p className="text-lg text-gray-600 mb-4 leading-relaxed text-center">
            Got questions or feedback about our <span className="text-indigo-600 font-semibold">Stock Market Predictor</span>? We'd love to hear from you! Reach out to us at:
          </p>
          <div className="flex justify-center mb-6">
            <a
              href="mailto:aryanchaudhary290@gmail.com"
              className="text-indigo-600 text-lg font-semibold hover:underline"
            >
              aryanchaudhary290@gmail.com
            </a>
          </div>
          <p className="text-lg text-gray-600 leading-relaxed text-center">
            Whether it's a query, suggestion, or any other feedback, feel free to drop us an email, and we'll get back to you as soon as possible.
          </p>
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => window.location.href = '/'}
              className="py-3 px-8 text-lg font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
