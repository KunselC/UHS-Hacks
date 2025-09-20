import React, { useState, useRef } from "react";
import { Upload, MapPin, Camera, Loader } from "lucide-react";

const AssessmentForm = ({ onSubmit, loading, error }) => {
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationError, setLocationError] = useState("");
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
          setLocationError("");
        },
        (error) => {
          setLocationError(
            "Unable to get your location. Please enter coordinates manually."
          );
        }
      );
    } else {
      setLocationError("Geolocation is not supported by this browser.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    if (!latitude || !longitude) {
      alert("Please provide location coordinates");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    onSubmit(formData);
  };

  return (
    <section id="assessment" className="assessment-form">
      <div className="container">
        <h2>Start Your Environmental Assessment</h2>
        <p>
          Upload a photo of local vegetation and provide your location for a
          comprehensive analysis.
        </p>

        <form onSubmit={handleSubmit} className="form">
          {/* Image Upload */}
          <div className="form-group">
            <label className="form-label">
              <Camera className="label-icon" />
              Vegetation Photo
            </label>
            <div
              className="upload-area"
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <div className="image-preview">
                  <img src={URL.createObjectURL(image)} alt="Preview" />
                  <p>{image.name}</p>
                </div>
              ) : (
                <div className="upload-placeholder">
                  <Upload className="upload-icon" />
                  <p>Click to upload or drag and drop</p>
                  <span>JPG, PNG up to 10MB</span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />
            </div>
          </div>

          {/* Location */}
          <div className="form-group">
            <label className="form-label">
              <MapPin className="label-icon" />
              Location
            </label>
            <div className="location-inputs">
              <div className="coord-input">
                <input
                  type="number"
                  step="0.000001"
                  placeholder="Latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  required
                />
                <span className="coord-label">°N</span>
              </div>
              <div className="coord-input">
                <input
                  type="number"
                  step="0.000001"
                  placeholder="Longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  required
                />
                <span className="coord-label">°E</span>
              </div>
              <button
                type="button"
                className="location-btn"
                onClick={getCurrentLocation}
              >
                Use My Location
              </button>
            </div>
            {locationError && <p className="error">{locationError}</p>}
          </div>

          {/* Error Display */}
          {error && <div className="error-message">{error}</div>}

          {/* Submit Button */}
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <Loader className="loading-icon" />
                Analyzing...
              </>
            ) : (
              "Analyze Vegetation"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default AssessmentForm;
