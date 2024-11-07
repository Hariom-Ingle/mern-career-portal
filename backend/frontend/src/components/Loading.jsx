// Loading.js
import React from 'react';

function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-opacity-25 rounded-full animate-spin"></div>
      {/* Loading Text */}
      <p className="absolute mt-24 text-xl font-medium text-gray-700 sm:mt-32 md:mt-36 lg:mt-40">Loading...</p>
    </div>
  );
}

export default Loading;
