import React from "react";
import PropertySlider from "./PropertySlider";
import MostLiked from "./most_like";
import PropertySearchAndFilter from "./PropertySearchAndFilter";  // Import the new component
import "../styles.css";

const Home = () => {
  return (
    <div className="home-container">
      {/* Property Slider Section */}
      <PropertySlider />

      {/* Property Search and Filter Section */}
      <PropertySearchAndFilter />

      {/* Most Liked Section */}
      <MostLiked />
    </div>
  );
};

export default Home;
