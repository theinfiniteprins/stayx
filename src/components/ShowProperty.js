import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const ShowProperty = () => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Simulate fetching data by setting a dummy property
    const dummyProperty = {
      title: "Luxury Apartment in Downtown",
      description:
        "A beautiful 3-bedroom luxury apartment located in the heart of the city.",
      category: { name: "Apartment" },
      price: 25000,
      facilities: [
        { name: "WiFi" },
        { name: "Swimming Pool" },
        { name: "Parking" },
      ],
      images: [
        "/images/property1.jpg",
        "/images/property2.png",
        "/images/property3.jpg",
      ],
      address: "123 Main St",
      city: "Nadiad",
      state: "Gujarat",
      country: "India",
    };

    setProperty(dummyProperty); // Set dummy data as property
  }, []);

  if (!property) {
    return <div>Loading...</div>;
  }

  // Convert images to the format required by react-image-gallery
  const galleryImages = property.images.map((image) => ({
    original: image,
    thumbnail: image,
  }));

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Main container to split the layout */}
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
          {/* Property Title */}
          <div className="mb-4">
            <h2 className="text-3xl font-bold">{property.title}</h2>
          </div>

          {/* Property Description */}
          <div className="property-description mb-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{property.description}</p>
          </div>

          {/* Property Price */}
          <div className="property-price mb-6">
            <h3 className="text-xl font-semibold mb-2">Price (Monthly)</h3>
            <p className="text-2xl text-teal-600 font-bold">
              ₹{property.price}
            </p>
          </div>
        </div>
      </div>

      {/* Facilities and Address section below the slider and details */}
      <div className="mt-8">
        {/* Facilities */}
        <div className="property-facilities mb-6">
          <h3 className="text-xl font-semibold mb-2">Facilities:</h3>
          <div className="flex gap-4 flex-wrap">
            {property.facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-teal-100 px-6 py-3 rounded-lg shadow-lg transform transition-transform hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                {facility.name}
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
  );
};

export default ShowProperty;
