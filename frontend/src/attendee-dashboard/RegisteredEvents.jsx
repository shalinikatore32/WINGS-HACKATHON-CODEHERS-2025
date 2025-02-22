import React, { useState, useEffect } from "react";
import axios from "axios";
import { useEventContext } from "../context/EventProvider";

const BASE_URL = process.env.REACT_APP_API_URL;

const RegisteredEvents = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authorizedToken } = useEventContext();

  useEffect(() => {
    const fetchRegisteredEvents = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/registered-events`, {
          headers: {
            Authorization: authorizedToken,
          },
        });
        console.log("API Response:", response.data); // Log the response data
        setRegisteredEvents(response.data);
      } catch (err) {
        console.error("API Error:", err); // Log the error
        setError("Failed to fetch registered events");
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredEvents();
  }, [authorizedToken]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Function to format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Registered Events</h2>
      {registeredEvents.length === 0 ? (
        <p>You have not registered for any events yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {registeredEvents.map((event) => {
            const { _id, name, date, location } = event;
            return (
              <div key={_id} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{name || "Unknown Event"}</h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Date:</span> {formatDate(date)}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Venue:</span> {location?.name || "N/A"}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-semibold">Location:</span> {location?.location?.coordinates.join(", ") || "N/A"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RegisteredEvents;