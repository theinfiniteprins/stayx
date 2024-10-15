import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configs/config";

const PreviousArrow = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow-left`} style={{ ...style }} onClick={onClick}></div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow-right`} style={{ ...style }} onClick={onClick}></div>
);

const PropertySlider = () => {
  const navigate = useNavigate();
  const [sliderData, setSliderData] = useState([]);

  // Fetch slider data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/slider/`);
        const filteredData = response.data.filter(property => property.isActive); // Only show active properties
        setSliderData(filteredData);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: sliderData.length > 1,  // Disable infinite scrolling if there's only one property
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: sliderData.length > 1,  // Disable autoplay if there's only one property
    autoplaySpeed: 4000,
    prevArrow: sliderData.length > 1 ? <PreviousArrow /> : null,  // Hide arrows if only one property
    nextArrow: sliderData.length > 1 ? <NextArrow /> : null,
  };

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {sliderData.map(({ _id, property }) => (
          <div
            className="slider-item"
            key={_id}
            onClick={() => handleViewProperty(property._id)}
          >
            <img
              src={property.images[0]} // Assuming the first image in the array
              alt={property.title}
              className="slider-image"
            />
            <div className="property-details">
              <h3>{property.title}</h3>
              <p>{property.city}, {property.state}</p>
              <p>Price: ₹{property.monthlyRent}</p>
              <a
                className="view-property-button"
                onClick={() => handleViewProperty(property._id)}
              >
                <i className="fa fa-eye" aria-hidden="true"></i> View Property
              </a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PropertySlider;
