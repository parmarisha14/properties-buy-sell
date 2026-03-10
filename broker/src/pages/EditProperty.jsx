import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../assets/Css/EditProperty.css";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  const [preview, setPreview] = useState(null);

  // Fetch property data
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const broker = JSON.parse(localStorage.getItem("broker"));
        const res = await axios.get(
          `http://localhost:5000/api/property/broker/${broker._id}`
        );
        const prop = res.data.find((p) => p._id === id);
        if (prop) {
          // Ensure features is always an array
          const features = Array.isArray(prop.features) ? prop.features : [];
          setProperty({ ...prop, features, image: null });
          setPreview(
            prop.image
              ? `http://localhost:5000/uploads/properties/${prop.image}`
              : "https://via.placeholder.com/200x150?text=No+Image"
          );
        }
      } catch (err) {
        console.log("Fetch Error:", err);
      }
    };
    fetchProperty();
  }, [id]);

  // Handle text/number changes
  const handleChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  // Handle features input as comma-separated values
  const handleFeaturesChange = (e) => {
    setProperty({
      ...property,
      features: e.target.value.split(",").map((f) => f.trim()),
    });
  };

  // Handle file change for image
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProperty({ ...property, image: e.target.files[0] });
      setPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // Submit updated property
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Append fields to formData
      Object.keys(property).forEach((key) => {
        if (key === "image" && property.image instanceof File) {
          formData.append("image", property.image);
        } else if (key === "features") {
          // Send features as comma-separated string
          formData.append("features", property.features.join(","));
        } else if (property[key] !== null && property[key] !== undefined) {
          formData.append(key, property[key]);
        }
      });

      await axios.put(
        `http://localhost:5000/api/property/update/${id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Property updated successfully!");
      navigate("/manage");
    } catch (err) {
      console.log("Update Error:", err);
      alert("Failed to update property.");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <h2>Edit Property</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            value={property.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="number"
            name="price"
            value={property.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />
          <input
            type="text"
            name="location"
            value={property.location}
            onChange={handleChange}
            placeholder="Location"
            required
          />
          <input
            type="text"
            name="city"
            value={property.city}
            onChange={handleChange}
            placeholder="City"
            required
          />
          <input
            type="text"
            name="state"
            value={property.state}
            onChange={handleChange}
            placeholder="State"
            required
          />
          <input
            type="number"
            name="bedroom"
            value={property.bedroom}
            onChange={handleChange}
            placeholder="Bedroom"
          />
          <input
            type="number"
            name="bathroom"
            value={property.bathroom}
            onChange={handleChange}
            placeholder="Bathroom"
          />
          <input
            type="number"
            name="area"
            value={property.area}
            onChange={handleChange}
            placeholder="Area"
          />
          <input
            type="number"
            name="year"
            value={property.year}
            onChange={handleChange}
            placeholder="Year"
          />
          <input
            type="text"
            name="type"
            value={property.type}
            onChange={handleChange}
            placeholder="Type"
          />
          <input
            type="text"
            value={property.features.join(", ")}
            onChange={handleFeaturesChange}
            placeholder="Features, comma separated"
          />
          <textarea
            name="description"
            value={property.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <input type="file" name="image" onChange={handleFileChange} />
          {preview && (
            <img src={preview} alt="Preview" style={{ width: "200px" }} />
          )}

          <button type="submit">Update Property</button>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;