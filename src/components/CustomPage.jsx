import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Predefined() {
  return (
    <div className="mt-8 rounded-lg p-6 flex flex-col items-center">
      <h2 className="text-2xl mb-6 text-white font-semibold text-center">
        Predefined Configurations
      </h2>
      <div className="flex space-x-4 justify-center">
        <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
          <label className="label cursor-pointer flex justify-between items-center">
            <div>
              <span className="label-text text-white text-lg font-medium">
                Minimal
              </span>
              <p className="text-gray-300 text-sm mt-1">
                Basic system with essential packages only
              </p>
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
              <span className="label-text text-white text-lg font-medium">
                Standard
              </span>
              <p className="text-gray-300 text-sm mt-1">
                Balanced configuration for daily use
              </p>
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
              <span className="label-text text-white text-lg font-medium">
                RAM-Efficient
              </span>
              <p className="text-gray-300 text-sm mt-1">
                Optimized for systems with limited memory
              </p>
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

function Customization({
  uploadWallpaper,
  setUploadWallpaper,
  wallpaperFile,
  setWallpaperFile,
  selectedPackages,
  setSelectedPackages,
}) {
  const availablePackages = {
    "Development Tools": [
      { id: "git", name: "Git - Version Control" },
      { id: "vscode", name: "Visual Studio Code" },
      { id: "docker", name: "Docker" },
    ],
    Utilities: [
      { id: "firefox", name: "Firefox Browser" },
      { id: "vlc", name: "VLC Media Player" },
      { id: "terminal", name: "Terminal Emulator" },
    ],
    "System Tools": [
      { id: "htop", name: "Htop System Monitor" },
      { id: "firewall", name: "Firewall Configuration" },
      { id: "backup", name: "Backup Utility" },
    ],
  };

  const handlePackageToggle = (packageId) => {
    setSelectedPackages((prev) =>
      prev.includes(packageId)
        ? prev.filter((id) => id !== packageId)
        : [...prev, packageId]
    );
  };

  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setWallpaperFile(file);
    }
  };

  return (
    <div className="mt-8 w-full max-w-3xl">
      <h2 className="text-2xl mb-6 text-white font-semibold text-center">
        Customize Your Configuration
      </h2>

      {/* Wallpaper Section */}
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <label className="flex items-center space-x-3 text-white mb-4">
          <input
            type="checkbox"
            checked={uploadWallpaper}
            onChange={() => setUploadWallpaper(!uploadWallpaper)}
            className="checkbox"
          />
          <span>Custom Wallpaper</span>
        </label>

        {uploadWallpaper && (
          <div className="ml-7">
            <input
              type="file"
              accept="image/*"
              onChange={handleWallpaperChange}
              className="file-input file-input-bordered w-full max-w-xs text-white"
            />
            {wallpaperFile && (
              <p className="text-green-400 mt-2">
                Selected: {wallpaperFile.name}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Packages Section */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-xl text-white mb-4">Select Packages to Install</h3>

        {Object.entries(availablePackages).map(([category, packages]) => (
          <div key={category} className="mb-6">
            <h4 className="text-lg text-gray-300 mb-2">{category}</h4>
            <div className="space-y-2 ml-4">
              {packages.map((pkg) => (
                <label key={pkg.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedPackages.includes(pkg.id)}
                    onChange={() => handlePackageToggle(pkg.id)}
                    className="checkbox"
                  />
                  <span className="text-white">{pkg.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CustomPage() {
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const [uploadWallpaper, setUploadWallpaper] = useState(false);
  const [wallpaperFile, setWallpaperFile] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const navigate = useNavigate();

  const handleOSSelection = (osName) => {
    setSelectedOS(osName);
  };

  const handleSelection = (option) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
  };

  const getPredefinedSelection = () => {
    const selectedRadio = document.querySelector(
      'input[name="predefined"]:checked'
    );
    if (selectedRadio) {
      return selectedRadio.parentElement.querySelector(".label-text")
        .textContent;
    }
    return null;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    const configData = {
      operating_system: selectedOS,
      config_type: selectedOption,
      configuration: {
        type:
          selectedOption === "Predefined" ? getPredefinedSelection() : "Custom",
        packages: selectedPackages,
        has_custom_wallpaper: uploadWallpaper,
      },
    };

    console.log(
      "Submitting configuration:",
      JSON.stringify(configData, null, 2)
    );

    try {
      if (uploadWallpaper && wallpaperFile) {
        const formData = new FormData();
        formData.append("wallpaper", wallpaperFile);
        formData.append("config", JSON.stringify(configData));

        console.log("Uploading with wallpaper:", wallpaperFile.name);
        const response = await api.submitConfigurationWithWallpaper(formData);
        console.log("Backend response:", JSON.stringify(response, null, 2));
      } else {
        const response = await api.submitConfiguration(configData);
        console.log("Backend response:", JSON.stringify(response, null, 2));
      }
      navigate('/waiting'); // Redirect to WaitingPage
    } catch (err) {
      setError("Failed to submit configuration");
      console.error("Submission error:", err);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <h1 className="text-3xl p-4 mb-4 text-white">Select Operating System</h1>

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
                disabled={selectedOS === "Ubuntu"}
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
            <p>Arch Linux is a lightweight and flexible Linux distribution.</p>
            <div className="card-actions justify-end">
              <button
                className={`btn ${
                  selectedOS === "Arch Linux"
                    ? "bg-gray-400 hover:bg-gray-400 cursor-not-allowed opacity-70"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
                onClick={() => handleOSSelection("Arch Linux")}
                disabled={selectedOS === "Arch Linux"}
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

          <div
            className="dropdown relative flex flex-col items-center"
            ref={dropdownRef}
          >
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
            {selectedOption === "Customization" && (
              <Customization
                uploadWallpaper={uploadWallpaper}
                setUploadWallpaper={setUploadWallpaper}
                wallpaperFile={wallpaperFile}
                setWallpaperFile={setWallpaperFile}
                selectedPackages={selectedPackages}
                setSelectedPackages={setSelectedPackages}
              />
            )}
          </div>

          {selectedOption && (
            <>
              <button
                className={`btn w-52 mt-8 ${
                  loading ? "bg-gray-500" : "bg-green-600 hover:bg-green-700"
                } text-white`}
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {error && <div className="text-red-500 mt-4">{error}</div>}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default CustomPage;
