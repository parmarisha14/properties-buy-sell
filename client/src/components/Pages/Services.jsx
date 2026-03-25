import React from "react";
import "../../assets/css/Services.css";
import {
  FaHome,
  FaBuilding,
  FaSearch,
  FaHandshake,
  FaDollarSign,
  FaMapMarkedAlt,
  FaKey,
  FaTools,
} from "react-icons/fa";

const Services = () => {
  return (
    <section className="services-section">
      <div className="container">
        <h2>Our Services</h2>

        <div className="services-container">
          <div className="service-card">
            <div className="service-icon">
              <FaHome />
            </div>
            <h4>Residential Property Sales</h4>
            <p>
              We assist you in buying and selling residential properties with
              complete trust and transparency.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaBuilding />
            </div>
            <h4>Commercial Property</h4>
            <p>
              Get expert help in dealing with offices, shops, and commercial
              properties efficiently.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaSearch />
            </div>
            <h4>Property Search</h4>
            <p>
              Search and discover your ideal property easily using our advanced
              tools.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaHandshake />
            </div>
            <h4>Consultation & Guidance</h4>
            <p>
              Receive professional advice on property investment, legal process,
              and decision making.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaDollarSign />
            </div>
            <h4>Property Valuation</h4>
            <p>
              Know the exact value of your property with our accurate market
              analysis.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaMapMarkedAlt />
            </div>
            <h4>Location Assistance</h4>
            <p>
              Find the perfect location based on your needs, budget, and future
              growth.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaKey />
            </div>
            <h4>Property Rental</h4>
            <p>
              We help you find the best rental properties or tenants quickly and
              easily.
            </p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaTools />
            </div>
            <h4>Property Maintenance</h4>
            <p>
              Get reliable maintenance and repair services to keep your property
              in top condition.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
