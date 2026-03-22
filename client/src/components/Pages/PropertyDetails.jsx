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
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    date: "",
    message: "",
  });

  useEffect(() => {
    fetchProperty();
    checkLogin();
  }, []);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/property/${id}`
      );
      setProperty(res.data.property);
    } catch (err) {
      console.log(err);
    }
  };

  const checkLogin = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/me", {
        withCredentials: true,
      });

      if (res.data.success) {
        const user = res.data.user;

        setIsLoggedIn(true);

        setForm((prev) => ({
          ...prev,
          fullName: user.fullName || user.name || "",
          email: user.email || "",
          phone: user.phone || "",
        }));
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date().toISOString().split("T")[0];

    if (!isLoggedIn) {
      alert("Please login first");
      navigate("/signin");
      return;
    }

    if (!form.date) {
      alert("Please select a date");
      return;
    }

    if (form.date < today) {
      alert("Past date not allowed. Please select today or future date.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/inquiry",
        {
          name: form.fullName,
          email: form.email,
          phone: form.phone,
          date: form.date,
          message: form.message,
          propertyId: property._id,
          brokerId: property.brokerId?._id,
        },
        { withCredentials: true }
      );

      alert("Request Sent Successfully");

      setForm((prev) => ({
        ...prev,
        date: "",
        message: "",
      }));

      // ✅ REDIRECT AFTER SUCCESS
      navigate("/my-requests");

    } catch (err) {
      console.log(err);
      alert("Error sending request");
    }
  };

  if (!property) return <h2>Loading...</h2>;

  const todayDate = new Date().toISOString().split("T")[0];

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
          <span>
            <FaBed /> {property.bedroom} bedroom
          </span>
          <span>
            <FaBath /> {property.bathroom} bathroom
          </span>
          <span>
            <FaRulerCombined /> {property.area} area
          </span>
        </div>

        <h3>
          <FaCalendarAlt /> {property.year}
        </h3>

        <h5>Type: {property.type}</h5>
        <h5>City: {property.city}</h5>
        <h5>State: {property.state}</h5>

        <div className="agent-box">
          <img
            src={
              property?.brokerId?.brokerImage
                ? `http://localhost:5000/uploads/users/${property.brokerId.brokerImage}`
                : "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="broker"
          />
          <div>
            <h4>{property?.brokerId?.name}</h4>
            <p>
              <FaPhoneAlt /> {property?.brokerId?.phone}
            </p>
          </div>
        </div>

        {isLoggedIn ? (
          <form className="form-box" onSubmit={handleSubmit}>
            <h3>Schedule a Tour</h3>

            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Your Name"
              required
            />

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your Email"
              required
            />

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Your Phone"
              required
            />

            <label>Schedule Date (Today or Future Only)</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              min={todayDate}
              required
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your Message"
            />

            <button type="submit">Send Request</button>
          </form>
        ) : (
          <div className="form-box">
            <h3>Please Login</h3>
            <p>You must login to send request</p>

            <button onClick={() => navigate("/signin")}>
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyDetails;