import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/AdminCard.css";

const AdminInquiries = () => {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/inquiry/admin", {
      withCredentials: true
    }).then(res => setData(res.data.inquiries));
  }, []);

  return (
    <div className="broker-wrapper">

      <h2 className="page-title">All Inquiries</h2>

      <div className="broker-grid">

        {data.map((item) => (

          <div className="broker-card" key={item._id}>

            <img
              className="broker-img"
              src={
                item.propertyId?.image
                  ? `http://localhost:5000/uploads/properties/${item.propertyId.image}`
                  : "/default-property.jpg"
              }
            />

            <div className="broker-body">

              <h3>{item.propertyId?.name}</h3>
              <p className="agency">₹ {item.propertyId?.price}</p>

              <p className="broker-info">
                📍 {item.propertyId?.location}
              </p>

              <hr />

              <p><strong>User:</strong> {item.userId?.fullName}</p>
              <p>{item.userId?.phone}</p>

              <p><strong>Broker:</strong> {item.brokerId?.name}</p>

              <p><strong>Status:</strong>
                <span className={`status ${item.status}`}>
                  {item.status}
                </span>
              </p>

            </div>

          </div>

        ))}

      </div>
    </div>
  );
};

export default AdminInquiries;