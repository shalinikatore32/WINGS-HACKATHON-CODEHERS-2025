import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

const TicketCreationForm = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([
    { ticketType: "VIP", price: "", quantity: "" },
  ]);

  const handleTicketChange = (index, e) => {
    const { name, value } = e.target;
    const newTickets = [...tickets];
    newTickets[index][name] = value;
    setTickets(newTickets);
  };

  const addTicket = () => {
    setTickets([
      ...tickets,
      { ticketType: "General Admission", price: "", quantity: "" },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      for (const ticket of tickets) {
        console.log("Sending ticket data:", {
          ticket_type: ticket.ticketType, // Ensure this matches the backend expectation
          price: ticket.price,
          quantity: ticket.quantity,
        });

        const response = await fetch(`${BASE_URL}/events/${eventId}/tickets`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ticket_type: ticket.ticketType, // Correct key name
            price: ticket.price,
            quantity: ticket.quantity,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Ticket creation failed");
        }
      }

      alert("Tickets created successfully!");
      navigate("/dashboard/my-events");
    } catch (error) {
      console.error("Error creating tickets:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create Tickets
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {tickets.map((ticket, index) => (
            <div key={index} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Ticket Type
              </label>
              <select
                name="ticketType"
                value={ticket.ticketType}
                onChange={(e) => handleTicketChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="VIP">VIP</option>
                <option value="General Admission">General Admission</option>
              </select>

              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={ticket.price}
                onChange={(e) => handleTicketChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />

              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={ticket.quantity}
                onChange={(e) => handleTicketChange(index, e)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addTicket}
            className="mb-4 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
          >
            Add Another Ticket Type
          </button>

          <button
            type="submit"
            className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Create Tickets
          </button>
        </form>
      </div>
    </div>
  );
};

export default TicketCreationForm;
