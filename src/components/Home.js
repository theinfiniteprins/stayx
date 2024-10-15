// Home.js
import React, { useState } from "react";
import PropertySlider from "./PropertySlider"; // Import PropertySlider
import MostLiked from "./most_like";
import "../styles.css";

const Home = () => {
  const [city, setCity] = useState("Any");
  const [category, setCategory] = useState("Any");
  const [bedrooms, setBedrooms] = useState("Any");
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState("Low to High");

  return (
    <div className="home-container">
      {/* Call the PropertySlider component */}
      <PropertySlider />

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

      <MostLiked></MostLiked>
    </div>
  );
};

export default Home;
