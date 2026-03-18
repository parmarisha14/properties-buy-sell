import React from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaPhoneAlt
} from "react-icons/fa";
import "../../assets/css/PropertyCard.css";

const PropertyCard = ({ property }) => {

  return (
    <div className="property-card">

      {/* IMAGE */}
      <div className="property-image">

        <img
          src={
            property.image
              ? `http://localhost:5000/uploads/properties/${property.image}`
              : "https://via.placeholder.com/400x250"
          }
          alt={property.name}
        />

        <span className="tag featured">Featured</span>
        <span className="tag sale">For Sale</span>

      </div>

      {/* DETAILS */}
      <div className="property-details">

        <h2 className="price">₹ {property.price}</h2>

        <h5 className="title">{property.name}</h5>

        <p className="location">
          <FaMapMarkerAlt /> {property.location}
        </p>

        <div className="info">
          <span><FaBed /> {property.bedroom} Bed</span>
          <span><FaBath /> {property.bathroom} Bath</span>
          <span><FaRulerCombined /> {property.area} sqft</span>
        </div>

        {/* BROKER */}
        <div className="agent">
          <img
            src={
              property?.brokerId?.brokerImage
                ? `http://localhost:5000/uploads/users/${property.brokerId.brokerImage}`
                : "https://randomuser.me/api/portraits/men/1.jpg"
            }
            alt="broker"
          />

          <div>
            <h6>{property?.brokerId?.name || "Broker Name"}</h6>
            <p>
              <FaPhoneAlt /> {property?.brokerId?.phone || "No Contact"}
            </p>
          </div>
        </div>

        <button className="view-btn">
          View Details
        </button>

      </div>

    </div>
  );
};

export default PropertyCard;