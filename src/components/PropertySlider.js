import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configs/config";
import SliderSkeleton from "../Skeletons/SliderSkeleton"; // Import the skeleton

const PreviousArrow = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow-left`} style={{ ...style }} onClick={onClick}></div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div className={`${className} custom-arrow-right`} style={{ ...style }} onClick={onClick}></div>
);

const PropertySlider = () => {
  const navigate = useNavigate();
  const [sliderData, setSliderData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch slider data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/slider/`);
        const filteredData = response.data.filter(property => property.isActive);
        setSliderData(filteredData);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchData();
  }, []);

  const settings = {
    dots: true,
    infinite: sliderData.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: sliderData.length > 1,
    autoplaySpeed: 4000,
    prevArrow: sliderData.length > 1 ? <PreviousArrow /> : null,
    nextArrow: sliderData.length > 1 ? <NextArrow /> : null,
  };

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="slider-container">
      {loading ? (
        <div className="loading-container">
            <SliderSkeleton />
        </div>
      ) : (
        <Slider {...settings}>
          {sliderData.map(({ _id, property }) => (
            <div
              className="slider-item"
              key={_id}
              onClick={() => handleViewProperty(property._id)}
            >
              <img
                src={property.images[0]} 
                alt={property.title}
                className="slider-image"
              />
              <div className="property-details">
                <h3>{property.title}</h3>
                <p>{property.city}, {property.state}</p>
                <p>Price: ₹{property.monthlyRent}</p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PropertySlider;
