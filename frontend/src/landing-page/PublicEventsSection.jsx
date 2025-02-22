import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

function PublicEventsSection() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleEventsCount, setVisibleEventsCount] = useState(4);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/public-event`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched events:", data);
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

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

  return (
    <div className="bg-gradient-to-b from-gray-100 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-indigo-600 mb-12">
          Upcoming Public Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.slice(0, visibleEventsCount).map((event) => (
            <Link
              to={`/event/${event._id}`}
              key={event._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600 mb-1">
                  {new Date(event.start_date).toLocaleDateString()}
                </p>
                <p className="text-gray-600">{event.venue && event.venue.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-12">
          {visibleEventsCount < events.length && (
            <button
              onClick={() => setVisibleEventsCount(events.length)}
              className="bg-indigo-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 font-semibold"
            >
              View More Events
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default PublicEventsSection;