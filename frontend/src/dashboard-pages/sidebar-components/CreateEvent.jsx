import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Dropzone from "react-dropzone";
import { FaImage } from "react-icons/fa";
import { useEventContext } from "../../context/EventProvider";

const API_KEY = "AIzaSyDd9oLFAx0LnwO2nnH9e_k6LMlLvnezcmA";

const EventCreationForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    start_date: "",
    end_date: "",
    start_time: "",
    end_time: "",
    venueName: "",
    latitude: "",
    longitude: "",
    event_type: "conference",
    chief_guest: "",
    public_event: false,
    image: null,
  });

  const navigate = useNavigate();
  const { authorizedToken } = useEventContext();
  const autocompleteRef = useRef(null);
  console.log(API_KEY);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google) {
        initAutocomplete();
        return;
      }
      const existingScript = document.querySelector(
        `script[src*="maps.googleapis.com/maps/api/js"]`
      );
      if (existingScript) {
        existingScript.onload = () => initAutocomplete();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
      script.async = true; // Ensure async loading
      script.defer = true; // Ensure deferred execution
      script.onload = () => initAutocomplete();
      script.onerror = () => console.error("Google Maps script failed to load.");
      document.body.appendChild(script);
    };

    loadGoogleMapsScript();
  }, []);

  const initAutocomplete = () => {
    if (!window.google || !window.google.maps || !window.google.maps.places) {
      console.error("Google Maps API or Places library not loaded.");
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(
      autocompleteRef.current,
      {
        types: ["establishment", "geocode"],
        fields: ["place_id", "geometry", "name", "formatted_address"],
        componentRestrictions: { country: "IN" },
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("Place changed:", place); // Debugging line
      if (!place.geometry) {
        alert("Invalid place selected! Please choose a valid location.");
        return;
      }
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setFormData((prevData) => ({
        ...prevData,
        venueName: place.name,
        latitude: lat,
        longitude: lng,
      }));
    });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = (acceptedFiles) => {
    setFormData((prev) => ({
      ...prev,
      image: acceptedFiles[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    for (const key in formData) {
      if (key === "image" && formData[key]) {
        eventData.append(key, formData[key], formData[key].name);
      } else {
        eventData.append(key, formData[key]);
      }
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/create-event`,
        {
          method: "POST",
          headers: {
            Authorization: authorizedToken,
          },
          body: eventData,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Event creation failed");
      }

      const data = await response.json();
      console.log("Event created successfully:", data.event);

      // Navigate to the ticket creation page with the event ID
      navigate(`/dashboard/create-tickets/${data.event._id}`);
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Create New Event
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Event Name*
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              placeholder="Enter event name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Event Description*
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              placeholder="Enter event description"
              rows="4"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start_date"
                className="block text-sm font-medium text-gray-700"
              >
                Start Date*
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                value={formData.start_date}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="end_date"
                className="block text-sm font-medium text-gray-700"
              >
                End Date*
              </label>
              <input
                type="date"
                id="end_date"
                name="end_date"
                value={formData.end_date}
                onChange={handleInputChange}
                required
                min={formData.start_date}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="start_time"
                className="block text-sm font-medium text-gray-700"
              >
                Start Time*
              </label>
              <input
                type="time"
                id="start_time"
                name="start_time"
                value={formData.start_time}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label
                htmlFor="end_time"
                className="block text-sm font-medium text-gray-700"
              >
                End Time*
              </label>
              <input
                type="time"
                id="end_time"
                name="end_time"
                value={formData.end_time}
                onChange={handleInputChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="venueName"
              className="block text-sm font-medium text-gray-700"
            >
              Venue*
            </label>
            <input
              type="text"
              id="venueName"
              name="venueName"
              ref={autocompleteRef}
              onChange={handleInputChange}
              // value={formData.venueName}
              required
              placeholder="Enter event venue"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold flex items-center">
              <FaImage className="mr-2" /> Event Image
            </label>
            <Dropzone onDrop={handleImageUpload}>
              {({ getRootProps, getInputProps }) => (
                <div
                  {...getRootProps()}
                  className="w-full p-4 border border-dashed border-gray-300 rounded mt-1 cursor-pointer focus:outline-none focus:border-teal-500 transition duration-300 hover:bg-gray-100"
                >
                  <input {...getInputProps()} />
                  {formData.image ? (
                    <p>{formData.image.name}</p>
                  ) : (
                    <p>Drag 'n' drop an image here, or click to select one</p>
                  )}
                </div>
              )}
            </Dropzone>
          </div>
          <div>
            <label
              htmlFor="public_event"
              className="block text-sm font-medium text-gray-700"
            >
              Public Event
            </label>
            <input
              type="checkbox"
              id="public_event"
              name="public_event"
              onChange={handleInputChange}
              className="mt-1"
            />
            <span className="ml-2 text-sm text-gray-600">
              Check if this event is public
            </span>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 text-white rounded-md shadow hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationForm;