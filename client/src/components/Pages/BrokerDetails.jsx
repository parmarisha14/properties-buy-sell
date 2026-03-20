import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import {
  FaPhone,
  FaEnvelope,
  FaBuilding,
  FaHome,
  FaGem,
  FaChartLine,
  FaMapMarkerAlt,
  FaClock,
  FaLanguage,
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
        `http://localhost:5000/api/auth/broker/${id}`,
      );
      setBroker(res.data.broker);
    } catch (err) {
      console.log(err);
    }
  };

  if (!broker) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="details-container">
      <div className="main">
        <div className="left-profile">
          <img
            src={
              broker.brokerImage
                ? `http://localhost:5000/uploads/users/${broker.brokerImage}`
                : "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="broker"
          />

          <h2>{broker.name}</h2>
          <p className="role">{broker.agency || "Real Estate Agent"}</p>

          <p className="location">
            <FaMapMarkerAlt /> {broker.address || "No location"}
          </p>
        </div>

        <div className="right-content">
          <div className="card quote-card">
            <p>"{broker.quotes || "Find your perfect rental"}"</p>
          </div>

          <div className="card">
            <h3>Professional Summary</h3>
            <p>{broker.professionalSummary || "No summary available."}</p>
          </div>

          <div className="card">
            <h3>Broker Details</h3>

            <p>
              <strong>Agency:</strong> {broker.agency || "N/A"}
            </p>
            <p>
              <strong>RERA:</strong> {broker.rera || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong> {broker.experienceYears || 0} Years
            </p>
            <p>
              <strong>Office Location:</strong> {broker.officeLocation || "N/A"}
            </p>
          </div>

          <div className="card">
            <h3>
              <FaLanguage /> Languages
            </h3>

            <div className="service-grid">
              {broker.languages?.length > 0 ? (
                broker.languages.map((lang, i) => (
                  <div className="services-box" key={i}>
                    <p>{lang}</p>
                  </div>
                ))
              ) : (
                <p>No languages available</p>
              )}
            </div>
          </div>

          <div className="card">
            <h3>
              <FaClock /> Business Hours
            </h3>

            <p>Mon - Fri: {broker.businessHours?.mondayFriday || "N/A"}</p>
            <p>Saturday: {broker.businessHours?.saturday || "N/A"}</p>
            <p>Sunday: {broker.businessHours?.sunday || "Closed"}</p>
          </div>
          <div className="card">
            <h3>Let's Connect</h3>

            <div className="contact-item">
              <FaPhone className="icon" />
              <div>
                <p className="label">Phone</p>
                <p className="value">{broker.phone || "Not available"}</p>
              </div>
            </div>

            <div className="contact-item">
              <FaEnvelope className="icon" />
              <div>
                <p className="label">Email</p>
                <p className="value">{broker.email || "Not available"}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <h3>Service Areas & Expertise</h3>

            <div className="service-grid">
              <div className="services-box">
                <div className="services-icon">
                  <FaBuilding />
                </div>
                <div>
                  <h4>Downtown District</h4>
                  <p>High-rise condos & urban living</p>
                </div>
              </div>

              <div className="services-box">
                <div className="services-icon">
                  <FaHome />
                </div>
                <div>
                  <h4>Suburban Homes</h4>
                  <p>Family friendly communities</p>
                </div>
              </div>

              <div className="services-box">
                <div className="services-icon">
                  <FaGem />
                </div>
                <div>
                  <h4>Luxury Properties</h4>
                  <p>Premium real estate deals</p>
                </div>
              </div>

              <div className="services-box">
                <div className="services-icon">
                  <FaChartLine />
                </div>
                <div>
                  <h4>Investments</h4>
                  <p>Rental & commercial properties</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrokerDetails;
