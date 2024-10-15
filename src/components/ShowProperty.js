import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import config from "../configs/config";
import Spinner from "./Spinner"; // Import Spinner component

const ShowProperty = () => {
  const { id } = useParams(); // Get the ID from the URL
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facilitiesInfo, setFacilitiesInfo] = useState([]);
  const [liked, setLiked] = useState(false); // Track if the current user has liked the property
  const [likeCount, setLikeCount] = useState(0); // Track like count
  const [isLoadingLike, setIsLoadingLike] = useState(false); // Loading state for the like button

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(
          `${config.baseUrl}/properties/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies with the request
          }
        );
        const data = await response.json();
        setProperty(data); // Set fetched data as property
        setLikeCount(data.likeCount || 0); // Set initial like count
        setLoading(false);
      } catch (error) {
        console.error("Error fetching property data:", error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]); // The effect runs whenever the id changes

  useEffect(() => {
    const fetchFacilityDetails = async () => {
      if (property && property.facilities.length > 0) {
        const promises = property.facilities.map((facility) =>
          fetch(
            `${config.baseUrl}/facilities/${facility.facility}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include", // Send cookies with the request
            }
          )
        );

        try {
          const facilitiesData = await Promise.all(promises);
          const facilitiesWithDetails = await Promise.all(
            facilitiesData.map((response) => response.json())
          );
          const facilitiesWithDetailsMapped = facilitiesWithDetails.map(
            (facility, index) => ({
              ...facility, // Facility details (name, iconImage)
              value: property.facilities[index].value, // Corresponding value from property.facilities
            })
          );
          setFacilitiesInfo(facilitiesWithDetailsMapped);
        } catch (error) {
          console.error("Error fetching facility details:", error);
        }
      }
    };

    if (property) {
      fetchFacilityDetails();
    }
  }, [property]);

  useEffect(() => {
    const checkIfPropertyIsLiked = async () => {
      try {
        const response = await fetch(
          `${config.baseUrl}/auth/currentuser`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies with the request
          }
        );
        const currentUser = await response.json();

        if (currentUser.favouriteProperties) {
          const { favouriteProperties } = currentUser;
          // Check if the current property ID is in the user's favouriteProperties list
          if (favouriteProperties.some((fav) => fav === id)) {
            setLiked(true);
          }
        }
      } catch (error) {
        console.error("Error checking if property is liked:", error);
      }
    };

    checkIfPropertyIsLiked();
  }, [id]);

  const handleLikeToggle = async () => {
    setIsLoadingLike(true); // Set loading state to true
    try {
      if (liked) {
        // Dislike the property
        await fetch(
          `${config.baseUrl}/properties/${id}/dislike`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies with the request
          }
        );
        setLikeCount(likeCount - 1);
      } else {
        // Like the property
        await fetch(
          `${config.baseUrl}/properties/${id}/like`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Send cookies with the request
          }
        );
        setLikeCount(likeCount + 1);
      }

      setLiked(!liked); // Toggle the liked state
    } catch (error) {
      console.error("Error liking/disliking the property:", error);
    } finally {
      setIsLoadingLike(false); // Set loading state to false after API call
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <Spinner />
      </div>
    );
  }

  if (!property) {
    return <div>No property data available.</div>;
  }

  // Convert images to the format required by react-image-gallery
  const galleryImages = property.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex flex-col lg:flex-row">
        {/* Left Side: Image Slider */}
        <div className="w-full lg:w-3/5 h-[400px]">
          <ImageGallery
            items={galleryImages}
            showThumbnails={false}
            showPlayButton={false}
            showFullscreenButton={true}
            showBullets={true}
          />
        </div>

        {/* Right Side: Property Details */}
        <div className="w-full lg:w-2/5 lg:pl-8 mt-6 lg:mt-0">
          <div className="flex items-center justify-between mb-4">
            {/* Property Title */}
            <h2 className="text-3xl font-bold">{property.title}</h2>

            {/* Like Button UI */}
            <div className="relative flex flex-col items-center">
              <button
                onClick={handleLikeToggle}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform transform ${
                  liked ? "bg-pink-500 text-white" : "bg-gray-200 text-gray-700"
                } shadow-md hover:scale-110`}
                disabled={isLoadingLike} // Disable the button while loading
              >
                {isLoadingLike ? (
                  <i className="fas fa-spinner fa-spin text-lg text-white" />
                ) : (
                  <i
                    className={`fas fa-heart text-xl ${
                      liked ? "text-white animate-pulse" : "text-gray-500"
                    } transition-all`}
                  />
                )}
              </button>

              {/* Like Count Below the Heart */}
              <span className="text-lg font-bold text-teal-600 mt-2">
                {likeCount}
              </span>
            </div>
          </div>

          {/* Property Category */}
          <div className="property-category mb-4">
            <h3 className="text-xl font-semibold mb-2">Category</h3>
            <p className="text-gray-700">{property.category.name}</p>
          </div>

          {/* Property Description */}
          <div className="property-description mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          {/* Property Price */}
          <div className="property-price mb-6">
            <h3 className="text-xl font-semibold mb-2">Monthly Rent</h3>
            <p className="text-2xl text-teal-600 font-bold">
              ₹{property.monthlyRent}
            </p>
          </div>

          {/* Security Deposit */}
          <div className="property-security-deposit mb-6">
            <h3 className="text-xl font-semibold mb-2">Security Deposit</h3>
            <p className="text-2xl text-teal-600 font-bold">
              ₹{property.securityDeposit}
            </p>
          </div>

          {/* Property Facilities */}
          <div className="property-facilities mb-6">
            <h3 className="text-xl font-semibold mb-2">Facilities:</h3>
            <div className="flex gap-4 flex-wrap">
              {facilitiesInfo
                .filter((facility) => facility.value !== false) // Filter out facilities with a false value
                .map((facility, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-teal-100 px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
                  >
                    <img
                      src={facility.iconImage}
                      alt={facility.name}
                      className="w-6 h-6 mr-2"
                    />
                    <span className="font-semibold">{facility.name}</span>
                    <span className="ml-2">{facility.value}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Property Address */}
          <div className="property-address">
            <h3 className="text-xl font-semibold mb-2">Address:</h3>
            <p className="text-gray-700">
              {property.address}, {property.city}, {property.state},{" "}
              {property.country}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowProperty;
