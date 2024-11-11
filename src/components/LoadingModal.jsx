// LoadingModal.jsx
import React, { useState, useEffect } from 'react';

const LoadingModal = ({ isSubmitting, error, setIsSubmitting }) => {
  const [currentStatus, setCurrentStatus] = useState(0);

  const statusMessages = [
    "Extracting the ISO file...",
    "Installing selected packages...",
    "Zipping the new filesystem...",
    "Generating ISO file...", 
    "Validating ISO file..."
  ];

  const timeouts = [
    15000,  // 15 seconds
    30000,  // 30 seconds
    30000,  // 30 seconds
    120000, // 120 seconds
    Infinity // Forever until download
  ];

  // Reset currentStatus when modal is opened
  useEffect(() => {
    if (isSubmitting) {
      setCurrentStatus(0);
    }
  }, [isSubmitting]);

  // Progress through status messages
  useEffect(() => {
    if (isSubmitting && currentStatus < statusMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentStatus(prev => prev + 1);
      }, timeouts[currentStatus]);
      
      return () => clearTimeout(timer);
    }
  }, [isSubmitting, currentStatus]);

  if (!isSubmitting) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl text-white font-semibold text-center mb-6">
          Generating Your Custom ISO
        </h2>
        
        {/* Loading animation */}
        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>

        {/* Status messages */}
        <div className="space-y-2">
          {statusMessages.map((message, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-300 ${
                index === currentStatus 
                  ? 'text-blue-400 font-medium scale-105' 
                  : index < currentStatus 
                    ? 'text-green-400 line-through opacity-50'
                    : 'text-gray-500 opacity-50'
              }`}
            >
              {message}
            </div>
          ))}
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
            <button 
              onClick={() => setIsSubmitting(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingModal;