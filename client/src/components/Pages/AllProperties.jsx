import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/Pages/PropertyCard";
import "../../assets/css/AllProperties.css";

const AllProperties = () => {

  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const propertiesPerPage = 6;

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

  // ✅ PAGINATION LOGIC
  const indexOfLast = currentPage * propertiesPerPage;
  const indexOfFirst = indexOfLast - propertiesPerPage;

  const currentProperties = properties.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(properties.length / propertiesPerPage);

  return (
    <div className="main-container">

      {/* LEFT SIDE */}
      <div className="property-section">

        <div className="property-grid">
          {currentProperties.length > 0 ? (
            currentProperties.map((property) => (
              <PropertyCard
                key={property._id}
                property={property}
              />
            ))
          ) : (
            <h2>No Properties Found</h2>
          )}
        </div>

        {/* ✅ PAGINATION UI */}
        <div className="pagination">

          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              className={currentPage === i + 1 ? "active" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>

        </div>

      </div>

      {/* RIGHT SIDE FILTER */}
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