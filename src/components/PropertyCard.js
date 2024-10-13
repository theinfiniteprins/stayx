import React from "react";

const PropertyCard = ({ property }) => {
  return (
    <div
      className="max-w-sm mx-auto bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden p-4 m-4 hover:shadow-xl transition-shadow duration-300"
      onClick={() => window.location.href = `http://localhost:3000/property/${property.id}`}
      style={{ cursor: "pointer" }}
    >
      {/* Property Image */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-0 left-0 bg-gradient-to-r from-teal-500 via-green-500 to-teal-500 text-white text-lg px-5 py-2 rounded-br-lg font-semibold shadow-md">
          ₹{property.monthlyRent}/month
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4 bg-gray-50 rounded-b-lg">
        <h3 className="text-xl font-bold text-teal-700 mb-1">{property.title}</h3>
        <p className="text-gray-500 mb-3 flex items-center">
          <i className="fas fa-map-marker-alt text-teal-500 mr-2"></i>
          {property.city}, {property.state}
        </p>
        <hr className="my-3" />

        {/* Facilities and Like Count */}
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600 space-y-1">
            <p className="flex items-center">
              <i className="fas fa-bed text-teal-400 mr-2"></i>
              {property.facilities[0]}
            </p>
            <p className="flex items-center">
              <i className="fas fa-bath text-teal-400 mr-2"></i>
              {property.facilities[1]}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <i className="fas fa-heart text-red-500"></i>
            <span className="text-gray-700 font-medium">{property.likeCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
