import React from "react";
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaInfoCircle,
  FaTicketAlt,
  FaDollarSign,
} from "react-icons/fa";

function Review({ data, onBack, onSubmit }) {
  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h3 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Review Event Details
      </h3>
      <div className="mb-8">
        <h4 className="text-xl font-semibold flex items-center mb-2">
          <FaInfoCircle className="mr-2 text-blue-600" /> Event Name:
        </h4>
        <p className="text-lg">{data.name}</p>
      </div>
      <div className="mb-8">
        <h4 className="text-xl font-semibold flex items-center mb-2">
          <FaCalendarAlt className="mr-2 text-blue-600" /> Date:
        </h4>
        <p className="text-lg">{data.date}</p>
      </div>
      <div className="mb-8">
        <h4 className="text-xl font-semibold flex items-center mb-2">
          <FaMapMarkerAlt className="mr-2 text-blue-600" /> Location:
        </h4>
        <p className="text-lg">{data.location}</p>
      </div>
      <div className="mb-8">
        <h4 className="text-xl font-semibold flex items-center mb-2">
          <FaInfoCircle className="mr-2 text-blue-600" /> Description:
        </h4>
        <p className="text-lg">{data.description}</p>
      </div>
      <div className="mb-8">
        <h4 className="text-xl font-semibold flex items-center mb-4">
          <FaTicketAlt className="mr-2 text-blue-600" /> Tickets:
        </h4>
        {data.tickets.map((ticket, index) => (
          <div key={index} className="p-4 border rounded mb-4 bg-gray-50">
            <p className="text-lg">
              <strong>Name:</strong> {ticket.name}
            </p>
            <p className="text-lg">
              <strong>Description:</strong> {ticket.description}
            </p>
            <p className="text-lg flex items-center">
              <FaDollarSign className="mr-1 text-green-600" />
              <strong>Price:</strong> ${ticket.price}
            </p>
            <p className="text-lg">
              <strong>Quantity:</strong> {ticket.quantity}
            </p>
            <p className="text-lg">
              <strong>Sales Period:</strong> {ticket.startDate} to{" "}
              {ticket.endDate}
            </p>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors duration-200 mr-4"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition-colors duration-200"
        >
          Confirm and Publish
        </button>
      </div>
    </div>
  );
}

export default Review;
