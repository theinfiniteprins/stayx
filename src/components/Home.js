// src/components/Home.js
import React from "react";
import Slider from "react-slick";
import "../styles.css";

// Dummy data for the slider
const sliderData = [
  {
    id: 1,
    image: "/images/property1.jpg",
    title: "Cozy Apartment",
    city: "Nadiad",
    price: "12000",
  },
  {
    id: 2,
    image: "/images/property2.png",
    title: "Spacious Studio",
    city: "Gujarat",
    price: "15000",
  },
  {
    id: 3,
    image: "/images/property3.jpg",
    title: "Modern Flat",
    city: "Ahmedabad",
    price: "18000",
  },
];

// Custom arrow components
const PreviousArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow-left`}
    style={{ ...style }}
    onClick={onClick}
  >
    {/* <i className="fa fa-chevron-left" aria-hidden="true"></i> */}
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow-right`}
    style={{ ...style }}
    onClick={onClick}
  >
    {/* <i className="fa fa-chevron-right" aria-hidden="true"></i> */}
  </div>
);

const Home = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000, // Updated time to 4 seconds
    prevArrow: <PreviousArrow />, // Custom left arrow
    nextArrow: <NextArrow />, // Custom right arrow
  };

  return (
    <div className="home-container">
      <div className="slider-container">
        <Slider {...settings}>
          {sliderData.map((property) => (
            <div className="slider-item" key={property.id}>
              <img
                src={property.image}
                alt={property.title}
                className="slider-image"
              />
              <div className="property-details">
                <h3>{property.title}</h3>
                <p>{property.city}</p>
                <p>Price: ₹{property.price}</p>
                <a
                  href={`/property/${property.id}`}
                  className="view-property-button"
                >
                  <i className="fa fa-eye" aria-hidden="true"></i> View Property
                </a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Home;
