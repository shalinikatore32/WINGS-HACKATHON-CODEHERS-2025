import React from "react";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const events = {
  live: [
    {
      id: 1,
      title: "Live Music Concert",
      date: "Today",
      location: "New York, NY",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?q=80&w=2070&auto=format&fit=crop",
    },
  ],
  upcoming: [
    {
      id: 2,
      title: "Tech Conference 2023",
      date: "March 15, 2023",
      location: "San Francisco, CA",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2070&auto=format&fit=crop",
    },
  ],
  previous: [
    {
      id: 3,
      title: "Art & Design Expo",
      date: "January 10, 2023",
      location: "Los Angeles, CA",
      image:
        "https://images.unsplash.com/photo-1559537696-0da4f948c83f?q=80&w=1781&auto=format&fit=crop",
    },
  ],
};

const Section = ({ id, title, events, bg }) => (
  <section id={id} className={`py-16 ${bg}`}>
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <h2 className="text-4xl font-bold text-center mb-10 text-gray-800 capitalize">
        {title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {events.map((event) => (
          <Link to={`/event/${event.id}`} key={event.id}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
              <div className="relative h-56">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold uppercase">
                    {event.date}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.location}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);

function EventsPage() {
  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-200 min-h-screen">
      <div className="sticky top-0 bg-white shadow-md z-10">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-center space-x-8">
          {Object.keys(events).map((key) => (
            <a
              key={key}
              href={`#${key}-events`}
              className="text-indigo-600 hover:text-indigo-800 font-semibold uppercase"
            >
              {key.charAt(0).toUpperCase() + key.slice(1)} Events
            </a>
          ))}
        </nav>
      </div>

      <Section
        id="live-events"
        title="Live Events"
        events={events.live}
        bg="bg-indigo-50"
      />
      <Section
        id="upcoming-events"
        title="Upcoming Events"
        events={events.upcoming}
        bg="bg-purple-50"
      />
      <Section
        id="previous-events"
        title="Previous Events"
        events={events.previous}
        bg="bg-gray-50"
      />

      <Footer />
    </div>
  );
}

export default EventsPage;
