import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

function Appinvites() {
  const { eventId } = useParams(); // Get event ID from URL params
  const navigate = useNavigate(); // Hook to navigate programmatically
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [imagePath, setImagePath] = useState(null);

  useEffect(() => {
    if (!eventId) return; // Ensure eventId is available
console.log(eventId);
    fetch(`${BASE_URL}/events/${eventId}/attendees`)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching attendees:", error);
        setLoading(false);
      });
  }, [eventId]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) {
      setMessage("❌ Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch(`${BASE_URL}/upload-image`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Image uploaded successfully! Now you can send emails.");
        setImagePath(result.filePath);
      } else {
        setMessage("❌ Failed to upload image: " + result.message);
      }
    } catch (error) {
      console.error("❌ Error uploading image:", error);
      setMessage("❌ Error uploading image.");
    }
  };

  const sendEmail = async () => {
    if (!imagePath) {
      setMessage("❌ Please upload an image before sending emails.");
      return;
    }

    const emailData = {
      message: "Here is your invitation!",
      subject: "Invitation to the Event",
      attendees: attendees.map((attendee) => attendee.email),
      fileUrl: imagePath,
    };

    setSending(true);
    setMessage("");

    try {
      const response = await fetch(`${BASE_URL}/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email: " + response.statusText);
      }

      const result = await response.json();
      console.log("✅ Email sent:", result);

      setMessage("✅ Emails sent successfully!");
    } catch (error) {
      console.error("❌ Error sending email:", error);
      setMessage("❌ Error sending emails.");
    } finally {
      setSending(false);
    }
  };

  

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f4f4f4",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {/* Left Section - Upload & Send Email */}
      <div
        style={{
          flex: "1",
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h2 style={{ color: "black" }}>📤 Send Invitation</h2>

        {/* Upload File Input & Button (Side by Side) */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "10px" }}>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button
            onClick={uploadFile}
            style={{
              padding: "10px 15px",
              fontSize: "16px",
              backgroundColor: "whitesmoke",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            📤 
          </button>
        </div>

        {/* Image Preview */}
        {preview && (
          <div style={{ marginTop: "15px" }}>
            <img src={preview} alt="Selected File" style={{ width: "100%", maxWidth: "300px", borderRadius: "10px" }} />
          </div>
        )}

        <br />

        {/* Send Email Button */}
        <button
          onClick={sendEmail}
          disabled={sending}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: sending ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: sending ? "not-allowed" : "pointer",
            marginTop: "20px",
          }}
        >
          {sending ? "📩 Sending..." : "✉️ Send Email"}
        </button>

        {/* Add Attendee Button */}
       <Link to={`/dashboard/events/${eventId}/add-attendee`}>
  <button
    style={{
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#28a745",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "10px",
    }}
  >
    ➕ Add Attendee
  </button>
</Link>

        {/* Message Feedback */}
        {message && (
          <p
            style={{
              marginTop: "10px",
              fontWeight: "bold",
              color: message.includes("successfully") ? "green" : "red",
            }}
          >
            {message}
          </p>
        )}
      </div>

      {/* Right Section - Attendee List with Scrollbar */}
      <div
        style={{
          flex: "2",
          padding: "20px",
          backgroundColor: "#007bff",
          color: "white",
          borderRadius: "10px",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2 style={{ textAlign: "center" }}>📋 Attendee List</h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading attendees...</p>
        ) : (
          <div
            style={{
              flexGrow: 1,
              overflowY: "auto",
              backgroundColor: "white",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <table
              border="1"
              style={{
                width: "100%",
                borderCollapse: "collapse",
                color: "black",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#0056b3", color: "white" }}>
                  <th style={{ padding: "10px" }}>Name</th>
                  <th style={{ padding: "10px" }}>Phone Number</th>
                  <th style={{ padding: "10px" }}>Email</th>
                </tr>
              </thead>
              <tbody>
                {attendees.length > 0 ? (
                  attendees.map((attendee) => (
                    <tr key={attendee._id} style={{ textAlign: "center" }}>
                      <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{attendee.name}</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{attendee.phoneNumber}</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>{attendee.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ textAlign: "center", padding: "10px" }}>
                      No attendees found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Appinvites;