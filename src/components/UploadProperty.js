import React, { useState } from 'react';
import '../styles.css';

const UploadProperty = () => {
  const [activeSection, setActiveSection] = useState('basicDetails');

  const [basicDetails, setBasicDetails] = useState({
    title: '',
    description: '',
    price: '',
    securityAmount: '',
  });

  const [facilities, setFacilities] = useState([
    { name: '', image: null },
  ]);

  const [location, setLocation] = useState({
    address: '',
    city: '',
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

  const addFacility = () => {
    setFacilities([...facilities, { name: '', image: null }]);
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
    // Process the form data here, e.g., send it to an API endpoint
    console.log('Basic Details:', basicDetails);
    console.log('Facilities:', facilities);
    console.log('Location:', location);
    console.log('Images:', images);
  };

  return (
    <div className="upload-property-container">
      <div className="upload-prop">
        <h2>Upload Property</h2>
        <button onClick={handleSubmit} className="submit-button">Upload Property</button>
      </div>
      <div className="tab-container">
        <button
          className={`tab-button ${activeSection === 'basicDetails' ? 'active' : ''}`}
          onClick={() => setActiveSection('basicDetails')}
        >
          Basic Details
        </button>
        <button
          className={`tab-button ${activeSection === 'facilities' ? 'active' : ''}`}
          onClick={() => setActiveSection('facilities')}
        >
          Facilities
        </button>
        <button
          className={`tab-button ${activeSection === 'location' ? 'active' : ''}`}
          onClick={() => setActiveSection('location')}
        >
          Location
        </button>
        <button
          className={`tab-button ${activeSection === 'images' ? 'active' : ''}`}
          onClick={() => setActiveSection('images')}
        >
          Images
        </button>
      </div>

      <form className="upload-property-form">
        {activeSection === 'basicDetails' && (
          <div className="form-section">
            <h3>Basic Details</h3>
            <div className="form-group">
              <label htmlFor="title">Property Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={basicDetails.title}
                onChange={handleBasicDetailsChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={basicDetails.description}
                onChange={handleBasicDetailsChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="price">Monthly Rent (₹):</label>
              <input
                type="number"
                id="price"
                name="price"
                value={basicDetails.price}
                onChange={handleBasicDetailsChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="securityAmount">Security Amount (₹): (Optional)</label>
              <input
                type="number"
                id="securityAmount"
                name="securityAmount"
                value={basicDetails.securityAmount}
                onChange={handleBasicDetailsChange}
                required
              />
            </div>
          </div>
        )}

        {activeSection === 'facilities' && (
          <div className="form-section">
            <h3>Facilities</h3>
            {facilities.map((facility, index) => (
              <div key={index} className="facility-group">
                <div className="form-group">
                  <label htmlFor={`facilityName_${index}`}>Facility Name:</label>
                  <input
                    type="text"
                    id={`facilityName_${index}`}
                    name="name"
                    value={facility.name}
                    onChange={(e) => handleFacilityChange(index, e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`facilityImage_${index}`}>Facility Image:</label>
                  <input
                    type="file"
                    id={`facilityImage_${index}`}
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleFacilityImageChange(index, e)}
                  />
                </div>
              </div>
            ))}
            <button type="button" onClick={addFacility} className="add-facility-button">
              Add Another Facility
            </button>
          </div>
        )}

        {activeSection === 'location' && (
          <div className="form-section">
            <h3>Location</h3>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={location.address}
                onChange={handleLocationChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={location.city}
                onChange={handleLocationChange}
                required
              />
            </div>
          </div>
        )}

        {activeSection === 'images' && (
          <div className="form-section">
            <h3>Images</h3>
            <div className="form-group">
              <label htmlFor="images">Upload Images:</label>
              <input
                type="file"
                id="images"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImagesChange}
                required
              />
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default UploadProperty;
