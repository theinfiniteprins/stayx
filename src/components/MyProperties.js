import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt, FaHeart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [userId, setUserId] = useState(null); // State to store the current user's ID
  const base_url = "https://rent-x-backend-nine.vercel.app"; // Replace with your actual base_url
  const navigate = useNavigate(); // useNavigate hook from React Router

  // Fetch the current user's details
  useEffect(() => {
    axios
      .get(`${base_url}/auth/currentuser`, { withCredentials: true }) // API call to get current user with credentials
      .then((response) => {
        const currentUser = response.data; // Assuming user data contains ID
        setUserId(currentUser._id); // Store the user's ID
      })
      .catch((error) => {
        console.error("Error fetching current user:", error);
      });
  }, []);

  // Fetch and filter properties based on the current user's ID
  useEffect(() => {
    if (userId) {
      axios
        .get(`${base_url}/properties/`, { withCredentials: true }) // Include credentials in the property request as well
        .then((response) => {
          // Filter properties where userRef matches the current userId
          const userProperties = response.data.filter(
            (property) => property.userRef === userId
          );
          setProperties(userProperties);
        })
        .catch((error) => {
          console.error("Error fetching properties:", error);
        });
    }
  }, [userId]);

  // Handle row click to navigate to the property page
  const handleRowClick = (propertyId) => {
    navigate(`/property/${propertyId}`); // Navigate to the property details page
  };

  // Handle delete action
  const handleDelete = async (propertyId) => {
    try {
      // Delete the property
      await axios.delete(`${base_url}/properties/${propertyId}`, {
        withCredentials: true, // Make sure to include credentials
      });

      // Delete from slider (if needed)
      await axios.delete(`${base_url}/slider/${propertyId}`, {
        withCredentials: true, // Include credentials
      });

      // Filter out the deleted property from the state
      setProperties(properties.filter((property) => property._id !== propertyId));
    } catch (error) {
      console.error("Error deleting property or from slider:", error);
    }
  };

  // Handle edit action
  const handleEdit = (propertyId) => {
    navigate(`/edit/${propertyId}`); // Navigate to the edit page with the property ID
  };

  return (
    <div className="container mx-auto mt-5">
      <h1 className="text-2xl font-bold m-4">My Properties</h1>
      <div className="grid grid-cols-1 gap-6">
        {properties.length > 0 ? (
          properties.map((property) => (
            <div
              key={property._id}
              className="flex items-center bg-white p-4 rounded-lg shadow-lg cursor-pointer" // Add cursor-pointer for clickable row
              onClick={() => handleRowClick(property._id)} // Redirect on row click
            >
              {/* Property Image */}
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-60 h-32 rounded-lg mr-4" // Increased width and height
              />
              {/* Property Details */}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{property.title}</h2>
                <p className="text-gray-600 mt-1">Rent: ₹{property.monthlyRent}</p>
              </div>
              {/* Category */}
              <div className="flex-1 text-gray-700 text-xl">{property.category.name}</div>
              {/* Like Count beside Heart Icon */}
              <div className="flex-1 flex items-center justify-center">
                <FaHeart
                  className={`text-2xl mr-2 ${
                    property.liked ? "text-red-500" : "text-gray-500"
                  }`}
                />
                <span className="text-xl">{property.likeCount}</span>
              </div>
              {/* Edit & Delete Icons */}
              <div className="flex items-center space-x-4 ml-4">
                <FaEdit
                  className="text-blue-500 cursor-pointer"
                  size={28}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when icon is clicked
                    handleEdit(property._id); // Trigger edit action
                  }}
                />
                <FaTrashAlt
                  className="text-red-500 cursor-pointer"
                  size={28}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent row click when icon is clicked
                    handleDelete(property._id); // Trigger delete action
                  }}
                />
              </div>
            </div>
          ))
        ) : (
          <p>No properties found for the current user.</p>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
