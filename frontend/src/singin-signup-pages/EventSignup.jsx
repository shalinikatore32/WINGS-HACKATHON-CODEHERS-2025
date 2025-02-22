import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Link, useNavigate } from "react-router-dom";

// Custom hook for typing effect
function useTypingEffect(texts, typingSpeed = 100, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState("");
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (currentTextIndex === texts.length) return;

    if (isDeleting) {
      if (currentCharIndex > 0) {
        setTimeout(() => {
          setCurrentCharIndex(currentCharIndex - 1);
        }, typingSpeed / 2);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
      }
    } else {
      if (currentCharIndex < texts[currentTextIndex].length) {
        setTimeout(() => {
          setCurrentCharIndex(currentCharIndex + 1);
        }, typingSpeed);
      } else {
        setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    }
  }, [
    currentCharIndex,
    isDeleting,
    texts,
    typingSpeed,
    pauseDuration,
    currentTextIndex,
  ]);

  useEffect(() => {
    setDisplayText(texts[currentTextIndex].substring(0, currentCharIndex));
  }, [currentCharIndex, currentTextIndex, texts]);

  return displayText;
}

function EventSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee", // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();

      console.log("User registered successfully:", data);
      navigate("/signin");
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  const typingText = useTypingEffect([
    "Create, manage, and grow your events with ease.",
    "Connect with your audience and expand your reach.",
    "Empower your events with our platform today!",
  ]);

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
        <div className="text-white text-center mt-6 px-8">
          <p className="text-lg">{typingText}</p>
        </div>
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Create an Account on EventPrep
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
                required
              />
            </div>
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
            <div className="mb-4">
              <label className="block text-gray-700">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-purple-500"
              >
                <option value="attendee">attendee</option>
                <option value="organizer">organizer</option>
                <option value="guest">guest</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventSignup;
