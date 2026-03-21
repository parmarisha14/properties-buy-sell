import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaHome,
  FaMapMarkerAlt,
  FaPhone,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaTrash,
} from "react-icons/fa";

import "../../assets/css/UserInquiries.css";

const UserInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/inquiry/user", {
        withCredentials: true,
      });
      setInquiries(res.data.inquiries || []);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/inquiry/delete/${id}`, {
        withCredentials: true,
      });
      fetchInquiries();
    } catch (err) {
      console.log(err);
    }
  };

  const getStatus = (status) => {
    if (status === "approved") {
      return (
        <span className="status approved">
          <FaCheckCircle /> Approved
        </span>
      );
    }
    if (status === "rejected") {
      return (
        <span className="status rejected">
          <FaTimesCircle /> Rejected
        </span>
      );
    }
    return (
      <span className="status pending">
        <FaClock /> Pending
      </span>
    );
  };

  return (
    <div className="inquiry-container">
      <h2 className="title">My Property Requests</h2>

      {loading ? (
        <h3>Loading...</h3>
      ) : inquiries.length === 0 ? (
        <h3>No Requests Found</h3>
      ) : (
        <div className="inquiry-grid">
          {inquiries.map((inq) => (
            <div key={inq._id} className="inquiry-card">
              {/* IMAGE */}
              <div className="property-img">
                <img
                  src={
                    inq.propertyId?.image
                      ? `http://localhost:5000/uploads/properties/${inq.propertyId.image}`
                      : "/default-property.jpg"
                  }
                  alt=""
                />
              </div>

              <div className="card-header">
                <h3>
                  <FaHome /> {inq.propertyId?.name}
                </h3>
                {getStatus(inq.status)}
              </div>

              <div className="card-body">
                <p>
                  <FaMapMarkerAlt /> {inq.propertyId?.location}
                </p>
                <h5> City:{inq.propertyId?.city}</h5>
                <h5 className="mt-2">State: {inq.propertyId?.state}</h5>
                <p>
                  <strong>₹ {inq.propertyId?.price}</strong>
                </p>
                <p>
                  <FaCalendarAlt /> {inq.date}
                </p>
                <p className="message">{inq.message}</p>
              </div>

              <div className="broker-box">
                <img
                  src={
                    inq.brokerId?.brokerImage
                      ? `http://localhost:5000/uploads/users/${inq.brokerId.brokerImage}`
                      : "/default-user.png"
                  }
                  alt=""
                />
                <div>
                  <h4>{inq.brokerId?.name}</h4>
                  <p>
                    <FaPhone /> {inq.brokerId?.phone}
                  </p>
                </div>
              </div>

              <button
                className="delete-btn"
                onClick={() => handleDelete(inq._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserInquiries;
