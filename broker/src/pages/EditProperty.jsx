import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../assets/Css/EditProperty.css";

axios.defaults.withCredentials = true;

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
  const [featureInput, setFeatureInput] = useState("");

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/property/broker",
        );

        const prop = res.data.properties.find((p) => p._id === id);

        if (!prop) return;

        const featuresArray = Array.isArray(prop.features)
          ? prop.features
          : prop.features
            ? prop.features.split(",").map((f) => f.trim())
            : [];

        setProperty({
          ...prop,
          features: featuresArray,
          image: null,
        });

        setPreview(
          prop.image ? `http://localhost:5000/uploads/${prop.image}` : null,
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value,
    });
  };

  const addFeature = () => {
    const value = featureInput.trim();
    if (!value) return;

    setProperty((prev) => {
      const exists = prev.features.some(
        (f) => f.toLowerCase() === value.toLowerCase(),
      );

      if (exists) return prev;

      return {
        ...prev,
        features: [...prev.features, value],
      };
    });

    setFeatureInput("");
  };

  const handleAddFeature = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFeature();
    }
  };

  const removeFeature = (index) => {
    setProperty((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setProperty({
      ...property,
      image: file,
    });

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.keys(property).forEach((key) => {
        if (key === "image") {
          if (property.image) formData.append("image", property.image);
        } else if (key === "features") {
          formData.append("features", property.features.join(","));
        } else {
          formData.append(key, property[key]);
        }
      });

      await axios.put(
        `http://localhost:5000/api/property/update/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      alert("Property Updated Successfully");
      navigate("/manage");
    } catch (err) {
      console.log(err);
      alert("Update Failed");
    }
  };

  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-content">
        <div className="edit-card">
          <h2>Edit Property</h2>

          <form onSubmit={handleSubmit} className="edit-form">
            <input
              name="name"
              value={property.name}
              onChange={handleChange}
              placeholder="Property Name"
            />
            <input
              name="price"
              value={property.price}
              onChange={handleChange}
              placeholder="Price"
            />
            <input
              name="location"
              value={property.location}
              onChange={handleChange}
              placeholder="Location"
            />
            <input
              name="city"
              value={property.city}
              onChange={handleChange}
              placeholder="City"
            />
            <input
              name="state"
              value={property.state}
              onChange={handleChange}
              placeholder="State"
            />
            <input
              name="bedroom"
              value={property.bedroom}
              onChange={handleChange}
              placeholder="Bedrooms"
            />
            <input
              name="bathroom"
              value={property.bathroom}
              onChange={handleChange}
              placeholder="Bathrooms"
            />
            <input
              name="area"
              value={property.area}
              onChange={handleChange}
              placeholder="Area"
            />
            <input
              name="year"
              value={property.year}
              onChange={handleChange}
              placeholder="Year Built"
            />
            <input
              name="type"
              value={property.type}
              onChange={handleChange}
              placeholder="Property Type"
            />

            <input
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleAddFeature}
              placeholder="Type feature & press Enter"
            />

            <button type="button" onClick={addFeature}>
              Add Feature
            </button>

            <div className="feature-list">
              {property.features.map((f, i) => (
                <span key={i} className="feature-chip">
                  {f}
                  <button type="button" onClick={() => removeFeature(i)}>
                    ×
                  </button>
                </span>
              ))}
            </div>

            <textarea
              name="description"
              value={property.description}
              onChange={handleChange}
              placeholder="Description"
            />

            <input type="file" onChange={handleFile} />

            {preview && (
              <img src={preview} className="preview-img" alt="preview" />
            )}

            <button type="submit">Update Property</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProperty;
