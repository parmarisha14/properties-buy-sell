import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/Pages/PropertyCard";
import "../../assets/css/AllProperties.css";

const AllProperties = () => {

  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {

      const res = await axios.get(
        "http://localhost:5000/api/property/approved"
      );

      if (res.data?.properties) {
        setProperties(res.data.properties);
      } else {
        setProperties([]);
      }

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  return (
    <div className="main-container">

      {/* LEFT SIDE - PROPERTIES */}
      <div className="property-section">

        <div className="property-grid">

          {properties.length > 0 ? (
            properties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))
          ) : (
            <h2>No Properties Found</h2>
          )}

        </div>

      </div>

      {/* RIGHT SIDE (STATIC FILTER UI only design) */}
      <div className="filter-section">

        <h3>Filter Properties</h3>

        <select>
          <option>All Types</option>
          <option>House</option>
          <option>Apartment</option>
        </select>

        <div className="price">
          <input type="number" placeholder="Min Price" />
          <input type="number" placeholder="Max Price" />
        </div>

        <input placeholder="Enter city or neighborhood" />

        <button className="apply-btn">
          Apply Filters
        </button>

      </div>

    </div>
  );
};

export default AllProperties;