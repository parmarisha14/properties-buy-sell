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
    image: null
  });

  const [preview, setPreview] = useState(null);

  // ================= FETCH PROPERTY =================
  useEffect(() => {

    const fetchProperty = async () => {

      try {

        const res = await axios.get(
          "http://localhost:5000/api/property/broker"
        );

        const prop = res.data.find(
          (p) => p._id.toString() === id
        );

        if (prop) {

          const features = Array.isArray(prop.features)
            ? prop.features
            : [];

          setProperty((prev) => ({
            ...prev,
            ...prop,
            features,
            image: null
          }));

          setPreview(
            prop.image
              ? `http://localhost:5000/uploads/${prop.image}`
              : null
          );

        }

      } catch (error) {
        console.log("Fetch Error:", error);
      }

    };

    fetchProperty();

  }, [id]);

  // ================= INPUT CHANGE =================
  const handleChange = (e) => {

    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });

  };

  // ================= FEATURES =================
  const handleFeatures = (e) => {

    const value = e.target.value;

    setProperty({
      ...property,
      features: value.split(",").map((f) => f.trim())
    });

  };

  // ================= FILE =================
  const handleFile = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setProperty({
      ...property,
      image: file
    });

    setPreview(URL.createObjectURL(file));

  };

  // ================= UPDATE PROPERTY =================
  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      Object.keys(property).forEach((key) => {

        if (key === "image" && property.image) {

          formData.append("image", property.image);

        } else if (key === "features") {

          formData.append(
            "features",
            property.features.join(",")
          );

        } else {

          formData.append(key, property[key]);

        }

      });

      await axios.put(
        `http://localhost:5000/api/property/update/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Property Updated Successfully");

      navigate("/manage");

    } catch (error) {

      console.log("Update Error:", error);

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
              type="text"
              name="name"
              value={property.name || ""}
              onChange={handleChange}
              placeholder="Property Name"
            />

            <input
              type="number"
              name="price"
              value={property.price || ""}
              onChange={handleChange}
              placeholder="Price"
            />

            <input
              type="text"
              name="location"
              value={property.location || ""}
              onChange={handleChange}
              placeholder="Location"
            />

            <input
              type="text"
              name="city"
              value={property.city || ""}
              onChange={handleChange}
              placeholder="City"
            />

            <input
              type="text"
              name="state"
              value={property.state || ""}
              onChange={handleChange}
              placeholder="State"
            />

            <input
              type="number"
              name="bedroom"
              value={property.bedroom || ""}
              onChange={handleChange}
              placeholder="Bedrooms"
            />

            <input
              type="number"
              name="bathroom"
              value={property.bathroom || ""}
              onChange={handleChange}
              placeholder="Bathrooms"
            />

            <input
              type="number"
              name="area"
              value={property.area || ""}
              onChange={handleChange}
              placeholder="Area"
            />

            <input
              type="number"
              name="year"
              value={property.year || ""}
              onChange={handleChange}
              placeholder="Year Built"
            />

            <input
              type="text"
              name="type"
              value={property.type || ""}
              onChange={handleChange}
              placeholder="Property Type"
            />

            <input
              type="text"
              value={
                property.features
                  ? property.features.join(",")
                  : ""
              }
              onChange={handleFeatures}
              placeholder="Features (Parking,Garden,Pool)"
            />

            <textarea
              name="description"
              value={property.description || ""}
              onChange={handleChange}
              placeholder="Description"
            />

            <input type="file" onChange={handleFile} />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="preview-img"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            )}

            <button type="submit">
              Update Property
            </button>

          </form>

        </div>

      </div>

    </div>
  );
};

export default EditProperty;