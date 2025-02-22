import React from "react";
import { useHistory } from "react-router-dom";
import {
  FaMusic,
  FaCocktail,
  FaTheaterMasks,
  FaSun,
  FaHeart,
  FaGamepad,
  FaBriefcase,
  FaPizzaSlice,
} from "react-icons/fa";

function Categories() {
  const categories = [
    { name: "Music", icon: <FaMusic />, path: "/music" },
    { name: "Nightlife", icon: <FaCocktail />, path: "/nightlife" },
    {
      name: "Performing & Visual Arts",
      icon: <FaTheaterMasks />,
      path: "/arts",
    },
    { name: "Holidays", icon: <FaSun />, path: "/holidays" },
    { name: "Dating", icon: <FaHeart />, path: "/dating" },
    { name: "Hobbies", icon: <FaGamepad />, path: "/hobbies" },
    { name: "Business", icon: <FaBriefcase />, path: "/business" },
    { name: "Food & Drink", icon: <FaPizzaSlice />, path: "/food-drink" },
  ];

  const handleRedirect = (path) => {
    // history.push(path);
  };

  return (
    <div className="flex justify-center flex-wrap gap-8 py-12 bg-gray-50">
      {categories.map((category) => (
        <div
          key={category.name}
          onClick={() => handleRedirect(category.path)}
          className="flex flex-col items-center cursor-pointer transform hover:scale-105 transition duration-300"
        >
          <div className="flex items-center justify-center w-24 h-24 border border-indigo-300 rounded-full text-indigo-700 bg-white shadow-md hover:bg-indigo-100 transition duration-300">
            {category.icon}
          </div>
          <span className="mt-3 text-base font-semibold text-gray-800">
            {category.name}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Categories;
