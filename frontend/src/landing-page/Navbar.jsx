import React, { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isHelpOpen, setHelpOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-bold text-indigo-600">
              <img src="/path/to/logo.png" alt="Logo" className="h-8" />
            </NavLink>
            <div className="hidden md:flex md:space-x-8 ml-10">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Find Events"
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setCreateOpen(!isCreateOpen)}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Create Events
                </button>
                {isCreateOpen && (
                  <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-1">
                    <NavLink
                      to="/create-conference"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Create Conference
                    </NavLink>
                    <NavLink
                      to="/create-workshop"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Create Workshop
                    </NavLink>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => setHelpOpen(!isHelpOpen)}
                  className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  Help Center
                </button>
                {isHelpOpen && (
                  <div className="absolute mt-2 w-48 bg-white shadow-lg rounded-md py-1">
                    <NavLink
                      to="/faq"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      FAQ
                    </NavLink>
                    <NavLink
                      to="/contact-support"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Contact Support
                    </NavLink>
                  </div>
                )}
              </div>
              <NavLink
                to="/find-tickets"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Find my tickets
              </NavLink>
            </div>
          </div>
          <div className="flex items-center">
            <div className="hidden md:flex md:items-center md:space-x-4">
              <NavLink
                to="/login"
                className="text-gray-700 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                Log In
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition duration-300"
              >
                Sign Up
              </NavLink>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                type="button"
                className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">Open main menu</span>
                <span className="h-6 w-6">☰</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink
              to="/find-events"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              Find Events
            </NavLink>
            <NavLink
              to="/location"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              Location
            </NavLink>
            <div className="relative">
              <button
                onClick={() => setCreateOpen(!isCreateOpen)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
              >
                Create Events
              </button>
              {isCreateOpen && (
                <div className="pl-3">
                  <NavLink
                    to="/create-conference"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create Conference
                  </NavLink>
                  <NavLink
                    to="/create-workshop"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Create Workshop
                  </NavLink>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => setHelpOpen(!isHelpOpen)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
              >
                Help Center
              </button>
              {isHelpOpen && (
                <div className="pl-3">
                  <NavLink
                    to="/faq"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    FAQ
                  </NavLink>
                  <NavLink
                    to="/contact-support"
                    className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Contact Support
                  </NavLink>
                </div>
              )}
            </div>
            <NavLink
              to="/find-tickets"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              Find my tickets
            </NavLink>
            <NavLink
              to="/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-100"
            >
              Log In
            </NavLink>
            <NavLink
              to="/signup"
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Sign Up
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
