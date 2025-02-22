import React from "react";

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-2xl font-bold mb-2">{title}</h4>
      <p>{description}</p>
    </div>
  );
}

export default FeatureCard;
