import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/BrokerInquiries.css";

const BrokerInquiries = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/inquiry/broker", {
        withCredentials: true,
      });
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
        { withCredentials: true },
      );
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this inquiry?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/inquiry/delete/${id}`, {
        withCredentials: true,
      });
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddMeeting = (item) => {
    navigate("/add-meeting", {
      state: { inquiry: item },
    });
  };

  const getPropertyImage = (property) => {
    if (!property) return "/default-property.jpg";

    if (property.image?.startsWith("http")) {
      return property.image;
    }

    if (property.image) {
      return `http://localhost:5000/uploads/properties/${property.image}`;
    }

    if (property.images?.length > 0) {
      return `http://localhost:5000/uploads/properties/${property.images[0]}`;
    }

    return "/default-property.jpg";
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
                <div className="property-img">
                  <img src={getPropertyImage(item.propertyId)} alt="property" />
                </div>

                <div className="inquires-property-name">
                  <h3>{item.propertyId?.name}</h3>
                  <span className={`status ${item.status}`}>{item.status}</span>
                </div>

                <div className="section">
                  <p>
                    <strong>₹ {item.propertyId?.price}</strong>
                  </p>
                  <p>{item.propertyId?.location}</p>
                </div>

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
                    <h4>{item.userId?.fullName}</h4>
                    <p>{item.userId?.phone}</p>
                    <p>{item.userId?.email}</p>
                  </div>
                </div>

                <div className="section">
                  <p>
                    <b>Date:</b> {item.date}
                  </p>
                  <p>
                    <b>Message:</b> {item.message}
                  </p>
                </div>

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

                <div className="buttons">
                  <button
                    className="accept"
                    onClick={() => handleStatus(item._id, "approved")}
                  >
                    Accept
                  </button>

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
