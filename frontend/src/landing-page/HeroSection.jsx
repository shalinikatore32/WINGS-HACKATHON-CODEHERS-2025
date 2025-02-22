import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroSection() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50fGVufDB8fDB8fHww",
    },
  ];

  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-blue-900 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center md:space-x-8">
        <div className="md:w-1/2 text-left">
          <h2 className="text-sm font-semibold text-teal-400 mb-2">
            ALL-IN-ONE EVENT MANAGEMENT PLATFORM
          </h2>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Elevate Your Events to the Next Level
          </h1>
          <p className="text-base md:text-lg mb-6">
            Discover tools and features designed to make your event planning
            seamless and impactful.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-black px-6 py-3 rounded-full hover:bg-gray-200 transition duration-300 ease-in-out">
              REQUEST DEMO
            </button>
            <button className="flex items-center justify-center text-white border border-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition duration-300 ease-in-out">
              <span>WATCH OVERVIEW</span>
              <svg
                className="w-4 h-4 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11.414V13a1 1 0 001.707.707l3-3a1 1 0 000-1.414l-3-3A1 1 0 009 6.586z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0 w-full">
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="flex justify-center">
                <img
                  src={slide.image}
                  alt={`Slide ${index}`}
                  className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
