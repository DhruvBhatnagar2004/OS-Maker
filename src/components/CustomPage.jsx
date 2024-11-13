// CustomPage.jsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this line
import axios from "axios";
import api from "../services/api";
import LoadingModal from './LoadingModal';
import PredefinedConfig from './PredefinedConfig';

// function Predefined() {
//   return (
//     <div className="mt-8 rounded-lg p-6 flex flex-col items-center">
//       <h2 className="text-2xl mb-6 text-white font-semibold text-center">
//         Predefined Configurations
//       </h2>
//       <div className="flex space-x-4 justify-center">
//         <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
//           <label className="label cursor-pointer flex justify-between items-center">
//             <div>
//               <span className="label-text text-white text-lg font-medium">
//                 Minimal
//               </span>
//               <p className="text-gray-300 text-sm mt-1">
//                 Basic system with essential packages only
//               </p>
//             </div>
//             <input
//               type="radio"
//               name="predefined"
//               className="radio checked:bg-red-500 w-5 h-5"
//               defaultChecked
//             />
//           </label>
//         </div>

//         <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
//           <label className="label cursor-pointer flex justify-between items-center">
//             <div>
//               <span className="label-text text-white text-lg font-medium">
//                 Standard
//               </span>
//               <p className="text-gray-300 text-sm mt-1">
//                 Balanced configuration for daily use
//               </p>
//             </div>
//             <input
//               type="radio"
//               name="predefined"
//               className="radio checked:bg-blue-500 w-5 h-5"
//             />
//           </label>
//         </div>

