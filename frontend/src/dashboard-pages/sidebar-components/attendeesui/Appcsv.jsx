import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

function Appcsv() {
  const [file, setFile] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const message = "";

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/attendees`);
      console.log("Fetched contacts:", response.data);
      setContacts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Error fetching contacts:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("❌ Please select a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(`${BASE_URL}/uploads`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("File uploaded:", response);
      fetchContacts();
      alert("File uploaded and contacts added successfully!");
    } catch (error) {
      console.error("❌ Error uploading file:", error);
      alert("❌ Error uploading file.");
    }
  };

  return (
    <div className="flex h-screen w-full bg-gray-100 p-5">
      <div className="flex-1 p-6 bg-blue-600 text-white rounded-lg shadow-lg flex flex-col">
        <h2 className="text-3xl font-bold text-center mb-6">
          📤 Upload CSV File
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="p-2 border border-gray-300 rounded-md text-black"
          />
          <button
            onClick={handleFileUpload}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300"
          >
            📤 Upload CSV
          </button>
        </div>

        {message && (
          <p
            className={`mt-4 font-semibold ${
              message.includes("successfully")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <h2 className="text-3xl font-bold text-center mb-4">
          📋 Attendee List
        </h2>

        {loading ? (
          <p className="text-center">Loading attendees...</p>
        ) : (
          <div className="flex-grow overflow-y-auto bg-white rounded-md p-4 shadow-inner">
            <table className="w-full border-collapse text-black">
              <thead>
                <tr className="bg-blue-800 text-white">
                  <th className="p-3">Name</th>
                  <th className="p-3">Phone Number</th>
                  <th className="p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {contacts.length > 0 ? (
                  contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      className="text-center border-b border-gray-300 hover:bg-gray-100 transition duration-300"
                    >
                      <td className="p-3">{contact.name}</td>
                      <td className="p-3">{contact.phoneNumber}</td>
                      <td className="p-3">{contact.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="text-center p-3">
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

export default Appcsv;
