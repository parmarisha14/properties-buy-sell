import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaLanguage, FaEnvelope } from "react-icons/fa";
import "../../assets/css/ExpertTeam.css";

const ExpertTeam = () => {

  const [brokers, setBrokers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrokers();
  }, []);

  const fetchBrokers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/all-brokers");
      setBrokers(res.data.brokers);
    } catch (err) {
      console.log(err);
    }
  };

  const goToDetails = (id) => {
    navigate(`/broker/${id}`);
  };

  return (
    <div className="team-section">
      <h2 className="title">Our Expert Team</h2>

      <div className="team-container">
        {brokers.map((broker) => (
          <div className="team-card" key={broker._id}>

            <div className="img-box">
              <img
                src={`http://localhost:5000/uploads/users/${broker.brokerImage}`}
                alt={broker.name}
              />
              {broker.rera && <span className="badge">✔ Verified</span>}
            </div>

            <div className="card-content">
              <h3>{broker.name}</h3>

              <p className="info">
                <FaEnvelope /> {broker.email}
              </p>

              <div className="languages">
                <FaLanguage />
                {broker.languages?.map((lang, i) => (
                  <span key={i}>{lang}</span>
                ))}
              </div>

              <button className="btn" onClick={() => goToDetails(broker._id)}>
                View Details
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpertTeam;