import React, { useState } from "react";
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
  </div>
);

const NextArrow = ({ className, style, onClick }) => (
  <div
    className={`${className} custom-arrow-right`}
    style={{ ...style }}
    onClick={onClick}
  >
  </div>
);

const Home = () => {
  const [city, setCity] = useState("Any");
  const [category, setCategory] = useState("Any");
  const [bedrooms, setBedrooms] = useState("Any");
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState("Low to High");

  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
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

      {/* Search and Filter Box */}
      <div className="search-filter-container">
        <div className="filter-row">
          {/* City Input */}
          <div className="filter-item">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              placeholder="Any"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>

          {/* Category Dropdown */}
          <div className="filter-item">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Any">Any</option>
              <option value="Apartment">Apartment</option>
              <option value="Studio">Studio</option>
              <option value="Villa">Villa</option>
            </select>
          </div>

          {/* Bedrooms Input */}
          <div className="filter-item">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              placeholder="Any"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              min="1"
            />
          </div>
        </div>

        {/* Price Range Slider */}
        <div className="filter-row">
          <label htmlFor="priceRange">Price Range: ₹{priceRange}</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="50000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>

        {/* Sort by Price */}
        <div className="filter-row">
          <label htmlFor="sortOrder">Sort By Price:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="filter-row">
          <button className="search-button">Search</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
