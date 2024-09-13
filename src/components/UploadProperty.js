import React, { useState } from 'react';
import '../styles.css';

const UploadProperty = () => {
  const [propertyData, setPropertyData] = useState({
    title: '',
    description: '',
    price: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleImageChange = (e) => {
    setPropertyData({ ...propertyData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data here, e.g., send it to an API endpoint
    console.log('Property uploaded:', propertyData);
  };

  return (
    <div className="upload-property-container">
      <h2>Upload Property</h2>
      <form onSubmit={handleSubmit} className="upload-property-form">
        <div className="form-group">
          <label htmlFor="title">Property Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={propertyData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={propertyData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹):</label>
          <input
            type="number"
            id="price"
            name="price"
            value={propertyData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Upload Image:</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Upload Property</button>
      </form>
    </div>
  );
};

export default UploadProperty;
