import React from "react";
import PropertyCard from "./PropertyCard"; // Import the card component

// Dummy Data for most liked properties
const mostLikedProperties = [
  {
    id: 1,
    title: "Lovely Sweet Home",
    monthlyRent: 1250,
    city: "Nadiad",
    state: "Gujarat",
    image: "/images/property1.jpg",
    facilities: ["3 Bedrooms", "2 Bathrooms"],
    likeCount: 500,
  },
  {
    id: 2,
    title: "Cozy Cottage",
    monthlyRent: 900,
    city: "Ahmedabad",
    state: "Gujarat",
    image: "/images/property2.png",
    facilities: ["2 Bedrooms", "1 Bathroom"],
    likeCount: 350,
  },
  {
    id: 3,
    title: "Luxury Villa",
    monthlyRent: 2500,
    city: "Vadodara",
    state: "Gujarat",
    image: "/images/property3.jpg",
    facilities: ["5 Bedrooms", "4 Bathrooms"],
    likeCount: 700,
  },
];

const MostLiked = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Most Liked Properties</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mostLikedProperties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default MostLiked;
