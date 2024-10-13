import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../configs/config"; // Ensure this file has the `baseUrl` of your API

const Test = () => {
  const [facilities, setFacilities] = useState([]); // Store the facilities
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(""); // Track error state

  useEffect(() => {
    const fetchFacilities = async () => {
      try {
        // Fetch facilities from the API
        const response = await axios.get(`${config.baseUrl}/facilities`, {
          headers: {
            "Content-Type": "application/json", // Only need this for proper request format
          },
          withCredentials: true, // Ensure cookies are included in the request
        });

        // Successfully fetched facilities
        setFacilities(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching facilities:", err);
        setError("Failed to load facilities.");
        setLoading(false);
      }
    };

    fetchFacilities();
  }, []);

  // Loading state
  if (loading) {
    return <p>Loading facilities...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }

  // Render the list of facilities
  return (
    <div>
      <h2>Facility List</h2>
      {facilities.length > 0 ? (
        <ul>
          {facilities.map((facility) => (
            <li key={facility._id}>
              <img
                src={facility.iconImage} // Display facility icon
                alt={facility.name}
                style={{ width: "30px", height: "30px" }}
              />
              <strong>{facility.name}</strong> - Type: {facility.type}
            </li>
          ))}
        </ul>
      ) : (
        <p>No facilities available.</p>
      )}
    </div>
  );
};

export default Test;
