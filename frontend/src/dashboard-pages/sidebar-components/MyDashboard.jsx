import React, { useEffect, useState } from "react";
import { useEventContext } from "../../context/EventProvider";
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const BASE_URL = process.env.REACT_APP_API_URL;
const EventAnalytics = () => {
  const [analytics, setAnalytics] = useState({ public_events: 0, private_events: 0 });
  const [eventAttendees, setEventAttendees] = useState([]); // Store event attendee data
  const [eventTrends, setEventTrends] = useState([]); // Store event trends data
  const { authorizedToken, user } = useEventContext();

  useEffect(() => {
    if (!user || !user._id) {
      console.error("User is not available.");
      return;
    }

    console.log("User ID:", user._id);

    // Fetch event analytics (Public vs Private)
    const fetchAnalytics = async () => {
      try {
        const response = await fetch(`${BASE_URL}/analytics/${user._id}`, {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch analytics");
        }

        const data = await response.json();
        console.log("Analytics Data:", data);
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };

    // Fetch event attendees per event
    const fetchEventAttendees = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${user._id}/attendees`, {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event attendees");
        }

        const data = await response.json();
        console.log("Event Attendees Data:", data);
        setEventAttendees(data);
      } catch (error) {
        console.error("Error fetching event attendees:", error);
      }
    };

    // Fetch monthly event trends
    const fetchEventTrends = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${user._id}/event-trends`, {
          method: "GET",
          headers: {
            Authorization: authorizedToken,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch event trends");
        }

        const data = await response.json();
        console.log("Event Trends Data:", data);

        // Convert numeric months (1, 2, 3, ...) to month names
        const formattedData = data.map((item) => ({
          month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][item._id - 1], 
          count: item.count,
        }));

        setEventTrends(formattedData);
      } catch (error) {
        console.error("Error fetching event trends:", error);
      }
    };

    fetchAnalytics();
    fetchEventAttendees();
    fetchEventTrends();
  }, [authorizedToken, user]); // Dependency array includes `user`

  // Pie Chart Data (Public vs Private Events)
  const pieChartData = [
    { name: "Public Events", value: analytics.public_events },
    { name: "Private Events", value: analytics.private_events },
  ];
  const COLORS = ["#0088FE", "#FFBB28"]; // Colors for Pie Chart

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Event Analytics</h2>

      {/* Pie Chart for Public vs Private Events */}
      <PieChart width={400} height={300}>
        <Pie
          data={pieChartData}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label
        >
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>

      {/* Bar Chart for Event Attendee Count */}
      <h3>Attendees per Event</h3>
      <BarChart width={600} height={300} data={eventAttendees}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="eventName" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="attendeeCount" fill="#82ca9d" />
      </BarChart>

      {/* Line Chart for Monthly Event Trends */}
      <h3>Monthly Event Trends</h3>
      <LineChart width={600} height={300} data={eventTrends}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#FF5733" />
      </LineChart>
    </div>
  );
};

export default EventAnalytics;