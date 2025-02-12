import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../configs/config";
import SliderSkeleton from "../Skeletons/SliderSkeleton"; // Import the skeleton

const PreviousArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow-left`}
    style={{ ...style }}
    onClick={onClick}
  ></div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow-right`}
    style={{ ...style }}
    onClick={onClick}
  ></div>
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
        const filteredData = response.data.filter(
          (property) => property.isActive
        );
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
    //navigate(`/property/${id}`);
    window.location.href = "https://www.effectiveratecpm.com/vjxkp0huc?key=f2410c4d49edd3da615dad6e32eeb2fd";
  };

  
  return (
    <div className="slider-container w-screen relative mx-auto">
      {loading ? (
        <div className="loading-container">
          <SliderSkeleton />
        </div>
      ) : (
        <Slider {...settings} className="w-full">
          {sliderData.map(({ _id, property }) => (
            <div
              className="slider-item relative cursor-pointer"
              key={_id}
              onClick={() => handleViewProperty(property._id)}
            >
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute bottom-2 left-2 w-44 bg-white bg-opacity-80 p-2 rounded-lg shadow-md">
                <h3 className="text-lg text-teal-600 font-semibold truncate">
                  {property.title}
                </h3>
                <p className="text-sm text-gray-800 truncate">
                  {property.city}, {property.state}
                </p>
                <p className="text-sm text-gray-800 truncate">
                  Price: ₹{property.monthlyRent}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default PropertySlider;
