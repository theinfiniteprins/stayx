import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../configs/config"; // Assuming you have config.js for baseUrl

const UploadProperty = () => {
  const [activeSection, setActiveSection] = useState("basicDetails");

  const [basicDetails, setBasicDetails] = useState({
    title: "",
    description: "",
    price: "",
    securityAmount: "",
    category: "",
  });

  const [location, setLocation] = useState({
    address: "",
    city: "",
  });

  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFacilities, setSelectedCategoryFacilities] = useState([]);
  const [facilityValues, setFacilityValues] = useState({});

  // Fetch categories from the backend using axios
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${config.baseUrl}/categories`, {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        });
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Update facilities list when the category changes
  useEffect(() => {
    if (basicDetails.category) {
      const selectedCategory = categories.find((cat) => cat._id === basicDetails.category);
      setSelectedCategoryFacilities(selectedCategory ? selectedCategory.facilities : []);
      setFacilityValues({});
    } else {
      setSelectedCategoryFacilities([]);
    }
  }, [basicDetails.category, categories]);

  const handleBasicDetailsChange = (e) => {
    const { name, value } = e.target;
    setBasicDetails({ ...basicDetails, [name]: value });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]); // Append new images to the array
  };

  const handleFacilityChange = (e, facilityId) => {
    const { name, value } = e.target;
    setFacilityValues({ ...facilityValues, [facilityId]: value });
  };

  // Function to remove an image from the array
  const removeImage = (indexToRemove) => {
    setImages((prevImages) => prevImages.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Basic Details:", basicDetails);
    console.log("Location:", location);
    console.log("Images:", images);
    console.log("Facilities:", facilityValues);

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("title", basicDetails.title);
    formData.append("description", basicDetails.description);
    formData.append("price", basicDetails.price);
    formData.append("securityAmount", basicDetails.securityAmount);
    formData.append("category", basicDetails.category);
    formData.append("address", location.address);
    formData.append("city", location.city);

    // Append each image
    images.forEach((image, index) => {
      formData.append(`images[${index}]`, image);
    });

    // Append facilities
    Object.entries(facilityValues).forEach(([facilityId, value]) => {
      formData.append(`facilities[${facilityId}]`, value);
    });

    // Submit the form using axios
    try {
      const response = await axios.post(`${config.baseUrl}/properties`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensures file upload is handled properly
        },
        withCredentials: true,
      });
      console.log("Property uploaded:", response.data);
    } catch (error) {
      console.error("Error uploading property:", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-teal-600">Upload Property</h2>
          <button onClick={handleSubmit} className="bg-teal-600 text-white px-4 py-2 rounded">
            Upload Property
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${activeSection === "basicDetails" ? "bg-teal-600 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("basicDetails")}
          >
            Basic Details
          </button>
          <button
            className={`px-4 py-2 rounded ${activeSection === "facilities" ? "bg-teal-600 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("facilities")}
          >
            Facilities
          </button>
          <button
            className={`px-4 py-2 rounded ${activeSection === "location" ? "bg-teal-600 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("location")}
          >
            Location
          </button>
          <button
            className={`px-4 py-2 rounded ${activeSection === "images" ? "bg-teal-600 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveSection("images")}
          >
            Images
          </button>
        </div>

        <form>
          {/* Basic Details Section */}
          {activeSection === "basicDetails" && (
            <div className="mb-6">
              {/* Add Basic Details Form Inputs */}
              <div className="mb-4">
                <label htmlFor="title" className="block mb-1 text-sm">
                  Property Title:
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={basicDetails.title}
                  onChange={handleBasicDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="description" className="block mb-1 text-sm">
                  Description:
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={basicDetails.description}
                  onChange={handleBasicDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="price" className="block mb-1 text-sm">
                  Monthly Rent (₹):
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={basicDetails.price}
                  onChange={handleBasicDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="securityAmount" className="block mb-1 text-sm">
                  Security Amount (₹): (Optional)
                </label>
                <input
                  type="number"
                  id="securityAmount"
                  name="securityAmount"
                  value={basicDetails.securityAmount}
                  onChange={handleBasicDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>

              {/* Category Dropdown */}
              <div className="mb-4">
                <label htmlFor="category" className="block mb-1 text-sm">
                  Category:
                </label>
                <select
                  id="category"
                  name="category"
                  value={basicDetails.category}
                  onChange={handleBasicDetailsChange}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Facilities Section */}
          {activeSection === "facilities" && selectedCategoryFacilities.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Facilities</h4>
              {selectedCategoryFacilities.map((facility) => (
                <div key={facility._id} className="mb-4">
                  <label htmlFor={`facility_${facility._id}`} className="block mb-1 text-sm">
                    {facility.name}
                  </label>
                  {facility.type === "radioButton" ? (
                    <div>
                      <label className="mr-4">
                        <input
                          type="radio"
                          name={`facility_${facility._id}`}
                          value="Yes"
                          onChange={(e) => handleFacilityChange(e, facility._id)}
                          className="mr-2"
                        />
                        Yes
                      </label>
                      <label>
                        <input
                          type="radio"
                          name={`facility_${facility._id}`}
                          value="No"
                          onChange={(e) => handleFacilityChange(e, facility._id)}
                          className="mr-2"
                        />
                        No
                      </label>
                    </div>
                  ) : (
                    <input
                      type="text"
                      id={`facility_${facility._id}`}
                      name={`facility_${facility._id}`}
                      className="w-full p-2 border border-gray-300 rounded"
                      onChange={(e) => handleFacilityChange(e, facility._id)}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Location Section */}
          {activeSection === "location" && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2">Location</h4>
              <div className="mb-4">
                <label htmlFor="address" className="block mb-1 text-sm">
                  Address:
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={location.address}
                  onChange={handleLocationChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block mb-1 text-sm">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={location.city}
                  onChange={handleLocationChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          )}

          {/* Images Section */}
          {activeSection === "images" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Property Images</h3>

              {/* Add Photo Button */}
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => document.getElementById("file-input").click()}
                  className="bg-teal-600 text-white px-4 py-2 rounded mr-4"
                >
                  Add Photo
                </button>
                <input
                  type="file"
                  id="file-input"
                  multiple
                  accept="image/*"
                  onChange={handleImagesChange}
                  className="hidden"
                />
              </div>

              {/* Preview Selected Images */}
              <div className="mt-4 grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-full h-auto rounded-lg border border-gray-300 object-cover"
                    />

                    {/* Remove Image Button */}
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 opacity-75 group-hover:opacity-100 transition-opacity"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadProperty;
