import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaCalendarAlt,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    fetchProperty();
  }, []);

  const fetchProperty = async () => {
    const res = await axios.get(`http://localhost:5000/api/property/${id}`);
    setProperty(res.data.property);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/inquiry", {
      ...form,
      propertyId: property._id,
      brokerId: property.brokerId._id,
    });

    alert("Request Sent Successfully");
  };

  if (!property) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <div className="left-section">
        <div className="main-image">
          <img
            src={`http://localhost:5000/uploads/properties/${property.image}`}
            alt="property"
            onError={(e) => {
              e.target.src = "https://via.placeholder.com/800x400";
            }}
          />
        </div>

        <div className="section">
          <h3>Description</h3>
          <p>{property.description}</p>
        </div>

        <div className="section">
          <h3>Features</h3>
          <div className="features-grid">
            {property.features?.map((f, i) => (
              <div key={i} className="feature-item">
                <FaCheckCircle className="icon" /> {f}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="right-section">
        <h2 className="price">₹ {property.price}</h2>

        <p className="location">
          <FaMapMarkerAlt /> {property.location}, {property.city}
        </p>

        <div className="info-box">
          <span className="fs-5">
            <FaBed /> {property.bedroom} bedroom
          </span>
          <span className="fs-5">
            <FaBath /> {property.bathroom} bathroom
          </span>
          <span className="fs-5">
            <FaRulerCombined /> {property.area} area
          </span>
        </div>

        <h3 className="year">
          <FaCalendarAlt /> {property.year}
        </h3>
        <h5 className="type mt-5">Type:{property.type}</h5>
        <div className="agent-box">
          <img
            src={
              property?.brokerId?.brokerImage
                ? `http://localhost:5000/uploads/users/${property.brokerId.brokerImage}`
                : "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt=""
          />
          <div>
            <h4>{property?.brokerId?.name}</h4>
            <p>
              <FaPhoneAlt /> {property?.brokerId?.phone}
            </p>
          </div>
        </div>

        <form className="form-box" onSubmit={handleSubmit}>
          <h3>Schedule a Tour</h3>

          <input
            name="name"
            placeholder="Your Name"
            onChange={handleChange}
            required
          />
          <input
            name="email"
            placeholder="Your Email"
            onChange={handleChange}
            required
          />
          <input
            name="phone"
            placeholder="Your Phone"
            onChange={handleChange}
            required
          />

          <label>Schedule a Tour for date:</label>
          <input type="date" name="date" onChange={handleChange} required />

          <textarea
            name="message"
            placeholder="Your Message"
            onChange={handleChange}
          ></textarea>

          <button type="submit">Send Request</button>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;
