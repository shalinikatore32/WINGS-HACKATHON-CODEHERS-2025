import React from "react";

import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import ImageCarousel from "./ImageCarousel";
import EventTypesSection from "./EventTypeSection";
import FeaturesSection from "./FeaturesSection";
import Categories from "./Categories";
import PublicEventsSection from "./PublicEventsSection";
import Footer from "./Footer";

function LandingPage() {
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
    </div>
  );
}

export default LandingPage;
