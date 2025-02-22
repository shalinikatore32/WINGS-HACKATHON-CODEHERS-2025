import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaInfoCircle } from "react-icons/fa";

function BasicDetails({ data, onChange, onNext }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">
        Basic Event Details
      </h3>
      <div className="mb-6">
        <label className="block text-gray-700">Event Name</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-6 flex items-center">
        <FaCalendarAlt className="text-lg mr-2 text-blue-600" />
        <label className="block text-gray-700">Date</label>
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-6 flex items-center">
        <FaMapMarkerAlt className="text-lg mr-2 text-blue-600" />
        <label className="block text-gray-700">Location</label>
        <input
          type="text"
          name="location"
          value={data.location}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        />
      </div>
      <div className="mb-6 flex items-start">
        <FaInfoCircle className="text-lg mr-2 mt-1 text-blue-600" />
        <textarea
          name="description"
          value={data.description}
          onChange={handleChange}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          placeholder="Description"
          required
        />
      </div>
      <button
        onClick={onNext}
        className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-200"
      >
        Next
      </button>
    </div>
  );
}

export default BasicDetails;
