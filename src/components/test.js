import React, { useState } from "react";
import { cloudinaryConfig } from "../configs/cloudinaryConfig"; 

const ImageUpload = () => {
  const [imageFile, setImageFile] = useState(null); // Track selected file
  const [previewUrl, setPreviewUrl] = useState(null); // Preview selected image
  const [uploading, setUploading] = useState(false); // Track upload state
  const [error, setError] = useState(""); // Track errors
  const [uploadedUrl, setUploadedUrl] = useState(null); // Store uploaded image URL

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    // Create a URL for image preview
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  // Handle image upload using fetch
  const handleImageUpload = async () => {
    if (!imageFile) {
      setError("Please select an image to upload.");
      return;
    }

    console.log("submited");

    // Prepare form data
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", cloudinaryConfig.uploadPreset); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", cloudinaryConfig.cloudName);

    try {
      setUploading(true);
      setError("");

      // Send POST request using fetch
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // Handle successful upload
        setUploadedUrl(data.secure_url);
        console.log("Uploaded image URL:", data.secure_url);
      } else {
        throw new Error(data.error.message || "Failed to upload");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      setError("Failed to upload the image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Image Upload Example</h2>

      {/* Image Preview */}
      {previewUrl && (
        <div>
          <h4>Image Preview:</h4>
          <img src={previewUrl} alt="Selected Preview" style={{ width: "150px", height: "150px" }} />
        </div>
      )}

      {/* File Input */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {/* Upload Button */}
      <button onClick={handleImageUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {/* Error Message */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Display Uploaded Image URL */}
      {uploadedUrl && (
        <div>
          <h4>Uploaded Image:</h4>
          <img src={uploadedUrl} alt="Uploaded" style={{ width: "150px", height: "150px" }} />
          <p>Image URL: {uploadedUrl}</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
