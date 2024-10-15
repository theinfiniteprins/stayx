import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import config from "../configs/config";
import Skeleton from "./Skeleton"; // Skeleton loader

const MostLiked = () => {
  const [mostLikedProperties, setMostLikedProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMostLikedProperties = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/properties`);
        const sortedProperties = response.data
          .sort((a, b) => b.likeCount - a.likeCount)
          .slice(0, 6); 
        setMostLikedProperties(sortedProperties);
      } catch (error) {
        console.error("Error fetching most liked properties:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchMostLikedProperties();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Most Liked Properties</h2>
      {loading ? (
        <Skeleton count={6} /> // Show skeletons while loading
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostLikedProperties.length > 0 ? (
            mostLikedProperties.map(property => (
              <PropertyCard
                key={property._id}
                property={{ ...property, image: property.images[0] }}
                onClick={() => navigate(`/property/${property._id}`)}
              />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MostLiked;
