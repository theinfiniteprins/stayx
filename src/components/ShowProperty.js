import React, { useState, useEffect } from 'react';
import './style.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";

const ShowProperty = () => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // Simulate fetching data by setting a dummy property
    const dummyProperty = {
      title: "Luxury Apartment in Downtown",
      description: "A beautiful 3-bedroom luxury apartment located in the heart of the city.",
      category: { name: "Apartment" },
      price: 25000,
      facilities: [
        { name: "WiFi" },
        { name: "Swimming Pool" },
        { name: "Parking" }
      ],
      images: [
        "/images/property1.jpg",
        "/images/property2.png",
        "/images/property3.jpg"
      ],
      address: "123 Main St",
      city: "Nadiad",
      state: "Gujarat",
      country: "India"
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
    <div className="property-details-container">
      {/* Image Slider */}
      <div className="image-slider-container">
        <ImageGallery 
          items={galleryImages}
          showThumbnails={false}  // You can remove thumbnails if not needed
          showPlayButton={false}  // Hide play button for simplicity
          showFullscreenButton={true}  // Fullscreen button enabled
          showBullets={true} // Enable bullets for navigation
        />
      </div>

     {/* Property Title */}
      <div className="property-title">
          <h2>{property.title}</h2>
      </div>
      
      {/* Property Description */}
      <div className="property-description">
        <h3>Description</h3>
        <p>{property.description}</p>
      </div>

      {/* Property Price */}
      <div className="property-price">
        <h3>Price: ₹{property.price}</h3>
      </div>

      {/* Facilities */}
      <div className="property-facilities">
        <h3>Facilities:</h3>
        <div className="facility-boxes">
          {property.facilities.map((facility, index) => (
            <div key={index} className="facility-box">{facility.name}</div>
          ))}
        </div>
      </div>

      {/* Property Address */}
      <div className="property-address">
        <h3>Address:</h3>
        <p>{property.address}, {property.city}, {property.state}, {property.country}</p>
      </div>
    </div>
  );
};

export default ShowProperty;
