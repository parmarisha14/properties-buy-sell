import React, { useState, useEffect } from "react";
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaHeart,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/PropertyCard.css";

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (property?._id) {
      checkWishlist();
    }
  }, [property]);

  const checkWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist", {
        withCredentials: true,
      });

      const exists = res.data.list.find(
        (item) => item.propertyId?._id === property?._id,
      );

      setLiked(!!exists);
    } catch (err) {
      console.log(err);
    }
  };

  const handleWishlist = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/wishlist/toggle",
        { propertyId: property._id },
        { withCredentials: true },
      );

      setLiked(res.data.action === "added");
    } catch (err) {
      alert("Please login first!");
    }
  };

  const handleViewDetails = () => {
    navigate(`/property/${property._id}`);
  };

  return (
    <div className="property-card">
      <div className="property-image">
        <img
          src={
            property?.image
              ? `http://localhost:5000/uploads/properties/${property.image}`
              : "https://via.placeholder.com/400x250"
          }
          alt="property"
        />

        <div
          className={`wishlist-icons ${liked ? "active" : ""}`}
          onClick={handleWishlist}
        >
          <FaHeart />
        </div>

        <span className="tag featured">Featured</span>
      </div>

      <div className="property-details">
        <h2 className="price">₹ {property?.price}</h2>

        <h5 className="title">{property?.name}</h5>

        <p className="location">
          <FaMapMarkerAlt /> {property?.location}
        </p>

        <div className="info">
          <span>
            <FaBed /> {property?.bedroom} Bed
          </span>
          <span>
            <FaBath /> {property?.bathroom} Bath
          </span>
          <span>
            <FaRulerCombined /> {property?.area} sqft
          </span>
        </div>

        <div className="agent">
          <img
            src={
              property?.brokerId?.brokerImage
                ? `http://localhost:5000/uploads/users/${property.brokerId.brokerImage}`
                : "/default-user.png"
            }
            alt="broker"
          />

          <div>
            <h6>{property?.brokerId?.name}</h6>
            <p>
              <FaPhoneAlt /> {property?.brokerId?.phone}
            </p>
          </div>
        </div>

        <button className="view-btn" onClick={handleViewDetails}>
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
