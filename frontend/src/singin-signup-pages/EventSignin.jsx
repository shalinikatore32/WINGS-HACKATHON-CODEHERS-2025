import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEventContext } from "../context/EventProvider";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { jwtDecode } from "jwt-decode";

const SignInForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { storeToken, fetchRegistrationStatus, registrationStatus } =
    useEventContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      console.log("Attempting to sign in with:", formData);

      const response = await fetch("http://localhost:5000/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(errorData.message || "Login failed");
      }

      const data = await response.json();
      console.log("Server response:", data);

      if (!data.token) {
        console.error("No token received from server");
        throw new Error("Invalid response from server");
      }

      const decodedToken = jwtDecode(data.token);
      console.log("Decoded token:", decodedToken);
      const userRole = decodedToken.role;

      storeToken(data.token);
      console.log("Token stored");

      // Check for stored redirect path
      const redirectPath = localStorage.getItem("redirectPath");
      console.log("Redirect path:", redirectPath);

      if (redirectPath) {
        localStorage.removeItem("redirectPath");

        // Check if the redirect path is for event registration
        if (
          redirectPath.startsWith("/events/") &&
          redirectPath.endsWith("/register")
        ) {
          const eventId = redirectPath.split("/")[2];

          // Fetch registration status for the event
          await fetchRegistrationStatus(eventId);

          // Wait for a short delay to ensure registrationStatus is updated
          await new Promise((resolve) => setTimeout(resolve, 100));

          // Check if the user is already registered for this event
          const isRegistered = registrationStatus[eventId];
          if (isRegistered === true) {
            navigate(`/events/${eventId}`);
          } else {
            navigate(redirectPath);
          }
        } else {
          navigate(redirectPath);
        }
      } else {
        // Default redirect based on user role
        if (userRole === "organizer") {
          navigate("/dashboard");
        } else if (userRole === "attendee") {
          navigate("/attendee/dashboard");
        } else {
          console.error("Unknown role:", userRole);
          navigate("/"); // Fallback to home page
        }
      }
    } catch (error) {
      setError(error.message);
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="text-white text-center p-8 max-w-lg">
          <Carousel
            showArrows={true}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
            interval={3000}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 1"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-lg">Create and manage events effortlessly</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 2"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-lg">Engage with your audience</p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1528605105345-5344ea20e269?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Feature 3"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                <p className="text-lg">Grow your community</p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Sign In to EventPro
          </h2>
          {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-purple-500" />
                <span className="ml-2 text-gray-700">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-purple-500 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
            >
              Sign In
            </button>
            <div className="mt-4">
              <button className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-300 mb-2">
                Sign in with Google
              </button>
              <button className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition duration-300">
                Sign in with Facebook
              </button>
            </div>
            <p className="mt-6 text-center text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-purple-600 hover:underline">
                Sign up
              </Link>
            </p>
            <p className="mt-4 text-center text-gray-700">
              <Link to="/events" className="text-purple-600 hover:underline">
                Explore Events
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;