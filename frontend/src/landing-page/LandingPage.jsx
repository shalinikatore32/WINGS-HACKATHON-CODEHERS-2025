import React from "react";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ImageCarousel from "./ImageCarousel";
import EventTypesSection from "./EventTypeSection";
import FeaturesSection from "./FeaturesSection";
import Categories from "./Categories";
import PublicEventsSection from "./PublicEventsSection";
import Footer from "./Footer";
import image from "../assets/image.gif";
import { useState } from "react";

function LandingPage() {
  const [isChatbotVisible, setIsChatbotVisible] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotVisible((prev) => !prev);
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <ImageCarousel />
        <EventTypesSection />
        <FeaturesSection />
        <Categories />
        <PublicEventsSection />
      </main>
      <Footer />
      <div className="bottom-right-ui fixed bottom-5 right-5 p-2 rounded-lg">
        <div className="robot-icon" onClick={toggleChatbot}>
          <img
            src={image}
            alt="Chatbot"
            className="w-36 h-auto cursor-pointer transition-transform duration-300 ease-in-out hover:scale-110"
          />
        </div>
      </div>

      {/* Chatbot iframe */}
      {isChatbotVisible && (
        <iframe
          id="chatbot"
          allow="microphone;"
          width="350"
          height="430"
          src="https://console.dialogflow.com/api-client/demo/embedded/4f7372a8-f89e-48cd-9f54-71c6289e9db8"
          className="fixed bottom-28 right-5 border-none z-50"
        />
      )}
    </div>
   
  );
}

export default LandingPage;
