import React from "react";
import "../../assets/Css/NotFound.css";
import { FaHome, FaQuestionCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-box">
        <div className="left-error-section ">
          <div className="icon-circle big"></div>
          <div className="icon-circle small"></div>

          <div className="warning-icon">!</div>
        </div>

        <div className="right-section">
          <span className="error-badge">ERROR</span>

          <h1 className="code">404</h1>
          <h2 className="title">Page Not Found</h2>

          <p className="desc">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>

          <div className="btn-error-group">
            <button className="btn-error primary" onClick={() => navigate("/")}>
              <FaHome /> Back to Home
            </button>

            <button className="btn-error outline">
              <FaQuestionCircle /> Help Center
            </button>
          </div>

          <div className="suggest-box">
            <h4>You might want to:</h4>
            <ul>
              <li>Check our sitemap</li>
              <li>Contact support</li>
              <li>Return to previous page</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
