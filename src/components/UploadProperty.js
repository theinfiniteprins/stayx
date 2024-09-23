import React, { useState } from "react";

const UploadProperty = () => {
  const [activeSection, setActiveSection] = useState("basicDetails");

  const [basicDetails, setBasicDetails] = useState({
    title: "",
    description: "",
    price: "",
    securityAmount: "",
  });

  const [facilities, setFacilities] = useState([{ name: "", image: null }]);

  const [location, setLocation] = useState({
    address: "",
    city: "",
  });

  const [images, setImages] = useState([]);

  const handleBasicDetailsChange = (e) => {
    const { name, value } = e.target;
    setBasicDetails({ ...basicDetails, [name]: value });
  };

  const handleFacilityChange = (index, e) => {
    const { name, value } = e.target;
    const newFacilities = [...facilities];
    newFacilities[index][name] = value;
    setFacilities(newFacilities);
  };

  const handleFacilityImageChange = (index, e) => {
    const newFacilities = [...facilities];
    newFacilities[index].image = e.target.files[0];
    setFacilities(newFacilities);
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  const handleImagesChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Basic Details:", basicDetails);
    console.log("Facilities:", facilities);
    console.log("Location:", location);
    console.log("Images:", images);
  };

  return (
    <div className="container mx-auto p-6">
      {/* White box wrapping the form */}
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-teal-600">Upload Property</h2>
          <button
            onClick={handleSubmit}
            className="bg-teal-600 text-white px-4 py-2 rounded"
          >
            Upload Property
          </button>
        </div>

        <div className="flex space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "basicDetails"
                ? "bg-teal-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("basicDetails")}
          >
            Basic Details
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "facilities"
                ? "bg-teal-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("facilities")}
          >
            Facilities
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "location"
                ? "bg-teal-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("location")}
          >
            Location
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeSection === "images"
                ? "bg-teal-600 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveSection("images")}
          >
            Images
          </button>
        </div>

        <form>
          {activeSection === "basicDetails" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Basic Details</h3>
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
            </div>
          )}

          {activeSection === "facilities" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Facilities</h3>
              {facilities.map((facility, index) => (
                <div key={index} className="mb-4">
                  <div className="mb-2">
                    <label
                      htmlFor={`facilityName_${index}`}
                      className="block mb-1 text-sm"
                    >
                      Facility Name:
                    </label>
                    <input
                      type="text"
                      id={`facilityName_${index}`}
                      name="name"
                      value={facility.name}
                      onChange={(e) => handleFacilityChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor={`facilityImage_${index}`}
                      className="block mb-1 text-sm"
                    >
                      Facility Image:
                    </label>
                    <input
                      type="file"
                      id={`facilityImage_${index}`}
                      name="image"
                      accept="image/*"
                      onChange={(e) => handleFacilityImageChange(index, e)}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === "location" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Location</h3>
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

          {activeSection === "images" && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Images</h3>
              <div className="mb-4">
                <label htmlFor="images" className="block mb-1 text-sm">
                  Upload Images:
                </label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadProperty;
