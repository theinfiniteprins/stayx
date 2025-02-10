import React, { useEffect } from "react";
import PropertySlider from "./PropertySlider";
import MostLiked from "./MostLiked";
import PropertySearchAndFilter from "./PropertySearchAndFilter";
import "../styles.css";
import { Helmet } from 'react-helmet-async';

const Home = () => {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key': '0ffcb80c532d895696e3edfbdbe97586',
        'format': 'iframe',
        'height': 90,
        'width': 728,
        'params': {}
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.type = "text/javascript";
    script2.src = "//www.highperformanceformat.com/0ffcb80c532d895696e3edfbdbe97586/invoke.js";
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="home-container">
      <Helmet>
        <title>StayX</title>
        <meta name="description" content="Find your dream rental home on StayX. Explore verified listings, compare properties, and make your move easy." />
      </Helmet>

      {/* Property Slider Section */}
      <PropertySlider />

      {/* Property Search and Filter Section */}
      <PropertySearchAndFilter />

      {/* Most Liked Section */}
      <MostLiked />

      {/* Ad Banner */}
      <div id="ad-banner" className="flex justify-center mt-4">
        <iframe
          src="//www.highperformanceformat.com/0ffcb80c532d895696e3edfbdbe97586/invoke.js"
          width="728"
          height="90"
          style={{ border: "none", overflow: "hidden" }}
          title="Ad Banner"
        ></iframe>
      </div>
    </div>
  );
};

export default Home;
