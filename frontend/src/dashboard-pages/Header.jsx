import React, { useState } from "react";
import { FaBell, FaUserCircle, FaCog, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-gradient-to-r from-blue-800 to-teal-600 text-white p-4 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        
        <span className="text-2xl font-bold">EventPrep</span>
      </div>

      {/* Search Bar */}
      <div className="flex-1 mx-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-full p-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-300"
        />
      </div>

      {/* Notifications and Profile */}
      <div className="flex items-center space-x-4 relative">
        <button className="focus:outline-none relative">
          <FaBell className="text-xl" />
          <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
        </button>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="focus:outline-none bg-white rounded-full h-10 w-10 overflow-hidden border-2 border-white"
          >
            <img
              src="profile.jpg"
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20">
              <Link
                to="/profile" // Updated to Link
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaUserCircle className="mr-2" /> Profile
              </Link>
              <Link
                to="/settings" // Updated to Link
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaCog className="mr-2" /> Settings
              </Link>
              <Link
                to="/logout" // Updated to Link
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
