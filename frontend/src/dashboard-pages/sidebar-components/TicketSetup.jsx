import React, { useState } from "react";
import { FaTicketAlt, FaMoneyBillAlt, FaCalendarAlt } from "react-icons/fa";

function TicketSetup({ tickets, onChange, onNext, onBack }) {
  const [localTickets, setLocalTickets] = useState(tickets);

  const addTicket = () => {
    setLocalTickets([
      ...localTickets,
      {
        name: "",
        description: "",
        price: 0,
        quantity: 0,
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const updateTicket = (index, field, value) => {
    const newTickets = [...localTickets];
    newTickets[index][field] = value;
    setLocalTickets(newTickets);
    onChange(newTickets);
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6 text-blue-600">
        Ticket Setup
      </h3>
      {localTickets.map((ticket, index) => (
        <div key={index} className="mb-6 p-4 border rounded bg-gray-50">
          <input
            type="text"
            placeholder="Ticket Name"
            value={ticket.name}
            onChange={(e) => updateTicket(index, "name", e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={ticket.description}
            onChange={(e) => updateTicket(index, "description", e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <div className="flex items-center mb-2">
            <FaMoneyBillAlt className="text-lg mr-2 text-blue-600" />
            <input
              type="number"
              placeholder="Price"
              value={ticket.price}
              onChange={(e) => updateTicket(index, "price", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center mb-2">
            <FaTicketAlt className="text-lg mr-2 text-blue-600" />
            <input
              type="number"
              placeholder="Quantity"
              value={ticket.quantity}
              onChange={(e) => updateTicket(index, "quantity", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center mb-2">
            <FaCalendarAlt className="text-lg mr-2 text-blue-600" />
            <input
              type="date"
              placeholder="Sales Start Date"
              value={ticket.startDate}
              onChange={(e) => updateTicket(index, "startDate", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex items-center">
            <FaCalendarAlt className="text-lg mr-2 text-blue-600" />
            <input
              type="date"
              placeholder="Sales End Date"
              value={ticket.endDate}
              onChange={(e) => updateTicket(index, "endDate", e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>
      ))}
      <button
        onClick={addTicket}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition-colors duration-200"
      >
        Add Ticket Type
      </button>
      <div>
        <button
          onClick={onBack}
          className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition-colors duration-200 mr-2"
        >
          Back
        </button>
        <button
          onClick={onNext}
          className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors duration-200"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default TicketSetup;
