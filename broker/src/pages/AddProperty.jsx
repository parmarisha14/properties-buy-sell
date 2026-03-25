import React, { useState } from "react";
import axios from "axios";
import "../assets/Css/AddProperty.css";

const AddProperty = () => {
  const [property, setProperty] = useState({
    name: "",
    price: "",
    location: "",
    city: "",
    state: "",
    bedroom: "",
    bathroom: "",
    area: "",
    year: "",
    type: "",
    description: "",
    features: [],
    image: null,
  });

  const [featureInput, setFeatureInput] = useState("");

  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProperty({ ...property, image: e.target.files[0] });
  };

  const addFeature = () => {
    if (featureInput.trim() !== "") {
      setProperty({
        ...property,
        features: [...property.features, featureInput],
      });
      setFeatureInput("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.keys(property).forEach((key) => {
        if (key === "features") {
          property.features.forEach((f) => formData.append("features", f));
        } else if (key === "image" && property.image) {
          formData.append("image", property.image);
        } else {
          formData.append(key, property[key]);
        }
      });

      await axios.post("http://localhost:5000/api/property/add", formData, {
        withCredentials: true,
      });
      alert("Property Added Successfully");

      setProperty({
        name: "",
        price: "",
        location: "",
        city: "",
        state: "",
        bedroom: "",
        bathroom: "",
        area: "",
        year: "",
        type: "",
        description: "",
        features: [],
        image: null,
      });
      setFeatureInput("");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Server Error");
    }
  };

  return (
    <div className="main-content">
      <div className="property-form-container">
        <h2>Add New Property</h2>
        <form className="property-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Property Image *</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <div className="form-group">
            <label>Year Built *</label>
            <input
              type="number"
              name="year"
              value={property.year}
              onChange={handleChange}
              placeholder="Ex: 2023"
              required
            />
          </div>

          <div className="form-group">
            <label>Property Name *</label>
            <input
              type="text"
              name="name"
              value={property.name}
              onChange={handleChange}
              placeholder="Ex: Sea View Villa"
              required
            />
          </div>

          <div className="form-group">
            <label>Property Type *</label>
            <select
              name="type"
              value={property.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Type</option>
              <option>Villa</option>
              <option>Apartment</option>
              <option>House</option>
              <option>Plot</option>
              <option>Penthouse</option>
            </select>
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={property.price}
              onChange={handleChange}
              placeholder="Ex: 5000000"
              required
            />
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={property.location}
              onChange={handleChange}
              placeholder="Street/Area"
              required
            />
          </div>

          <div className="form-group">
            <label>City *</label>
            <input
              type="text"
              name="city"
              value={property.city}
              onChange={handleChange}
              placeholder="City Name"
              required
            />
          </div>

          <div className="form-group">
            <label>State *</label>
            <input
              type="text"
              name="state"
              value={property.state}
              onChange={handleChange}
              placeholder="State Name"
              required
            />
          </div>

          <div className="form-group">
            <label>Bedroom *</label>
            <input
              type="number"
              name="bedroom"
              value={property.bedroom}
              onChange={handleChange}
              placeholder="Ex: 3"
              required
            />
          </div>

          <div className="form-group">
            <label>Bathroom *</label>
            <input
              type="number"
              name="bathroom"
              value={property.bathroom}
              onChange={handleChange}
              placeholder="Ex: 2"
              required
            />
          </div>

          <div className="form-group">
            <label>Area (sqft)</label>
            <input
              type="number"
              name="area"
              value={property.area}
              onChange={handleChange}
              placeholder="Ex: 1200"
              required
            />
          </div>

          <div className="form-group full">
            <label>Description</label>
            <textarea
              name="description"
              value={property.description}
              onChange={handleChange}
              placeholder="Write a short description of the property..."
              required
            />
          </div>

          <div className="form-group full">
            <label>Property Features</label>
            <div className="feature-box">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                placeholder="Ex: Swimming Pool"
                required
              />
              <button type="button" onClick={addFeature}>
                Add
              </button>
            </div>
            <ul className="feature-list">
              {property.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <button className="submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
