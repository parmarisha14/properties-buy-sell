import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ ADD
import "../assets/css/BrokerInquiries.css";

const BrokerInquiries = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ ADD

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/inquiry/delete/${id}`,
        { withCredentials: true }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ NEW BUTTON FUNCTION
  const handleAddMeeting = (item) => {
    navigate("/add-meeting", {
      state: { inquiry: item }
    });
  };

  if (loading) return <h2 className="loading">Loading...</h2>;

  return (
    <div className="main-content">
      <div className="inquiry-container">

        <h2 className="title">Property Inquiries</h2>

        {data.length === 0 ? (
          <p className="empty">No inquiries found</p>
        ) : (
          <div className="grid">

            {data.map((item) => (

              <div className="card" key={item._id}>

                {/* PROPERTY IMAGE */}
                <div className="property-img">
                  <img
                    src={
                      item.propertyId?.image
                        ? `http://localhost:5000/uploads/properties/${item.propertyId.image}`
                        : "/default-property.jpg"
                    }
                    alt=""
                  />
                </div>

                {/* HEADER */}
                <div className="top">
                  <h3>{item.propertyId?.name}</h3>
                  <span className={`status ${item.status}`}>
                    {item.status}
                  </span>
                </div>

                {/* PROPERTY */}
                <div className="section">
                  <p><strong>₹ {item.propertyId?.price}</strong></p>
                  <p>{item.propertyId?.location}</p>
                  <p>{item.propertyId?.city}</p>
                  <p>{item.propertyId?.state}</p>
                </div>

                {/* USER */}
                <div className="user-box">
                  <img
                    src={
                      item.userId?.profileImage
                        ? `http://localhost:5000/uploads/users/${item.userId.profileImage}`
                        : "/default-user.png"
                    }
                    alt=""
                  />

                  <div>
                    <h4>{item.userId?.fullName || item.name}</h4>
                    <p>{item.userId?.phone || item.phone}</p>
                    <p>{item.userId?.email || item.email}</p>
                  </div>
                </div>

                {/* MESSAGE */}
                <div className="section">
                  <p><strong>Date:</strong> {item.date}</p>
                  <p><strong>Message:</strong> {item.message}</p>
                </div>

                {/* BROKER */}
                <div className="broker-box">
                  <img
                    src={
                      item.brokerId?.brokerImage
                        ? `http://localhost:5000/uploads/users/${item.brokerId.brokerImage}`
                        : "/default-user.png"
                    }
                    alt=""
                  />
                  <div>
                    <h4>{item.brokerId?.name}</h4>
                    <p>{item.brokerId?.phone}</p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="buttons">

                  <button
                    className="accept"
                    onClick={() => handleStatus(item._id, "approved")}
                  >
                    Accept
                  </button>

                  {/* 🔥 NEW BUTTON */}
                  <button
                    className="add-meeting"
                    onClick={() => handleAddMeeting(item)}
                  >
                    Add Meeting
                  </button>

                  <button
                    className="reject"
                    onClick={() => handleStatus(item._id, "rejected")}
                  >
                    Reject
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
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