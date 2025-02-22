import React from "react";
import {
  FaUserFriends,
  FaLock,
  FaHeadset,
  FaCalendarCheck,
  FaChartLine,
  FaMobileAlt,
} from "react-icons/fa";

function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white relative">
      <div className="absolute inset-0 bg-black opacity-50">
        <img
          src="https://media.istockphoto.com/id/1400711760/photo/abstract-graphic-wave-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=rucjCqhDYu1FHHbzJ-hxRE1FhRs00eTEaFEqOe4kYwo="
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <FeatureCard
            icon={<FaUserFriends className="text-teal-400 w-16 h-16 mb-4" />}
            title="Easy to Use"
            description="Our platform is user-friendly and easy to navigate, ensuring a seamless experience for all users."
          />
          <FeatureCard
            icon={<FaLock className="text-teal-400 w-16 h-16 mb-4" />}
            title="Secure"
            description="We prioritize your security and privacy with top-notch encryption and data protection."
          />
          <FeatureCard
            icon={<FaHeadset className="text-teal-400 w-16 h-16 mb-4" />}
            title="24/7 Support"
            description="Our support team is available around the clock to assist you with any queries."
          />
          <FeatureCard
            icon={<FaCalendarCheck className="text-teal-400 w-16 h-16 mb-4" />}
            title="Event Management"
            description="Efficiently manage your events with our comprehensive tools and features."
          />
          <FeatureCard
            icon={<FaChartLine className="text-teal-400 w-16 h-16 mb-4" />}
            title="Analytics"
            description="Gain insights with detailed analytics to track your event's performance."
          />
          <FeatureCard
            icon={<FaMobileAlt className="text-teal-400 w-16 h-16 mb-4" />}
            title="Mobile Friendly"
            description="Access and manage your events on the go with our mobile-friendly platform."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-center">{icon}</div>
      <h4 className="text-2xl font-bold text-center mb-2 text-white">
        {title}
      </h4>
      <p className="text-center text-gray-300">{description}</p>
    </div>
  );
}

export default FeaturesSection;
