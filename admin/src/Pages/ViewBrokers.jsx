import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/ViewBrokers.css";

const ViewBrokers = () => {
  const [brokers, setBrokers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/all-brokers");
      setBrokers(res.data.brokers || []);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteBroker = async (id) => {
    if (!window.confirm("Are you sure you want to delete this broker?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/auth/delete-broker/${id}`);
      fetchBrokers();
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = brokers.filter((b) =>
    [b.name, b.email, b.phone, b.agency, b.officeLocation, b.rera, b.gender]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="broker-wrapper">
      <div className="header">
        <h2 className="title">Broker Management</h2>

        <input
          type="text"
          placeholder="Search brokers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
      </div>

      <div className="broker-grid">
        {filtered.map((b) => (
          <div className="broker-card" key={b._id}>
            <img
              src={
                b.brokerImage
                  ? `http://localhost:5000/uploads/users/${b.brokerImage}`
                  : "/default.png"
              }
              className="broker-img"
              alt="broker"
            />

            <div className="broker-body">
              <h3>{b.name}</h3>
              <p className="agency">{b.agency}</p>

              <div className="info">
                <p>
                  <b>Email:</b> {b.email}
                </p>
                <p>
                  <b>Phone:</b> {b.phone}
                </p>

                <p>
                  <b>RERA:</b> {b.rera}
                </p>
                <p>
                  <b>Experience:</b> {b.experienceYears} Years
                </p>
                <p>
                  <b>Office:</b> {b.officeLocation}
                </p>
                <p>
                  <b>Address:</b> {b.address}
                </p>

                <p>
                  <b>Languages:</b> {b.languages?.join(", ")}
                </p>

                <hr />

                <p>
                  <b>Business Hours:</b>
                  <br />
                  Mon-Fri: {b.businessHours?.mondayFriday || "N/A"}
                  <br />
                  Sat: {b.businessHours?.saturday || "N/A"}
                  <br />
                  Sun: {b.businessHours?.sunday || "N/A"}
                </p>
              </div>

              <p className="summary">
                <b>Summary:</b> {b.professionalSummary}
              </p>

              <p className="quote">
                <b>Quote:</b> "{b.quotes}"
              </p>

              <div className="action-buttons">
                <button
                  className="delete-btn"
                  onClick={() => deleteBroker(b._id)}
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

export default ViewBrokers;
