import React from "react";
import "../../assets/css/Services.css";
import { FaHome, FaBuilding, FaSearch, FaHandshake, FaDollarSign, FaMapMarkedAlt } from "react-icons/fa";

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
            <p>We help you buy and sell residential homes with ease and complete transparency.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaBuilding />
            </div>
            <h4>Commercial Property</h4>
            <p>Expert assistance in buying and selling offices, shops, and commercial spaces.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaSearch />
            </div>
            <h4>Property Search</h4>
            <p>Find your dream property with our extensive listings and search tools.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaHandshake />
            </div>
            <h4>Consultation & Guidance</h4>
            <p>We provide expert advice on property deals, legal procedures, and investment.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaDollarSign />
            </div>
            <h4>Property Valuation</h4>
            <p>Get accurate property valuation and market insights for selling or buying.</p>
          </div>

          <div className="service-card">
            <div className="service-icon">
              <FaMapMarkedAlt />
            </div>
            <h4>Location Assistance</h4>
            <p>We help you select the best location for your property investments.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Services;