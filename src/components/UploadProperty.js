import React, { useState, useEffect } from "react";
import config from "../configs/config"; // Assuming you have config.js for baseUrl
import { cloudinaryConfig } from "../configs/cloudinaryConfig"; 

const UploadProperty = () => {
  const [activeSection, setActiveSection] = useState("basicDetails");
  const [basicDetails, setBasicDetails] = useState({
    title: "",
    description: "",
    price: "",
    securityDeposit: "", // Corrected to match your backend
    category: "",
  });
  const [location, setLocation] = useState({
    address: "",
    city: "",
    state: "Gujarat", // Default State
    country: "India", // Default Country
  });
  const [images, setImages] = useState([]); // For storing local files
  const [categories, setCategories] = useState([]);
  const [selectedCategoryFacilities, setSelectedCategoryFacilities] = useState([]);
  const [facilityValues, setFacilityValues] = useState({});

  // Cloudinary configuration using fetch
  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", cloudinaryConfig.cloudName);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        return data.secure_url; // Return the image URL
      } else {
        console.error("Failed to upload:", data.error.message);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return null;
    }
  };

  // Fetch categories from the backend using fetch
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${config.baseUrl}/categories`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include", // Equivalent to axios' withCredentials
        });
        const data = await response.json();
        setCategories(data);
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
    console.log("Submit Button Clicked");

    // Upload images to Cloudinary and get their URLs
    const imageUploadPromises = images.map((image) => uploadImageToCloudinary(image));
    const uploadedImageUrls = await Promise.all(imageUploadPromises);

    // Filter out failed uploads
    const successfulUploads = uploadedImageUrls.filter((url) => url !== null);

    // Prepare form data for submission
    const formData = {
      title: basicDetails.title,
      description: basicDetails.description,
      monthlyRent: basicDetails.price,
      securityDeposit: basicDetails.securityDeposit,
      category: basicDetails.category,
      address: location.address,
      city: location.city,
      state: location.state,
      country: location.country,
      images: successfulUploads,
      facilities: Object.entries(facilityValues).map(([facilityId, value]) => ({
        facility: facilityId,
        value: value,
      })),
      likeCount: 0, // If you want to include likeCount as well
    };

    // Submit the form using fetch
    try {
      const response = await fetch(`${config.baseUrl}/properties`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // Equivalent to axios' withCredentials
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Property uploaded:", data);

        setBasicDetails({
          title: "",
          description: "",
          price: "",
          securityDeposit: "",
          category: "",
        });
        setLocation({
          address: "",
          city: "",
          state: "Gujarat",
          country: "India",
        });
        setImages([]);
        setFacilityValues({});
      } else {
        console.error("Error uploading property:", response.statusText);
      }
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
            className={`px-4 py-2 rounded ${
              activeSection === "basicDetails" ? "bg-teal-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("basicDetails")}
          >
            Basic Details
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "facilities" ? "bg-teal-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("facilities")}
          >
            Facilities
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "location" ? "bg-teal-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("location")}
          >
            Location
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "images" ? "bg-teal-600 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("images")}
          >
            Images
          </button>
        </div>

        <form>
          {/* Basic Details Section */}
          {activeSection === "basicDetails" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Basic Details</h3>
              <input
                type="text"
                name="title"
                value={basicDetails.title}
                onChange={handleBasicDetailsChange}
                placeholder="Title"
                className="block w-full border rounded p-2 mb-4"
              />
              <textarea
                name="description"
                value={basicDetails.description}
                onChange={handleBasicDetailsChange}
                placeholder="Description"
                className="block w-full border rounded p-2 mb-4"
              />
              <input
                type="number"
                name="price"
                value={basicDetails.price}
                onChange={handleBasicDetailsChange}
                placeholder="Price"
                className="block w-full border rounded p-2 mb-4"
              />
              <input
                type="number"
                name="securityAmount"
                value={basicDetails.securityAmount}
                onChange={handleBasicDetailsChange}
                placeholder="Security Amount"
                className="block w-full border rounded p-2 mb-4"
              />
              <select
                name="category"
                value={basicDetails.category}
                onChange={handleBasicDetailsChange}
                className="block w-full border rounded p-2 mb-4"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Facilities Section */}
          {activeSection === "facilities" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Facilities</h3>
              {selectedCategoryFacilities.map((facility) => (
                <div key={facility._id} className="mb-4">
                  <label className="block mb-2">{facility.name}</label>
                  <input
                    type="text"
                    name={facility._id}
                    value={facilityValues[facility._id] || ""}
                    onChange={(e) => handleFacilityChange(e, facility._id)}
                    className="block w-full border rounded p-2"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Location Section */}
          {activeSection === "location" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
              <input
                type="text"
                name="address"
                value={location.address}
                onChange={handleLocationChange}
                placeholder="Address"
                className="block w-full border rounded p-2 mb-4"
              />
              <input
                type="text"
                name="city"
                value={location.city}
                onChange={handleLocationChange}
                placeholder="City"
                className="block w-full border rounded p-2 mb-4"
              />
              <input
                type="text"
                name="state"
                value={location.state}
                onChange={handleLocationChange}
                placeholder="State"
                className="block w-full border rounded p-2 mb-4"
              />
              <input
                type="text"
                name="country"
                value={location.country}
                onChange={handleLocationChange}
                placeholder="Country"
                className="block w-full border rounded p-2 mb-4"
              />
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
