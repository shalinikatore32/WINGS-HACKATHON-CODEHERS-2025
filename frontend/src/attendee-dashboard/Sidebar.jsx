import React from "react";
import {
  FaUser,
 
  FaClipboardList,
  FaChartLine,
  FaCog,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-full md:w-1/4 bg-white shadow-lg rounded-lg overflow-hidden">
      <ul className="divide-y divide-gray-200">
        <li className="px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer">
          <Link
            to="attendee/dashboard/profile"
            className="flex items-center text-gray-700"
          >
            <FaUser className="mr-3 text-blue-500" />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </li>
        
        <li className="px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer">
          <Link
            to="/attendee/dashboard/registered"
            className="flex items-center text-gray-700"
          >
            <FaClipboardList className="mr-3 text-purple-500" />
            <span className="text-sm font-medium">Registered</span>
          </Link>
        </li>
        <li className="px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer">
          <a href="#" className="flex items-center text-gray-700">
            <FaChartLine className="mr-3 text-red-500" />
            <span className="text-sm font-medium">Activity</span>
          </a>
        </li>
        <li className="px-4 py-3 hover:bg-gray-100 transition duration-200 ease-in-out cursor-pointer">
          <a href="#" className="flex items-center text-gray-700">
            <FaCog className="mr-3 text-yellow-500" />
            <span className="text-sm font-medium">Account Settings</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;