import React from "react";
import PropertySlider from "./PropertySlider";
import MostLiked from "./MostLiked";
import PropertySearchAndFilter from "./PropertySearchAndFilter";  
import "../styles.css";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const handleAdClick = () => {
    console.log("Ad clicked");
    window.location.href = "https://www.effectiveratecpm.com/vjxkp0huc?key=f2410c4d49edd3da615dad6e32eeb2fd";
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>StayX</title>
        <meta name="description" content="Find your dream rental home on StayX. Explore verified listings, compare properties, and make your move easy." />
      </Helmet>
      
      {/* Property Slider Section */}
      <PropertySlider />

      {/* Special Offer Section - renamed from Advertisement */}
      <div className="special-offer-container" style={{ textAlign: "center", margin: "20px 0" }}>
        <button 
          onClick={handleAdClick} 
          className="special-offer-button"  /* renamed from ad-button */
          style={{
            padding: "10px 20px",
            backgroundColor: "#ff4081",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold"
          }}
        >
          ✨ Special Offer! {/* changed from 🔥 Check Out This Offer! */}
        </button>
      </div>

      {/* Property Search and Filter Section */}
      <PropertySearchAndFilter />

      {/* Most Liked Section */}
      <MostLiked />
    </div>
  );
};

export default Home;
