import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventProvider";
import {jwtDecode} from "jwt-decode"; // Corrected import

const BASE_URL = process.env.REACT_APP_API_URL;

function EventDescription() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState([]);
  const {
    isLoggedIn,
    authorizedToken,
    registrationStatus,
    fetchRegistrationStatus,
    user,
  } = useEventContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventAndTickets = async () => {
      try {
        // Fetch event details
        const eventResponse = await fetch(`${BASE_URL}/events/${eventId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!eventResponse.ok) {
          throw new Error(`Failed to fetch event: ${eventResponse.statusText}`);
        }
        const eventData = await eventResponse.json();
        setEvent(eventData);

        // Fetch tickets for the event
        const ticketsResponse = await fetch(
          `${BASE_URL}/events/${eventId}/tickets`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!ticketsResponse.ok) {
          throw new Error(`Failed to fetch tickets: ${ticketsResponse.statusText}`);
        }
        const ticketsData = await ticketsResponse.json();
        console.log("Fetched tickets:", ticketsData); // Log the tickets data
        setTickets(ticketsData);

        // Fetch registration status if user is logged in
        if (isLoggedIn && user && authorizedToken) {
          await fetchRegistrationStatus(eventId);

          // Fetch user's purchase history for the event
          const purchasesResponse = await fetch(
            `${BASE_URL}/users/${user._id}/events/${eventId}/purchases`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: authorizedToken,
              },
            }
          );

          if (purchasesResponse.ok) {
            const purchasesData = await purchasesResponse.json();
            setPurchasedTickets(purchasesData);
          }
        }
      } catch (err) {
        console.error("Error fetching event or tickets:", err); // Log the error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventAndTickets();
  }, [eventId, isLoggedIn, authorizedToken, fetchRegistrationStatus, user]);

  const handleRegister = () => {
    if (!isLoggedIn && !isRegistered) {
      localStorage.setItem("redirectEventId", eventId);
      localStorage.setItem("redirectPath", `/event/${eventId}`);
      navigate("/signin");
    } else if (!isRegistered) {
      navigate(`/events/${eventId}/register`);
    } else {
      navigate(`/events/${eventId}`);
    }
  };

  const handleGoToDashboard = () => {
    if (isLoggedIn && authorizedToken) {
      try {
        const decodedToken = jwtDecode(authorizedToken);
        const userRole = decodedToken.role;

        if (userRole === "organizer") {
          navigate("/dashboard");
        } else if (userRole === "attendee") {
          navigate("/attendee/dashboard");
        } else {
          navigate("/"); // Fallback to home page
        }
      } catch (error) {
        navigate("/"); // Fallback to home page if token decoding fails
      }
    } else {
      navigate("/signin"); // Redirect to signin if not logged in
    }
  };

  const handlePurchase = (ticketId) => {
    if (!isLoggedIn) {
      localStorage.setItem("redirectEventId", eventId);
      localStorage.setItem("redirectPath", `/events/${eventId}`);
      navigate("/signin");
      return;
    }

    if (!isRegistered) {
      navigate(`/events/${eventId}/register`);
    } else {
      navigate(`/events/${eventId}/purchase/${ticketId}`);
    }
  };

  const handleDownloadTicket = (ticketId) => {
    // Implement the logic to download the ticket
    console.log(`Downloading ticket with ID: ${ticketId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  const isRegistered = registrationStatus[eventId];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-64 object-cover mb-4"
      />
      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-1">
        Date: {new Date(event.start_date).toLocaleDateString()} -{" "}
        {new Date(event.end_date).toLocaleDateString()}
      </p>
      <p className="text-gray-600 mb-1">
        Time: {event.start_time} - {event.end_time}
      </p>
      <p className="text-gray-600 mb-1">
        Venue: {event.venue && event.venue.name}
      </p>
      <p className="text-gray-600 mb-1">Event Type: {event.event_type}</p>
      {event.chief_guest && (
        <p className="text-gray-600 mb-1">Chief Guest: {event.chief_guest}</p>
      )}
      <p className="text-gray-600 mb-1">
        Organized by: {event.organizer && event.organizer.name} (
        {event.organizer && event.organizer.email})
      </p>

      {purchasedTickets.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-4">Your Tickets</h2>
          <ul>
            {purchasedTickets.map((purchase) => (
              <li
                key={purchase.ticketId}
                className="mb-4 p-4 border rounded shadow"
              >
                <h3 className="text-xl font-semibold">{purchase.ticketType}</h3>
                <button
                  onClick={() => handleDownloadTicket(purchase.ticketId)}
                  className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Download Ticket
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {tickets.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mt-6 mb-4">Available Tickets</h2>
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
        </>
      )}

      {isLoggedIn ? (
        isRegistered ? (
          <div className="mt-4 space-y-2">
            <button
              className="bg-green-100 text-green-700 py-2 px-4 rounded cursor-default"
              disabled
            >
              Registered
            </button>
            <button
              onClick={handleGoToDashboard}
              className="bg-indigo-600 text-white py-2 px-4 rounded"
            >
              Go to Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={handleRegister}
            className="bg-indigo-600 text-white py-2 px-4 rounded mt-4"
          >
            Register for the Event
          </button>
        )
      ) : (
        <button
          onClick={handleRegister}
          className="bg-indigo-600 text-white py-2 px-4 rounded mt-4"
        >
          Register for the Event
        </button>
      )}
    </div>
  );
}

export default EventDescription;