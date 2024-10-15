import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropertyCard from "./PropertyCard";
import config from "../configs/config";
import Skeleton from "./Skeleton"; // Skeleton loader

const PropertySearchAndFilter = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState("Any");
  const [category, setCategory] = useState("Any");
  const [categories, setCategories] = useState([]);
  const [bedrooms, setBedrooms] = useState("");
  const [priceRange, setPriceRange] = useState(50000);
  const [sortOrder, setSortOrder] = useState("Low to High");
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/categories/`);
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/properties/`);
        const data = await response.json();
        setProperties(data);
        setFilteredProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchCategories();
    fetchProperties();
  }, []);

  const handleSearch = () => {
    const filtered = properties.filter(property => {
      const matchesCity = city === "Any" || property.city.toLowerCase().includes(city.toLowerCase());
      const matchesCategory = category === "Any" || property.category.name === category;
      const matchesBedrooms = bedrooms === "" || property.facilities.some(f => f.value === bedrooms);
      const matchesPrice = property.monthlyRent <= priceRange;

      return matchesCity && matchesCategory && matchesBedrooms && matchesPrice;
    });

    const sortedProperties = [...filtered].sort((a, b) => {
      return sortOrder === "Low to High" ? a.monthlyRent - b.monthlyRent : b.monthlyRent - a.monthlyRent;
    });

    setFilteredProperties(sortedProperties);
  };

  return (
    <div className="search-and-property-container">
      <div className="search-filter-container">
        <div className="filter-row">
          <div className="filter-item">
            <label htmlFor="city">City:</label>
            <input type="text" id="city" placeholder="Any" value={city} onChange={(e) => setCity(e.target.value)} />
          </div>
          <div className="filter-item">
            <label htmlFor="category">Category:</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Any">Any</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="bedrooms">Bedrooms:</label>
            <input type="number" id="bedrooms" placeholder="Any" value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} min="1" />
          </div>
        </div>
        <div className="filter-row">
          <label htmlFor="priceRange">Price Range: ₹{priceRange}</label>
          <input type="range" id="priceRange" min="0" max="50000" value={priceRange} onChange={(e) => setPriceRange(e.target.value)} />
        </div>
        <div className="filter-row">
          <label htmlFor="sortOrder">Sort By Price:</label>
          <select id="sortOrder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
                <PropertyCard key={property._id} property={{ ...property, image: property.images[0] }} onClick={() => navigate(`/property/${property._id}`)} />
              ))
            ) : (
              <p>No properties found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySearchAndFilter;
