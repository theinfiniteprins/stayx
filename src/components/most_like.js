// MostLiked.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard"; // Use the PropertyCard component
import { useNavigate } from "react-router-dom";

const MostLiked = () => {
  const [mostLikedProperties, setMostLikedProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch properties and sort by likeCount in descending order
  useEffect(() => {
    const fetchMostLikedProperties = async () => {
      try {
        const response = await axios.get("https://rent-x-backend-nine.vercel.app/properties");
        const sortedProperties = response.data
          .sort((a, b) => b.likeCount - a.likeCount) // Sort properties by likeCount
          .slice(0, 6); // Optionally limit to top 5 most liked properties
        setMostLikedProperties(sortedProperties);
      } catch (error) {
        console.error("Error fetching most liked properties:", error);
      }
    };

    fetchMostLikedProperties();
  }, []);

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Most Liked Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mostLikedProperties.length > 0 ? (
          mostLikedProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={{
                ...property,
                image: property.images[0], // Use the first image from the array
              }}
              onClick={() => handleViewProperty(property._id)}
            />
          ))
        ) : (
          <p>No properties found.</p>
        )}
      </div>
    </div>
  );
};

export default MostLiked;