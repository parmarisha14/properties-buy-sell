import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaBuilding,
  FaHome,
  FaGem,
  FaChartLine
} from "react-icons/fa";

import "../../assets/css/BrokerDetails.css";

const BrokerDetails = () => {

  const { id } = useParams();
  const [broker, setBroker] = useState(null);

  useEffect(() => {
    fetchBroker();
  }, [id]);

  const fetchBroker = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/broker/${id}`
      );
      setBroker(res.data.broker);
    } catch (err) {
      console.log(err);
    }
  };

  if (!broker) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="details-container">

      {/* HEADER */}
      <div className="header">
        <img
          src={`http://localhost:5000/uploads/users/${broker.brokerImage}`}
          alt="broker"
        />

        <div>
          <h1>{broker.name}</h1>
          <p className="role">{broker.agency || "Real Estate Agent"}</p>

          <p className="location">
            <FaMapMarkerAlt /> {broker.address || "Location not available"}
          </p>
        </div>
      </div>

      <div className="main">

        {/* LEFT */}
        <div className="left">

          {/* QUOTES */}
          <div className="card quote-card">
            <p>"{broker.quotes || "No quote available"}"</p>
          </div>

          {/* SUMMARY */}
          <div className="card">
            <h3>Professional Summary</h3>
            <p>{broker.professionalSummary || "No summary available."}</p>
          </div>

          {/* SERVICES */}
          <div className="card">
            <h3>Service Areas & Expertise</h3>

            <div className="service-grid">

              <div className="service-box">
                <FaBuilding className="service-icon" />
                <div>
                  <h4>Downtown District</h4>
                  <p>High-rise condos and urban lofts</p>
                </div>
              </div>

              <div className="service-box">
                <FaHome className="service-icon" />
                <div>
                  <h4>Suburban Communities</h4>
                  <p>Family homes and neighborhoods</p>
                </div>
              </div>

              <div className="service-box">
                <FaGem className="service-icon" />
                <div>
                  <h4>Luxury Properties</h4>
                  <p>Premium estates and waterfront homes</p>
                </div>
              </div>

              <div className="service-box">
                <FaChartLine className="service-icon" />
                <div>
                  <h4>Investment Properties</h4>
                  <p>Commercial and rental opportunities</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="right">

          {/* CONTACT */}
          <div className="card">
            <h3>Let's Connect</h3>

            <div className="contact-item">
              <FaPhone className="icon" />
              <div>
                <p className="label">Phone</p>
                <a href={`tel:${broker.phone}`} className="value">
                  {broker.phone || "Not Available"}
                </a>
              </div>
            </div>

            <div className="contact-item">
              <FaEnvelope className="icon" />
              <div>
                <p className="label">Email</p>
                <a href={`mailto:${broker.email}`} className="value">
                  {broker.email || "Not Available"}
                </a>
              </div>
            </div>

            
          </div>

          {/* BUSINESS HOURS */}
          <div className="card">
            <h3>Business Hours</h3>
            <p><strong>Mon-Fri:</strong> {broker.businessHours?.mondayFriday || "N/A"}</p>
            <p><strong>Saturday:</strong> {broker.businessHours?.saturday || "N/A"}</p>
            <p><strong>Sunday:</strong> {broker.businessHours?.sunday || "Closed"}</p>
          </div>

          {/* OFFICE */}
          <div className="card">
            <h3>Office Location</h3>
            <p>
              <FaMapMarkerAlt /> {broker.officeLocation || "Not available"}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default BrokerDetails;