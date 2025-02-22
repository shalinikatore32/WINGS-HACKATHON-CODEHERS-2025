import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="bg-white p-4 md:p-6 shadow-lg flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-blue-600 mb-2">My Events</h1>
        <p className="text-gray-500 text-sm hidden md:block">
          This is a snapshot of your events.
        </p>
      </div>
      <div className="relative">
        <FaUserCircle
          className="text-4xl text-blue-500 cursor-pointer hover:text-blue-700 transition duration-300 ease-in-out"
          onClick={toggleDropdown}
        />
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-in-out">
            <ul className="flex flex-col">
              <li>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/settings"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out"
                >
                  Settings
                </Link>
              </li>
              <li>
                <Link
                  to="/logout"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition duration-200 ease-in-out"
                >
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
