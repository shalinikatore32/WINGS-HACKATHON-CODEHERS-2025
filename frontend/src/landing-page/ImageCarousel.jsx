import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ImageCarousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
      title: "Exciting Events",
      description: "Discover events that match your passion.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
      title: "Unforgettable Experiences",
      description: "Join us for unforgettable experiences.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGV2ZW50fGVufDB8fDB8fHww",
      title: "Create Memories",
      description: "Make memories that last a lifetime.",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1663089174939-5870e2e8d62e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZXZlbnR8ZW58MHx8MHx8fDA%3D",
      title: "Explore New Horizons",
      description: "Explore new horizons with us.",
    },
    {
      image:
        "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGV2ZW50fGVufDB8fDB8fHww",
      title: "Join the Adventure",
      description: "Join the adventure and explore the world.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center md:space-x-8">
      <div className="w-full md:w-1/2">
        <Slider {...settings}>
          {slides.map((slide, index) => (
            <div key={index} className="relative flex justify-center">
              <img
                src={slide.image}
                alt={`Slide ${index}`}
                className="w-full h-64 md:h-80 lg:h-96 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white p-4 rounded-lg">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg">{slide.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="w-full md:w-1/2 mt-8 md:mt-0 text-center md:text-left">
        <h2 className="text-4xl font-bold mb-4 text-blue-900">
          Welcome to Our Event Platform
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Our platform offers a seamless experience for managing and attending
          events. Whether you're looking to host a conference or join a
          workshop, we have the tools you need to succeed.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition duration-300 ease-in-out">
          Learn More
        </button>
      </div>
    </div>
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} text-blue-600`}
      style={{ ...style, display: "block", right: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      &gt;
    </div>
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} text-blue-600`}
      style={{ ...style, display: "block", left: "10px", zIndex: 1 }}
      onClick={onClick}
    >
      &lt;
    </div>
  );
}

export default ImageCarousel;
