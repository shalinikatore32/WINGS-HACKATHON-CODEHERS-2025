import React from "react";

function EventTypesSection() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">
          The simplest way to host all your events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EventTypeCard
            title="Public events"
            description="Open to everyone, maximize your reach"
            image="https://plus.unsplash.com/premium_photo-1664302644902-7bf58fa20ef9?q=80&w=1968&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            gradient="bg-gradient-to-r from-green-500 via-blue-500 to-purple-500"
          />
          <EventTypeCard
            title="Private events"
            description="Exclusive gatherings for select audiences"
            image="https://plus.unsplash.com/premium_photo-1713720664635-ac557cf7465d?q=80&w=2049&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            gradient="bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500"
          />
        </div>
      </div>
    </section>
  );
}

function EventTypeCard({ title, description, image, gradient }) {
  return (
    <div
      className={`p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out ${gradient}`}
    >
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      <p className="mb-4">{description}</p>
      <button className="bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out">
        Explore More
      </button>
      <div className="mt-4">
        <img
          src={image}
          alt={title}
          className="w-full h-40 object-cover rounded-lg"
        />
      </div>
    </div>
  );
}

export default EventTypesSection;