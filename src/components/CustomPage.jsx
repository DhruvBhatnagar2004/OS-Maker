import React, { useState, useRef, useEffect } from "react";

function Predefined() {
  return (
    <div className="mt-8 rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-2xl mb-6 text-white font-semibold text-center">Predefined Configurations</h2>
      <div className="flex space-x-4 justify-center">
        <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
          <label className="label cursor-pointer flex justify-between items-center">
            <div>
              <span className="label-text text-white text-lg font-medium">Minimal</span>
              <p className="text-gray-300 text-sm mt-1">Basic system with essential packages only</p>
            </div>
            <input
              type="radio"
              name="predefined"
              className="radio checked:bg-red-500 w-5 h-5"
              defaultChecked
            />
          </label>
        </div>

        <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
          <label className="label cursor-pointer flex justify-between items-center">
            <div>
              <span className="label-text text-white text-lg font-medium">Standard</span>
              <p className="text-gray-300 text-sm mt-1">Balanced configuration for daily use</p>
            </div>
            <input
              type="radio"
              name="predefined"
              className="radio checked:bg-blue-500 w-5 h-5"
            />
          </label>
        </div>

        <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
          <label className="label cursor-pointer flex justify-between items-center">
            <div>
              <span className="label-text text-white text-lg font-medium">RAM-Efficient</span>
              <p className="text-gray-300 text-sm mt-1">Optimized for systems with limited memory</p>
            </div>
            <input
              type="radio"
              name="predefined"
              className="radio checked:bg-violet-500 w-5 h-5"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function Customization() {
  return (
    <div className="mt-8 flex flex-col items-center">
      <h2 className="text-2xl mb-6 text-white font-semibold text-center">
        Customize Your Configuration
      </h2>
      <p className="text-gray-300 text-center">Please enter your customization details here.</p>
    </div>
  );
}

function CustomPage() {
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleOSSelection = (osName) => {
    setSelectedOS(osName);
  };

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen p-8">
      <h1 className="text-3xl p-4 text-white">Select Operating System</h1>
      
      {/* Fixed position for cards with consistent gap */}
      <div className="flex justify-center gap-20 w-full mb-8">
        <div className="card bg-gray-800 w-80 shadow-xl text-gray-200">
          <figure>
            <img
              src="https://www.unixtutorial.org/images/software/ubuntu-linux.png"
              alt="Ubuntu"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Ubuntu</h2>
            <p>
              Ubuntu is a popular open-source operating system based on Linux.
            </p>
            <div className="card-actions justify-end">
              <button
                className={`btn ${
                  selectedOS === "Ubuntu"
                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                onClick={() => handleOSSelection("Ubuntu")}
              >
                {selectedOS === "Ubuntu" ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </div>
        <div className="card bg-gray-800 w-80 shadow-xl text-gray-200">
          <figure>
            <img
              src="https://colfaxresearch.com/wp-content/uploads/2015/06/archlinux-logo-800x350.jpg"
              alt="Arch Linux"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Arch Linux</h2>
            <p>
              Arch Linux is a lightweight and flexible Linux distribution.
            </p>
            <div className="card-actions justify-end">
              <button
                className={`btn ${
                  selectedOS === "Arch Linux"
                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                onClick={() => handleOSSelection("Arch Linux")}
              >
                {selectedOS === "Arch Linux" ? "Selected" : "Select"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Separate container for configuration options */}
      {selectedOS && (
        <div className="w-full max-w-4xl mt-6 flex flex-col items-center">
          <h2 className="text-2xl text-white mb-4 text-center">
            You have selected: <strong>{selectedOS}</strong>
          </h2>

          <div className="dropdown relative flex flex-col items-center" ref={dropdownRef}>
            <button
              className="btn w-52 bg-gray-700 text-gray-200 hover:bg-gray-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {selectedOption ? selectedOption : "Choose Option"}
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-content menu absolute left-1/2 transform -translate-x-1/2 mt-2 bg-gray-800 rounded-box w-52 p-2 shadow">
                <li>
                  <button
                    className="block w-full px-4 py-2 text-gray-200 hover:bg-gray-700 rounded text-left"
                    onClick={() => handleSelection("Predefined")}
                  >
                    Predefined
                  </button>
                </li>
                <li>
                  <button
                    className="block w-full px-4 py-2 text-gray-200 hover:bg-gray-700 rounded text-left"
                    onClick={() => handleSelection("Customization")}
                  >
                    Customization
                  </button>
                </li>
              </ul>
            )}
          </div>

          <div className="w-full flex flex-col items-center">
            {selectedOption === "Predefined" && <Predefined />}
            {selectedOption === "Customization" && <Customization />}
          </div>

          {selectedOption && (
            <button className="btn w-52 mt-8 bg-green-600 hover:bg-green-700 text-white">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomPage;
