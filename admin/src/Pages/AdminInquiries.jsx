import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminCard.css";

const AdminInquiries = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/inquiry/admin",
        { withCredentials: true }
      );
      setData(res.data.inquiries || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ STATUS UPDATE
  const updateStatus = async (id, status) => {
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

  // ✅ DELETE FIX
  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure to delete this inquiry?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/inquiry/${id}`,
        { withCredentials: true }
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="main-content">

      <h2 className="page-title">All Inquiries</h2>

      <div className="admin-grid">

        {data.map((item) => (

          <div className="admin-card" key={item._id}>

            {/* PROPERTY */}
            <img
              className="property-img"
              src={
                item.propertyId?.image
                  ? `http://localhost:5000/uploads/properties/${item.propertyId.image}`
                  : "/default-property.jpg"
              }
              alt=""
            />

            <div className="card-body">

              <h3>{item.propertyId?.name}</h3>
              <p className="price">₹ {item.propertyId?.price}</p>
              <p className="location">{item.propertyId?.location}</p>

              {/* ✅ DATE + MESSAGE FIX */}
              <div className="date-time">
                <p><b>Date:</b> {item.date || "-"}</p>
                <p><b>Message:</b> {item.message || "-"}</p>
              </div>

              <hr />

              {/* USER */}
              <div className="person-box">
                <img
                  src={
                    item.userId?.profileImage
                      ? `http://localhost:5000/uploads/users/${item.userId.profileImage}`
                      : "/default-user.png"
                  }
                  alt=""
                />
                <div>
                  <h4>{item.userId?.fullName}</h4>
                  <p>{item.userId?.phone}</p>
                </div>
              </div>

              {/* BROKER */}
              <div className="person-box">
                <img
                  src={
                    item.brokerId?.brokerImage
                      ? `http://localhost:5000/uploads/users/${item.brokerId.brokerImage}`
                      : "/default-broker.png"
                  }
                  alt=""
                />
                <div>
                  <h4>{item.brokerId?.name}</h4>
                  <p>{item.brokerId?.phone}</p>
                </div>
              </div>

              {/* STATUS */}
              <div className="status-box">
                <span className={`status ${item.status}`}>
                  {item.status}
                </span>
              </div>

              {/* ACTIONS */}
              <div className="action-buttons">

                <button
                  className="approve-btn"
                  onClick={() => updateStatus(item._id, "approved")}
                >
                  Approve
                </button>

                <button
                  className="reject-btn"
                  onClick={() => updateStatus(item._id, "rejected")}
                >
                  Reject
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteInquiry(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default AdminInquiries;