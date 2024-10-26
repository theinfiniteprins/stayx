import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import config from "../configs/config";
import CardSkeleton from "../Skeletons/CardSkeleton"; // Skeleton loader
import { UserContext } from "../contexts/UserContext";

const PropertySearchAndFilter = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("Any");
  const [categories, setCategories] = useState([]);
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState(10000);
  const [sortOrder, setSortOrder] = useState("Low to High");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleProperties, setVisibleProperties] = useState(3);
  const [bedroomFacilityId, setBedroomFacilityId] = useState(null);
  const { loggedIn } = useContext(UserContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/categories/`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/properties/`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchFacilities = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/facilities/`, {
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await response.json();
        const bedroomFacility = data.find(
          (facility) => facility.name === "Bedroom"
        );
        setBedroomFacilityId(bedroomFacility ? bedroomFacility._id : null);
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchCategories();
    fetchProperties();
    fetchFacilities();
  }, []);

  const handleViewProperty = (id) => {
    navigate(`/property/${id}`);
  };

  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      const matchesCity =
        city === "Any" ||
        property.city.toLowerCase().includes(city.toLowerCase());
      const matchesCategory =
        category === "Any" || property.category.name === category;
      const matchesBedrooms =
        bedrooms === "" ||
        (bedroomFacilityId &&
          property.facilities.some(
            (f) =>
              f.facility === bedroomFacilityId &&
              Number(f.value) === parseInt(bedrooms)
          ));
      const matchesPrice = property.monthlyRent <= priceRange;

      return matchesCity && matchesCategory && matchesBedrooms && matchesPrice;
    });

    const sortedProperties = [...filtered].sort((a, b) => {
      return sortOrder === "Low to High"
        ? a.monthlyRent - b.monthlyRent
        : b.monthlyRent - a.monthlyRent;
    });

    setFilteredProperties(sortedProperties);
    setVisibleProperties(3);
  };

  const clearFilters = () => {
    setCity("");
    setCategory("Any");
    setBedrooms("");
    setPriceRange(10000);
    setSortOrder("Low to High");
    handleSearch();
  };

  const handleSeeMore = () => {
    setVisibleProperties((prev) => prev + 3);
  };

  return (
    <div className="search-and-property-container">
      <div className="mx-auto my-5 p-5 max-w-2xl bg-gray-100 rounded-xl shadow-2xl font-sans">
        <div className="flex flex-wrap justify-between mb-4">
          <div className="flex-1 mx-3 min-w-[150px]">
            <label htmlFor="city" className="block mb-2 text-gray-800 font-bold text-sm">City:</label>
            <input
              type="text"
              id="city"
              placeholder="Any"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-lg"
            />
          </div>
          <div className="flex-1 mx-3 min-w-[150px]">
            <label htmlFor="category" className="block mb-2 text-gray-800 font-bold text-sm">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-lg bg-gray-100 focus:border-teal-700"
            >
              <option value="Any">Any</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex-1 mx-3 min-w-[150px]">
            <label htmlFor="bedrooms" className="block mb-2 text-gray-800 font-bold text-sm">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              placeholder="Any"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              min="1"
              className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-lg"
            />
          </div>
        </div>
        <div className="flex flex-wrap justify-between mb-4">
          <label htmlFor="priceRange" className="block w-full mb-2 text-gray-800 font-bold text-sm">Price Range: ₹0 - ₹{priceRange}</label>
          <input
            type="range"
            id="priceRange"
            min="500"
            max="20000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full h-2 rounded-lg appearance-none"
            style={{
              background: `linear-gradient(to right, #005cc8 ${(priceRange - 500) / 195}% , #e2e8f0 ${(priceRange - 500) / 195}%)`,
            }}
          />
        </div>
        <div className="flex flex-wrap justify-between mb-4">
          <label htmlFor="sortOrder" className="block w-full mb-2 text-gray-800 font-bold text-sm">Sort By Price:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-gray-800 text-lg bg-gray-100 focus:border-teal-700"
          >
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-teal-600 hover:bg-teal-800 text-white font-bold py-3 px-5 rounded-md transition-colors duration-300 w-full"
          >
            Search
          </button>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Available Properties
        </h2>
        {loading ? (
          <CardSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProperties.slice(0, visibleProperties).map((property) => (
              <PropertyCard
                key={property._id}
                property={{
                  ...property,
                  image: property.images[0],
                }}
                loggedIn={loggedIn}
                onClick={() => handleViewProperty(property._id)}
              />
            ))}
          </div>
        )}
        {!loading && visibleProperties < filteredProperties.length && (
          <div className="flex justify-center mt-4">
            <button
              onClick={handleSeeMore}
              className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full px-6 py-2 shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-transform transform hover:-translate-y-1"
            >
              See More
            </button>
          </div>
        )}
        {!loading && filteredProperties.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No properties found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or clear filters to see more properties.
            </p>
            <button
              onClick={clearFilters}
              className="bg-blue-600 text-white rounded-lg px-6 py-2 hover:bg-blue-700"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearchAndFilter;
