import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_API_URL;

function Appm() {
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    email: "",
  });
  const [contacts, setContacts] = useState([]);
  const { eventId } = useParams();
  const navigate = useNavigate();
  console.log(eventId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchContacts();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/events/${eventId}/attendees`);
      if (!response.ok) {
        throw new Error("Failed to fetch contacts");
      }
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phoneNumber || !formData.email) return;

    try {
      const response = await fetch(`${BASE_URL}/events/${eventId}/attendees`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      const newContact = await response.json();
      setContacts([...contacts, newContact]);
      setFormData({ name: "", phoneNumber: "", email: "" });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleBackToInvite = () => {
    navigate(`/dashboard/attendees/${eventId}/send-invites`);
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 p-5">
      <div className="flex-1 p-6 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">Add Attendee</h2>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md"
          >
            ➕ Add Attendee
          </button>
        </form>
        <button
          onClick={handleBackToInvite}
          className="w-full py-2 mt-4 bg-gray-600 text-white rounded-md"
        >
          🔙 Back to Invite Page
        </button>
      </div>
      <div className="flex-1 p-6 bg-blue-100 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-blue-800 text-center mb-4">
          Attendee List
        </h2>
        <div className="overflow-y-auto max-h-96 bg-white rounded-md shadow-inner p-4">
          <table className="w-full border-collapse">
            <thead className="bg-blue-200 text-blue-800">
              <tr>
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Phone</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Present</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 ? (
                contacts.map((contact, index) => (
                  <tr
                    key={contact._id}
                    className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                  >
                    <td className="p-3 text-blue-600">{contact.name}</td>
                    <td className="p-3 text-blue-600">{contact.phoneNumber}</td>
                    <td className="p-3 text-blue-600">{contact.email}</td>
                    <td className="p-3 text-blue-600">
                      {contact.isPresent ? "✅" : "❌"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-3 text-gray-500">
                    No attendees found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Appm;