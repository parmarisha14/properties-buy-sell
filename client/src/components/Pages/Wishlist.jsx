import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyCard from "../../components/Pages/PropertyCard";
import "../../assets/css/Wishlist.css";

axios.defaults.withCredentials = true;

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/wishlist");

      if (res.data.success) {
        const properties = res.data.list
          .map((item) => item.propertyId)
          .filter(Boolean);

        setWishlist(properties);
      }
    } catch (err) {
      console.log("Wishlist error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  return (
    <div className="wishlist-page">
      <div className="wishlist-wrapper">

        <h2 className="wishlist-title">❤️ My Wishlist</h2>

        {loading ? (
          <div className="loader">Loading...</div>

        ) : wishlist.length === 0 ? (
          <div className="empty-state">
            <h3>No properties in wishlist 😔</h3>
            <p>Add your favorite properties</p>
          </div>

        ) : (
          <div className="wishlist-grid">
            {wishlist.map((property) => (
              <div className="wishlist-card" key={property._id}>
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default Wishlist;