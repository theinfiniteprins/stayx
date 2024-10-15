import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "./PropertyCard"; // Use the PropertyCard component
import { useNavigate } from "react-router-dom";

const FavouriteProperties = () => {
  const [favouriteProperties, setFavouriteProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavouriteProperties = async () => {
      try {
        // Fetch current user to get their favorite properties
        const userResponse = await axios.get(
          "https://rent-x-backend-nine.vercel.app/auth/currentuser",
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials for cookie-based sessions
          }
        );

        const { favouriteProperties: favPropertyIds } = userResponse.data;

        if (favPropertyIds && favPropertyIds.length > 0) {
          // Fetch the actual favorite property details
          const propertyPromises = favPropertyIds.map((id) =>
            axios.get(`https://rent-x-backend-nine.vercel.app/properties/${id}`)
          );
          const propertyResponses = await Promise.all(propertyPromises);

          // Get the property data from the responses
          const fetchedProperties = propertyResponses.map(
            (response) => response.data
          );
          setFavouriteProperties(fetchedProperties);
        }
      } catch (error) {
        console.error("Error fetching favourite properties:", error);
      }
    };

    fetchFavouriteProperties();
  }, []);

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Favourite Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {favouriteProperties.length > 0 ? (
          favouriteProperties.map((property) => (
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
          <p>You have no favourite properties yet.</p>
        )}
      </div>
    </div>
  );
};

export default FavouriteProperties;
