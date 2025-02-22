import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tickets`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch tickets: ${response.statusText}`);
        }

        const data = await response.json();
        setTickets(data);
      } catch (err) {
        console.error("Error fetching tickets:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const handlePurchase = (ticketId) => {
    // Navigate to the purchase page for the selected ticket
    navigate(`/purchase/${ticketId}`);
  };

  if (loading) {
    return <div>Loading tickets...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Available Tickets</h1>
      {tickets.length > 0 ? (
        <ul>
          {tickets.map((ticket) => (
            <li key={ticket._id} className="mb-4 p-4 border rounded shadow">
              <h3 className="text-xl font-semibold">{ticket.ticket_type}</h3>
              <p>Price: ${ticket.price}</p>
              <p>Available: {ticket.quantity - ticket.sold}</p>
              <button
                onClick={() => handlePurchase(ticket._id)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Buy Ticket
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No tickets available at the moment.</p>
      )}
    </div>
  );
}

export default TicketList;