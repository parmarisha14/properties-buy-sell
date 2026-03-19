import React, { useEffect, useState } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaCheckCircle,
  FaPhoneAlt,
  FaCalendarAlt,
  FaHome
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../../assets/css/PropertyDetails.css";

const PropertyDetails = () => {

  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (id) fetchProperty();
  }, [id]);

  const fetchProperty = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/property/${id}`
      );

      const data = res.data.property;
      setProperty(data);

      const imgs = data?.image ? [data.image] : [];
      setActiveImage(imgs[0]);

    } catch (error) {
      console.log(error);
    }
  };

  if (!property) return <h2>Loading...</h2>;

  const images = property?.image ? [property.image] : [];

  return (
    <div className="details-container">

      {/* LEFT */}
      <div className="left-section">

        <div className="main-image">
          <img
            src={`http://localhost:5000/uploads/properties/${activeImage}`}
            alt=""
          />
        </div>

        {/* DESCRIPTION */}
        <div className="section">
          <h3>About This Property</h3>
          <p>{property.description}</p>
        </div>

        {/* FEATURES */}
        <div className="section">
          <h3>Amenities & Features</h3>

          <div className="features-grid">
            {property.features?.length > 0 ? (
              property.features.map((item, i) => (
                <div className="feature-item" key={i}>
                  <FaCheckCircle /> {item}
                </div>
              ))
            ) : (
              <p>No Features</p>
            )}
          </div>
        </div>

      </div>

      {/* RIGHT */}
      <div className="right-section">

        {/* PRICE */}
        <div className="price-box">
          <h2>₹ {property.price}</h2>
      
        </div>

        {/* LOCATION */}
        <p className="location">
          <FaMapMarkerAlt /> {property.location}, {property.city}, {property.state}
        </p>

        {/* BASIC INFO */}
        <div className="info-box">
          <span><FaBed /> {property.bedroom} Beds</span>
          <span><FaBath /> {property.bathroom} Baths</span>
          <span><FaRulerCombined /> {property.area} sqft</span>
        </div>

        {/* EXTRA DETAILS */}
        <div className="extra-details">
          
          <h3><FaCalendarAlt /> Year Built: {property.year}</h3>
          
        </div>

        {/* AGENT */}
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
            <p><FaPhoneAlt /> {property?.brokerId?.phone}</p>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="form-box">
          <h4>Schedule a Tour</h4>

          <input placeholder="Your Name" />
          <input placeholder="Your Email" />
          <input placeholder="Your Phone" />
          <textarea placeholder="Message"></textarea>

          <button>Schedule Tour</button>
        </div>

      </div>

    </div>
  );
};

export default PropertyDetails;