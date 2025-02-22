import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
 
const BASE_URL=process.env.REACT_APP_BASE_URL;
const AttendancePage = () => {
  const [searchParams] = useSearchParams();
  
  const eventId = searchParams.get("name");
  const attendeeId = searchParams.get("email");
  const token = searchParams.get("token");

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isMarked, setIsMarked] = useState(false);

  const [feedback, setFeedback] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);


  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const markAttendance = async () => {
    try {
      const response = await fetch("http://localhost:5000/attendees/mark", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          latitude: location.latitude,
          longitude: location.longitude,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setIsMarked(true);
        alert("Attendance marked successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
      alert("An error occurred while marking attendance.");
    }

    
  };
  const submitFeedback = async () => {
    
    try {
      const response = await fetch("http://localhost:5000/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
         
          token, 
          feedback,
        }),
      });
      
      const result = await response.json();
      if (response.ok) {
        setFeedbackSubmitted(true);
        alert("Feedback submitted successfully!");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("An error occurred while submitting feedback.");
    }
  }

  return (
    <div>
      <h1>Mark Attendance</h1>
      {!isMarked ? (
        <div>
          <button onClick={getLocation}>Get Current Location</button>
          {location.latitude && location.longitude && (
            <div>
              <p>Latitude: {location.latitude}</p>
              <p>Longitude: {location.longitude}</p>
              <button onClick={markAttendance}>Mark Attendance</button>
            </div>
          )}
        </div>
      ) : (
        <div>
        <p>Attendance has been marked!</p>
        {!feedbackSubmitted ? (
          <div>
            <textarea
              placeholder="Leave your feedback here..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <button onClick={submitFeedback}>Submit Feedback</button>
          </div>
        ) : (
          <p>Thank you for your feedback!</p>
        )}
      </div>

      )}
    </div>
  );
};

export default AttendancePage;

