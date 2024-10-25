import React, { useState, useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import config from "../configs/config";
import Skeleton from "./Skeleton"; // Skeleton loader
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
  const [loading, setLoading] = useState(true); // Loading state
  const [bedroomFacilityId, setBedroomFacilityId] = useState(null); // Bedroom facility ID
  const { loggedIn } = useContext(UserContext);

  // Fetch all categories, properties, and facilities from the API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/categories/`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
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
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data); // Initialize filtered properties with all properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    const fetchFacilities = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/facilities/`, {
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const data = await response.json();
        // Find the facility with the name "Bedroom"
        const bedroomFacility = data.find(facility => facility.name === "Bedroom");
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

  // Handle search and filtering
  const handleSearch = () => {
    const filtered = properties.filter((property) => {
      const matchesCity = city === "Any" || property.city.toLowerCase().includes(city.toLowerCase());
      const matchesCategory = category === "Any" || property.category.name === category;
      const matchesBedrooms = bedrooms === "" || (bedroomFacilityId && property.facilities.some(f => f.facility === bedroomFacilityId && Number(f.value) === parseInt(bedrooms)));
      const matchesPrice = property.monthlyRent <= priceRange;
      
      return matchesCity && matchesCategory && matchesBedrooms && matchesPrice;
    });

    // Sorting based on price
    const sortedProperties = [...filtered].sort((a, b) => {
      return sortOrder === "Low to High"
        ? a.monthlyRent - b.monthlyRent
        : b.monthlyRent - a.monthlyRent;
    });

    setFilteredProperties(sortedProperties);
  };

  const clearFilters = () => {
    // Clear all filters
    setCity("");
    setCategory("Any");
    setBedrooms("");
    setPriceRange(10000);
    setSortOrder("Low to High");
    handleSearch();
  };

  return (
    <div className="search-and-property-container">
      <div className="search-filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label htmlFor="city">City:</label>
            <input
              type="text"
              id="city"
              placeholder="Any"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Any">Any</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input
              type="number"
              id="bedrooms"
              placeholder="Any"
              value={bedrooms}
              onChange={(e) => setBedrooms(e.target.value)}
              min="1"
            />
          </div>
        </div>
        <div className="filter-row">
          <label htmlFor="priceRange">Price Range: ₹{priceRange}</label>
          <input
            type="range"
            id="priceRange"
            min="0"
            max="20000"
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
          />
        </div>
        <div className="filter-row">
          <label htmlFor="sortOrder">Sort By Price:</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
          </select>
        </div>
        <div className="filter-row">
          <button className="search-button" onClick={handleSearch}>Search</button>
        </div>
      </div>

      <div className="properties-container p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Available Properties</h2>
        {loading ? (
          <Skeleton count={6} /> // Show skeletons while loading
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4 mx-auto max-w-7xl">
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <PropertyCard
                  key={property._id}
                  property={{
                    ...property,
                    image: property.images[0],  // Use the first image from the array
                  }}
                  loggedIn={loggedIn}
                  onClick={() => handleViewProperty(property._id)} // Handle click
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-center py-16">
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search criteria or clear filters to see more properties.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearchAndFilter;
