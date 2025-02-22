import React from "react";
import { FaPlus, FaBullhorn } from "react-icons/fa";

function MainContent() {
  return (
    <div className="p-6 bg-gray-100 flex-1 overflow-y-auto">
      <DashboardOverview />
      <MyEvents />
      <Attendees />
    </div>
  );
}

function DashboardOverview() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card title="Events Summary" content={<EventsSummary />} />
        <Card title="Revenue Chart" content={<RevenueChart />} />
        <Card title="Attendee Analytics" content={<AttendeeAnalytics />} />
        <Card title="Quick Actions" content={<QuickActions />} />
      </div>
    </section>
  );
}

function Card({ title, content }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      {content}
    </div>
  );
}

function EventsSummary() {
  return (
    <div>
      <p>Upcoming: 5</p>
      <p>Past: 10</p>
    </div>
  );
}

function RevenueChart() {
  return (
    <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
      <span className="text-gray-500">[Chart Placeholder]</span>
    </div>
  );
}

function AttendeeAnalytics() {
  return (
    <div className="h-32 bg-gray-200 rounded flex items-center justify-center">
      <span className="text-gray-500">[Analytics Placeholder]</span>
    </div>
  );
}

function QuickActions() {
  return (
    <div className="flex flex-col space-y-2">
      <button className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200">
        <FaPlus className="mr-2" /> Create Event
      </button>
      <button className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200">
        <FaBullhorn className="mr-2" /> Send Announcement
      </button>
    </div>
  );
}

function MyEvents() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">My Events</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Event Name</th>
              <th className="text-left py-2">Date</th>
              <th className="text-left py-2">Location</th>
              <th className="text-left py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2">Event 1</td>
              <td className="py-2">2023-12-01</td>
              <td className="py-2">New York</td>
              <td className="py-2">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline ml-2">
                  Delete
                </button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Attendees() {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Attendees</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Name</th>
              <th className="text-left py-2">Ticket Type</th>
              <th className="text-left py-2">Check-in Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-100">
              <td className="py-2">John Doe</td>
              <td className="py-2">VIP</td>
              <td className="py-2">Checked In</td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default MainContent;
