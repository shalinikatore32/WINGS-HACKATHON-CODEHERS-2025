import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEventContext } from "../../context/EventProvider";

const BASE_URL = process.env.REACT_APP_API_URL;

const Events = () => {
  const [events, setEvents] = useState({ live: [], upcoming: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { authorizedToken } = useEventContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/my-events`, {
          method: "GET",
          headers: {
            Authorization: authorizedToken, // Ensure Bearer format
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await response.json();
        setEvents(data); // Ensure this matches the structure of your response
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, [authorizedToken]);

  const handleInvite = (eventId) => {
    navigate(`/dashboard/attendees/${eventId}/send-invites`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">Error: {error}</div>;
  }

  // Separate events into private and public
  const privateEvents = [];
  const publicEvents = [];

  Object.keys(events).forEach((category) => {
    events[category].forEach((event) => {
      if (event.public_event) {
        publicEvents.push(event);
      } else {
        privateEvents.push(event);
      }
    });
  });

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-600">
        My Events
      </h1>

      {/* Private Events Section */}
      {privateEvents.length > 0 && (
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-center mb-6 text-red-600">
            Private Events
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {privateEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="mt-4 text-gray-500">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(event.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Venue:</span>{" "}
                    {event.venue && event.venue.name}
                  </p>
                  <Link to={`/dashboard/event/${event._id}`}>
                    <button className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                      View Details
                    </button>
                  </Link>
                  <button
                    onClick={() => handleInvite(event._id)}
                    className="mt-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                  >
                    Invite Attendees
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Public Events Section */}
      {publicEvents.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold text-center mb-6 text-green-600">
            Public Events
          </h2>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {publicEvents.map((event) => (
              <div
                key={event._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition transform duration-300 hover:scale-105 hover:shadow-xl"
              >
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-600">{event.description}</p>
                  <p className="mt-4 text-gray-500">
                    <span className="font-semibold">Date:</span>{" "}
                    {new Date(event.start_date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-500">
                    <span className="font-semibold">Venue:</span>{" "}
                    {event.venue && event.venue.name}
                  </p>
                  <Link to={`/dashboard/event/${event._id}`}>
                    <button className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;