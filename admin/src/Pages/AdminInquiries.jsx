import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminCard.css";

const AdminInquiries = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/inquiry/admin", {
        withCredentials: true,
      })
      .then((res) => setData(res.data.inquiries || []));
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:5000/api/inquiry/${id}`,
      { status },
      { withCredentials: true }
    );
    fetchData();
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    await axios.delete(
      `http://localhost:5000/api/inquiry/delete/${id}`,
      { withCredentials: true }
    );

    fetchData();
  };

  return (
    <div className="main-content">
      <h2 className="page-title">All Inquiries</h2>

      <div className="admin-grid">
        {data.map((item) => (
          <div className="admin-card" key={item._id}>
            <div className="property-img-box">
              <img
                src={
                  item.propertyId?.image
                    ? `http://localhost:5000/uploads/properties/${item.propertyId.image}`
                    : "/default-property.jpg"
                }
                alt=""
              />
            </div>

            <div className="admin-body">
              <h3>{item.propertyId?.name}</h3>
              <p className="price">₹ {item.propertyId?.price}</p>
              <p className="location">{item.propertyId?.location}</p>

              <hr />

              <div className="extra-info">
                <p><b>Date:</b> {item.date || "N/A"}</p>
                <p><b>Message:</b> {item.message || "No message"}</p>
              </div>

              <hr />

              <div className="user-info">
                <img
                  src={
                    item.userId?.profileImage
                      ? `http://localhost:5000/uploads/users/${item.userId.profileImage}`
                      : "/default-user.png"
                  }
                  alt=""
                />
                <div>
                  <p>{item.userId?.fullName}</p>
                  <p>{item.userId?.phone}</p>
                </div>
              </div>

              <div className="broker-info">
                <img
                  src={
                    item.brokerId?.brokerImage
                      ? `http://localhost:5000/uploads/users/${item.brokerId.brokerImage}`
                      : "/default-broker.png"
                  }
                  alt=""
                />
                <div>
                  <p>{item.brokerId?.name}</p>
                  <p>{item.brokerId?.phone}</p>
                </div>
              </div>

              <div className="status-box">
                <span className={`status ${item.status}`}>
                  {item.status}
                </span>
              </div>

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