import React from "react";
import "../../assets/css/Privacy.css";
import { FaShieldAlt, FaLock, FaDatabase } from "react-icons/fa";

const Privacy = () => {
  return (
    <section className="privacy-section">
      <div className="container">

        <h2 className="section-title fs-1">Privacy Policy</h2>
        <p className="intro-text fs-5">
          At TheProperty, we value your trust. This Privacy Policy explains how
          we collect, use, and protect your information when you use our
          real estate platform for buying, selling, or renting properties.
        </p>

        {/* How We Use */}
        <h4 className="sub-heading fs-3">How We Use Your Information</h4>
        <p className="fs-5">
          We use your information to provide better real estate services,
          property recommendations, and secure transactions.
        </p>

        {/* Primary Uses Card */}
        <div className="primary-card">
          <h5 >Primary Uses</h5>
          <ol className="fs-5">
            <li>Property buying and selling assistance</li>
            <li>Responding to customer inquiries</li>
            <li>Improving website performance</li>
            <li>Providing personalized property suggestions</li>
          </ol>
        </div>

        {/* Sharing Section */}
        <h4 className="sub-heading mt-5 fs-3">
          Information Sharing and Disclosure
        </h4>
        <p className="fs-5">
          We do not sell or rent your personal information to third parties.
          Your data is only shared when necessary for legal compliance or
          service improvement.
        </p>

        {/* Highlight Box */}
        <div className="highlight-box">
          <FaShieldAlt className="highlight-icon" />
          <h5>We Never Sell Your Data</h5>
          <p className="fs-5">
            Your trust is our priority. All customer information is handled
            securely and ethically.
          </p>
        </div>

        {/* Data Security */}
        <h4 className="sub-heading mt-5 fs-3">Data Security</h4>
        <p className="fs-5">
          We implement advanced security measures to ensure your personal
          and property-related information remains safe.
        </p>

        <div className="row security-cards">
          <div className="col-md-6">
            <div className="security-card">
              <FaLock className="security-icon" />
              <h6 className="fs-4">Encryption</h6>
              <p className="fs-5">
                All sensitive data is encrypted using secure technologies.
              </p>
            </div>
          </div>

          <div className="col-md-6">
            <div className="security-card">
              <FaDatabase className="security-icon" />
              <h6 className="fs-4">Secure Storage</h6>
              <p className="fs-5">
                User information is stored securely with restricted access.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Privacy;