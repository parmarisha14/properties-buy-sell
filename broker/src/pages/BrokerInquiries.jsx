import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/BrokerInquiries.css";

const BrokerInquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/inquiry/broker",
        { withCredentials: true }
      );

      setData(res.data.inquiries || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/inquiry/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="main-content">
      <div className="inquiry-container">
        <h2 className="title">All Property Inquiries</h2>

        {data.length === 0 ? (
          <p className="empty">No inquiries found</p>
        ) : (
          <div className="grid">
            {data.map((item) => (
              <div className="card" key={item._id}>

                <div className="top">
                  <h3>{item.propertyId?.name}</h3>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </div>

                <div className="section">
                  <p><strong>Price:</strong> ₹ {item.propertyId?.price}</p>
                  <p><strong>Location:</strong> {item.propertyId?.location}</p>
                </div>

                <div className="section">
                  <h4>User Details</h4>
                  <p>{item.userId?.fullName || item.name}</p>
                  <p>{item.userId?.email || item.email}</p>
                  <p>{item.userId?.phone || item.phone}</p>
                </div>

                <div className="section">
                  <p><strong>Date:</strong> {item.date}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                </div>

                <div className="buttons">
                  <button
                    className="accept"
                    onClick={() => handleStatus(item._id, "accepted")}
                  >
                    Accept
                  </button>

                  <button
                    className="reject"
                    onClick={() => handleStatus(item._id, "rejected")}
                  >
                    Reject
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrokerInquiries;