import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CustomPage from "./CustomPage";

function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggle dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Redirect to Intro Page
  const goToIntroPage = () => {
    setIsDropdownOpen(false); // Close the dropdown
    navigate("/"); // Change this path to match your Intro Page route
  };

  const goToCustomPage = () => {
    setIsDropdownOpen(false); // Close the dropdown
    navigate("/Custom-Page"); // Change this path to match your Intro Page route
  };

  return (
    <div className="navbar w-[100vw]">
      <div className="navbar-start w-0">
        <div className="dropdown" ref={dropdownRef}>
          <div
            tabIndex={0}
            role="button"
            onClick={toggleDropdown}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-[2rem] w-[2rem]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          {isDropdownOpen && (
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={goToIntroPage}>Homepage</a>
              </li>
              <li>
                <a onClick={goToCustomPage}>Custom Page</a>
              </li>
              <li>
                <a href="#about-us">About us</a>
              </li>
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center flex m-auto">
        <a className="btn btn-ghost text-4xl">OS MAKER</a>
      </div>
    </div>
  );
}

export default Navbar;
