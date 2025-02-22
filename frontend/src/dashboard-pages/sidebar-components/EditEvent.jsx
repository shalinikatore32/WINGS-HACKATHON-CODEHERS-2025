import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEventContext } from "../../context/EventProvider";

const EditEvent = () => {
  const { id } = useParams(); // Get the event ID from the URL
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    venue: { name: "" }, // Adjusted to handle venue as an object
    event_type: "",
    chief_guest: "",
    public_event: true,
    image: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { authorizedToken } = useEventContext();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/events/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: authorizedToken,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setFormData({
          ...data,
          start_date: new Date(data.start_date).toISOString().split("T")[0],
          end_date: new Date(data.end_date).toISOString().split("T")[0],
          venue: { name: data.venue.name }, // Ensure venue is set correctly
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, authorizedToken]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === "venue") {
      setFormData({
        ...formData,
        venue: { ...formData.venue, name: value },
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/events/edit/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizedToken,
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Event update failed");
      }

      const data = await response.json();
      console.log("Event updated successfully:", data);
      navigate(`/dashboard/event/${id}`);
    } catch (error) {
      console.error("Error updating event:", error);
    }
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Edit Event
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                Start Date
              </label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                End Date
              </label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-semibold">
                Start Time
              </label>
              <input
                type="time"
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold">
                End Time
              </label>
              <input
                type="time"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
                required
              />
            </div>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">Venue</label>
            <input
              type="text"
              name="venue"
              value={formData.venue.name}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Event Type
            </label>
            <select
              name="event_type"
              value={formData.event_type}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
              required
            >
              <option value="">Select Type</option>
              <option value="conference">Conference</option>
              <option value="concert">Concert</option>
              <option value="wedding">Wedding</option>
              <option value="birthday">Birthday</option>
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Chief Guest
            </label>
            <input
              type="text"
              name="chief_guest"
              value={formData.chief_guest}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Public Event
            </label>
            <input
              type="checkbox"
              name="public_event"
              checked={formData.public_event}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded mt-1 focus:outline-none focus:border-teal-500 transition duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition duration-300"
          >
            Update Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;