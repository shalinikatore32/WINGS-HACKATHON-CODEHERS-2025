import React from "react";

function EventHostingSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center">
        <div className="md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            The simplest way to host all your events
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Manage your events seamlessly with our intuitive platform, tailored
            to your needs. Whether it's a small meetup or a large conference,
            we've got you covered.
          </p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out">
            Start Hosting
          </button>
        </div>
        <div className="md:w-1/2 mt-6 md:mt-0">
          <img
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8YWxsfDEwfHx8fHx8fHwxNjk3MDg4NzA3&ixlib=rb-1.2.1&q=80&w=1080"
            alt="Hosting Events"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}

export default EventHostingSection;