//         <div className="form-control bg-gray-700 p-3 rounded-lg hover:bg-gray-600 transition-colors w-64">
//           <label className="label cursor-pointer flex justify-between items-center">
//             <div>
//               <span className="label-text text-white text-lg font-medium">
//                 Workstation
//               </span>
//               <p className="text-gray-300 text-sm mt-1">
//                 Development environment with tools and utilities
//               </p>
//             </div>
//             <input
//               type="radio"
//               name="predefined"
//               className="radio checked:bg-violet-500 w-5 h-5"
//             />
//           </label>
//         </div>
//       </div>
//     </div>
//   );
// }

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
      { id: "code", name: "Visual Studio Code" },
      { id: "docker", name: "Docker" },
      { id: "build-essential", name: "Build Essential - Compilation Tools" },
      { id: "python3", name: "Python 3" },
      { id: "nodejs", name: "Node.js" },
      { id: "openjdk-17-jdk", name: "Java Development Kit" },
      { id: "cmake", name: "CMake - Build System" },
      { id: "php", name: "PHP" },
      { id: "ruby", name: "Ruby" }
    ],
    "Media & Graphics": [
      { id: "vlc", name: "VLC Media Player" },
      { id: "gimp", name: "GIMP - Image Editor" },
      { id: "inkscape", name: "Inkscape - Vector Graphics" },
      { id: "kdenlive", name: "Kdenlive - Video Editor" },
      { id: "obs-studio", name: "OBS Studio - Screen Recorder" },
      { id: "audacity", name: "Audacity - Audio Editor" },
      { id: "krita", name: "Krita - Digital Painting" },
      { id: "darktable", name: "Darktable - Photo Workflow" }
    ],
    "System Tools": [
      { id: "htop", name: "Htop - System Monitor" },
      { id: "gufw", name: "Firewall Configuration" },
      { id: "timeshift", name: "Timeshift - System Backup" },
      { id: "gparted", name: "GParted - Partition Editor" },
      { id: "bleachbit", name: "BleachBit - System Cleaner" },
      { id: "neofetch", name: "Neofetch - System Info" },
      { id: "hardinfo", name: "HardInfo - Hardware Info" },
      { id: "tlp", name: "TLP - Power Management" }
    ],
    "Internet & Network": [
      { id: "firefox", name: "Firefox Web Browser" },
      { id: "chromium-browser", name: "Chromium Browser" },
      { id: "filezilla", name: "FileZilla - FTP Client" },
      { id: "thunderbird", name: "Thunderbird Email Client" },
      { id: "remmina", name: "Remmina - Remote Desktop" },
      { id: "transmission", name: "Transmission - Torrent Client" },
      { id: "curl", name: "cURL - Data Transfer" },
      { id: "wireguard", name: "WireGuard VPN" }
    ],
    "Office & Productivity": [
      { id: "libreoffice", name: "LibreOffice Suite" },
      { id: "evince", name: "Evince - PDF Viewer" },
      { id: "simple-scan", name: "Document Scanner" },
      { id: "keepassxc", name: "KeePassXC - Password Manager" },
      { id: "gnome-calendar", name: "GNOME Calendar" },
      { id: "zotero", name: "Zotero - Reference Manager" },
      { id: "planner", name: "Planner - Project Management" }
    ],
    "Gaming": [
      { id: "steam", name: "Steam - Gaming Platform" },
      { id: "lutris", name: "Lutris - Game Manager" },
      { id: "wine", name: "Wine - Windows Compatibility" },
      { id: "gamemode", name: "GameMode - Gaming Performance" },
      { id: "dosbox", name: "DOSBox - DOS Emulator" },
      { id: "retroarch", name: "RetroArch - Retro Gaming" }
    ],
    "Security Tools": [
      { id: "clamav", name: "ClamAV - Antivirus" },
      { id: "fail2ban", name: "Fail2ban - Intrusion Prevention" },
      { id: "rkhunter", name: "RKHunter - Rootkit Detection" },
      { id: "gnupg", name: "GnuPG - Encryption" },
      { id: "ufw", name: "UFW - Firewall" },
      { id: "cryptsetup", name: "Cryptsetup - Disk Encryption" }
    ],
    "Education": [
      { id: "gcompris", name: "GCompris - Educational Suite" },
      { id: "stellarium", name: "Stellarium - Astronomy" },
      { id: "octave", name: "Octave - Scientific Computing" },
      { id: "scratch", name: "Scratch - Programming for Kids" },
      { id: "celestia", name: "Celestia - Space Simulator" },
      { id: "kalzium", name: "Kalzium - Chemistry Tools" }
    ]
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

        <div className="grid grid-cols-2 gap-x-8 gap-y-4 max-h-[600px] overflow-y-auto pr-4">
          {Object.entries(availablePackages).map(([category, packages]) => (
            <div key={category} className="bg-gray-700 p-4 rounded-lg">
              <h4 className="text-lg text-gray-300 mb-3 font-medium">{category}</h4>
              <div className="space-y-2">
                {packages.map((pkg) => (
                  <label key={pkg.id} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedPackages.includes(pkg.id)}
                      onChange={() => handlePackageToggle(pkg.id)}
                      className="checkbox"
                    />
                    <span className="text-white text-sm">{pkg.name}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const CustomPage = () => {
  const navigate = useNavigate(); // Add this line
  const [selectedOS, setSelectedOS] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);
  const [uploadWallpaper, setUploadWallpaper] = useState(false);
  const [wallpaperFile, setWallpaperFile] = useState(null);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (selectedOption === "Customization" && uploadWallpaper && !wallpaperFile) {
      alert("Please upload a wallpaper before submitting.");
      return;
    }
  
    setIsSubmitting(true);
    setError(null);
  
    const configData = {
      operating_system: selectedOS,
      config_type: selectedOption,
      configuration: {
        type: selectedOption === "Predefined" ? getPredefinedSelection() : "Custom",
        packages: selectedPackages,
        has_custom_wallpaper: uploadWallpaper,
        wallpaper_path: wallpaperFile ? wallpaperFile.name : null // Add wallpaper path
      },
    };
  
    try {
      let response;
      if (uploadWallpaper && wallpaperFile) {
        const formData = new FormData();
        formData.append("wallpaper", wallpaperFile);
        formData.append("config", JSON.stringify(configData));
        response = await api.submitConfigurationWithWallpaper(formData);
      } else {
        response = await api.submitConfiguration(configData);
      }
  
      window.location.href = response.download_iso_url;
  
    } catch (error) {
      setError("Failed to submit configuration.");
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
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
                onClick={() => handleOSSelection("arch")}
                disabled={selectedOS === "arch"}
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
        {selectedOption === "Predefined" ? (
          <PredefinedConfig />
        ) : selectedOption === "Customization" && (
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
      <LoadingModal 
        isSubmitting={isSubmitting}
        error={error}
        setIsSubmitting={setIsSubmitting}
        configType={selectedOption}  // Add this line
      />
    </div>
  );
};

export default CustomPage;
