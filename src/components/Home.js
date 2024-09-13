// src/components/Home.js
import React from 'react';
import Slider from 'react-slick';
import '../styles.css';

// Dummy data for the slider; in a real application, this would come from an API or state
const propertyImages = [
  '/images/property1.jpg',
  '/images/property2.png',
  '/images/property3.jpg',
];

const Home = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,        // Enable autoplay
    autoplaySpeed: 7000    // Set autoplay interval to 7 seconds (7000 milliseconds)
  };

  return (
    <div className="home-container">
      <div className="slider-container">
        <Slider {...settings}>
          {propertyImages.map((image, index) => (
            <div key={index} className="slider-item">
              <img src={image} alt={`Property ${index + 1}`} className="slider-image" />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
