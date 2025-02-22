import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaTag,
  FaMapMarkerAlt,
  FaUser,
} from "react-icons/fa";
import { useEventContext } from "../../context/EventProvider";

const BASE_URL = process.env.REACT_APP_API_URL;

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authorizedToken } = useEventContext();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`${BASE_URL}/events/${id}`, {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, authorizedToken]);

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

  if (!event) {
    return null;
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            {event.title}
          </h1>
          <p className="text-gray-600 mb-6">{event.description}</p>
          <div className="space-y-4">
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="mr-2 text-teal-600" />
              <span className="font-semibold">Start Date:</span>{" "}
              {new Date(event.start_date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-700">
              <FaCalendarAlt className="mr-2 text-teal-600" />
              <span className="font-semibold">End Date:</span>{" "}
              {new Date(event.end_date).toLocaleDateString()}
            </div>
            <div className="flex items-center text-gray-700">
              <FaClock className="mr-2 text-teal-600" />
              <span className="font-semibold">Time:</span> {event.start_time} -{" "}
              {event.end_time}
            </div>
            <div className="flex items-center text-gray-700">
              <FaMapMarkerAlt className="mr-2 text-teal-600" />
              <span className="font-semibold">Venue:</span>{" "}
              {event.venue && event.venue.name}
            </div>
            <div className="flex items-center text-gray-700">
              <FaTag className="mr-2 text-teal-600" />
              <span className="font-semibold">Category:</span>{" "}
              {event.event_type}
            </div>
            <div className="flex items-center text-gray-700">
              <FaUser className="mr-2 text-teal-600" />
              <span className="font-semibold">Chief Guest:</span>{" "}
              {event.chief_guest || "N/A"}
            </div>
            <div className="flex items-center text-gray-700">
              <span className="font-semibold">Public Event:</span>{" "}
              {event.public_event ? (
                <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Public Event
                </span>
              ) : (
                "No"
              )}
            </div>
          </div>
          <div className="mt-8 flex space-x-4">
            <Link to="/dashboard/my-events">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Back to Events
              </button>
            </Link>
            <Link to={`/dashboard/event/edit/${event._id}`}>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                Edit Event
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;