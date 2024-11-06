import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function WaitingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Extract the download URL from location state
    const { downloadUrl } = location.state || {};

    if (downloadUrl) {
      // Trigger the download
      const download = () => {
        // Create a temporary anchor element to initiate download
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", "iso.txt"); // Optional: specify download filename
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      download();

      // Optionally, navigate to another page after initiating download
      // For example, redirect to a success page or back to the main page after a delay
      // setTimeout(() => { navigate('/success'); }, 3000);
    } else {
      // If no download URL is found, redirect back or show an error
      console.error("No download URL found in location state.");
      alert("Download URL is missing. Please try again.");
      navigate("/"); // Redirect to home or another appropriate page
    }
  }, [location.state, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-3xl mb-4">Preparing your download...</h1>
      <p className="text-lg">Your ISO file will download shortly.</p>
      {/* Optionally, add a spinner or loading indicator */}
      <div className="mt-6">
        <svg
          className="animate-spin h-8 w-8 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default WaitingPage;
