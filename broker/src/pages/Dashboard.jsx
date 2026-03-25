import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Dashboard.css";

axios.defaults.withCredentials = true;

const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [search, setSearch] = useState("");

  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });

  const [meetingStats, setMeetingStats] = useState({
    total: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
  });

  useEffect(() => {
    fetchProperties();
    fetchMeetings();
  }, []);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/property/broker");

      const data = res.data.properties || [];
      setProperties(data);

      setStats({
        total: data.length,
        approved: data.filter((p) => p.status === "approved").length,
        pending: data.filter((p) => p.status === "pending").length,
        rejected: data.filter((p) => p.status === "rejected").length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/meeting/broker");

      const meetingData = res.data.meetings || [];
      setMeetings(meetingData);

      setMeetingStats({
        total: meetingData.length,
        confirmed: meetingData.filter((m) => m.status === "confirmed").length,
        pending: meetingData.filter((m) => m.status === "pending").length,
        cancelled: meetingData.filter((m) => m.status === "cancelled").length,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredProperties = properties.filter((p) => {
    const t = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(t) ||
      p.city?.toLowerCase().includes(t) ||
      p.status?.toLowerCase().includes(t)
    );
  });

  const filteredMeetings = meetings.filter((m) => {
    const t = search.toLowerCase();
    return (
      m.userId?.fullName?.toLowerCase().includes(t) ||
      m.userId?.phone?.toLowerCase().includes(t) ||
      m.propertyId?.name?.toLowerCase().includes(t) ||
      m.message?.toLowerCase().includes(t) ||
      m.status?.toLowerCase().includes(t)
    );
  });

  return (
    <div className="main-content">
      <div className="dashboard">
        <h2>Broker Dashboard</h2>

        <div className="stats-container">
          <div className="stat-card stat-total">
            Total Property {stats.total}
          </div>
          <div className="stat-card stat-approved">
            Approved Property {stats.approved}
          </div>
          <div className="stat-card stat-pending">
            Pending Property {stats.pending}
          </div>
          <div className="stat-card stat-rejected">
            Rejected Property {stats.rejected}
          </div>

          <div className="stat-card stat-total">
            Meetings {meetingStats.total}
          </div>
          <div className="stat-card stat-approved">
            Confirmed {meetingStats.confirmed}
          </div>
          <div className="stat-card stat-pending">
            Pending Meetings {meetingStats.pending}
          </div>
          <div className="stat-card stat-rejected">
            Cancelled {meetingStats.cancelled}
          </div>
        </div>

        <div className="table-container">
          <h3>Your Properties</h3>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search properties / meetings..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filteredProperties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>City</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {filteredProperties.map((p) => (
                  <tr key={p._id}>
                    <td>{p.name}</td>
                    <td>{p.city}</td>
                    <td>₹ {p.price}</td>
                    <td>
                      <span className={`status status-${p.status}`}>
                        {p.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="table-container" style={{ marginTop: "30px" }}>
          <h3>Scheduled Meetings</h3>

          {filteredMeetings.length === 0 ? (
            <p>No meetings found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Phone</th>
                  <th>Property</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th>Message</th>
                </tr>
              </thead>

              <tbody>
                {filteredMeetings.map((m) => (
                  <tr key={m._id}>
                    <td>{m.userId?.fullName || "-"}</td>
                    <td>{m.userId?.phone || "-"}</td>
                    <td>{m.propertyId?.name || "-"}</td>
                    <td>{m.date}</td>
                    <td>{m.time}</td>
                    <td>
                      <span
                        className={`status status-${m.status || "pending"}`}
                      >
                        {m.status || "pending"}
                      </span>
                    </td>
                    <td>{m.message || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
