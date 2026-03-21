import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/Pages/PropertyCard";
import "../../assets/css/AllProperties.css";

const AllProperties = () => {

  const [properties, setProperties] = useState([]);
  const [cities, setCities] = useState([]);
  const [states, setStates] = useState([]); 
  const [priceRanges, setPriceRanges] = useState([]);

  const [filters, setFilters] = useState({
    type: "",
    priceRange: "",
    city: "",
    state: ""
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProperties();
    fetchLocations();
    fetchPriceRange();
  }, []);

 
  const fetchProperties = async (params = {}) => {
    setLoading(true);

    try {
      console.log("API PARAMS:", params); 

      const res = await axios.get(
        "http://localhost:5000/api/property/approved",
        { params }
      );

      setProperties(res.data.properties || []);

    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  
  const fetchLocations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/property/locations"
      );

      setCities(res.data.cities || []);
      setStates(res.data.states || []);

    } catch (err) {
      console.log(err);
    }
  };

  
  const fetchPriceRange = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/property/price-range"
      );

      const { minPrice, maxPrice } = res.data;

      const step = Math.ceil((maxPrice - minPrice) / 5) || 1;

      let ranges = [];

      for (let i = minPrice; i < maxPrice; i += step) {
        ranges.push({
          min: i,
          max: i + step
        });
      }

      setPriceRanges(ranges);

    } catch (err) {
      console.log(err);
    }
  };

  
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  
  const applyFilters = () => {
    let cleaned = {};

    if (filters.type) cleaned.type = filters.type;
    if (filters.city) cleaned.city = filters.city;
    if (filters.state) cleaned.state = filters.state;

    
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-");

      cleaned.minPrice = Number(min);
      cleaned.maxPrice = Number(max);
    }

    fetchProperties(cleaned);
  };

  
  const resetFilters = () => {
    setFilters({
      type: "",
      priceRange: "",
      city: "",
      state: ""
    });

    fetchProperties();
  };

  
  return (
    <div className="main-container">

      
      <div className="property-section">
        <div className="property-grid">
          {loading ? (
            <h2>Loading...</h2>
          ) : properties.length > 0 ? (
            properties.map((p) => (
              <PropertyCard key={p._id} property={p} />
            ))
          ) : (
            <h2>No Properties Found</h2>
          )}
        </div>
      </div>

      
      <div className="filter-section">

        <h3>Filter Properties</h3>

        
        <div className="filter-group">
          <label>Type</label>
          <select name="type" value={filters.type} onChange={handleChange}>
            <option value="">All</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
          </select>
        </div>

       
        <div className="filter-group">
          <label>Price Range</label>
          <select
            name="priceRange"
            value={filters.priceRange}
            onChange={handleChange}
          >
            <option value="">All</option>

            {priceRanges.map((r, i) => (
              <option key={i} value={`${r.min}-${r.max}`}>
                ₹ {r.min.toLocaleString()} - ₹ {r.max.toLocaleString()}
              </option>
            ))}
          </select>
        </div>

        
        <div className="filter-group">
          <label>City</label>
          <select name="city" value={filters.city} onChange={handleChange}>
            <option value="">All</option>
            {cities.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        
        <div className="filter-group">
          <label>State</label>
          <select name="state" value={filters.state} onChange={handleChange}>
            <option value="">All</option>
            {states.map((s, i) => (
              <option key={i} value={s}>{s}</option>
            ))}
          </select>
        </div>

        
        <div className="filter-actions">
          <button className="apply-btn" onClick={applyFilters}>
            Apply
          </button>

          <button className="reset-btn" onClick={resetFilters}>
            Reset
          </button>
        </div>

      </div>

    </div>
  );
};

export default AllProperties;