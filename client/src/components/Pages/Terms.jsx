import React from "react";
import "../../assets/Css/Terms.css";
import {FaEnvelope,FaBell,} from "react-icons/fa";
import { NavLink } from "react-router";

function Terms() {
  return (
    <section className="terms-section py-5">
      <div className="container">
        
        <div className="text-center mb-5">
          <h1 className="fw-semibold main-title">Terms of Service</h1>
          <p className="text-muted">
            Please read these terms carefully before using our property buying &
            selling services.
          </p>
        </div>

        
        <div className="mb-5">
          <h3 className="section-title">1. Property Listings</h3>
          <p className="text-muted fs-5">
            All property listings displayed on our platform are for
            informational purposes only. We do not guarantee complete accuracy
            of pricing, availability, or property specifications.
          </p>
        </div>

       
        <div className="mb-5">
          <h3 className="section-title">2. Buying & Selling Responsibility</h3>
          <p className="text-muted fs-5">
            Buyers and sellers are solely responsible for verifying legal
            documentation, ownership, pricing, and property conditions before
            completing any transaction.
          </p>
        </div>

        
        <div className="mb-5">
          <h3 className="section-title">3. User Accounts</h3>
          <p className="text-muted fs-5">
            When registering on our website, users must provide accurate
            information. Providing false information may result in account
            suspension or termination.
          </p>
        </div>

        
        <div className="mb-5">
          <h3 className="section-title">4. Prohibited Activities</h3>
          <ul className="custom-list mt-3 fs-5">
            <li>Posting fake or misleading property listings</li>
            <li>Unauthorized access to system data</li>
            <li>Misrepresenting property details</li>
            <li>Violating any local real estate laws</li>
          </ul>
        </div>

        
        <div className="mb-5">
          <h3 className="section-title">5. Disclaimers</h3>
          <p className="text-muted fs-5">
            Our platform acts only as an intermediary between buyers and
            sellers. We are not responsible for disputes, fraud, or property
            condition issues.
          </p>
        </div>

        
        <div className="mb-4">
          <h3 className="section-title">6. Limitation of Liability</h3>
          <p className="text-muted fs-5">
            We shall not be liable for indirect, incidental, or consequential
            damages arising from the use of our real estate platform.
          </p>
        </div>

        
        <div className="mb-4">
          <h3 className="section-title">7. Indemnification</h3>
          <p className="text-muted fs-5">
            Users agree to indemnify and hold harmless our company against any
            claims arising from misuse of the platform.
          </p>
        </div>

        
        <div className="mb-4">
          <h3 className="section-title">8. Termination</h3>
          <p className="text-muted fs-5">
            We reserve the right to suspend or terminate accounts that violate
            our property listing policies.
          </p>
        </div>

       
        <div className="mb-4">
          <h3 className="section-title">9. Governing Law</h3>
          <p className="text-muted fs-5">
            These terms shall be governed in accordance with the laws of your
            country.
          </p>
        </div>

        
        <div className="mb-4">
          <h3 className="section-title">10. Changes to Terms</h3>
          <p className="text-muted  fs-5">
            We reserve the right to update or modify these terms at any time.
            Changes will be posted on this page.
          </p>
        </div>

        
        <div className="revision-alert d-flex align-items-center p-3 mt-4">
          <FaBell className="me-3" />
          <span>
            By continuing to access or use our service after revisions become
            effective, you agree to be bound by the revised terms.
          </span>
        </div>

       
        <div className="contact-box mt-5 p-4 d-flex justify-content-between align-items-center flex-wrap">
          <div className="d-flex align-items-center">
            <div className="contact-icon me-3">
              <FaEnvelope />
            </div>
            <div>
              <h5 className="mb-1">Questions About Terms?</h5>
              <p className="text-muted mb-0">
                If you have any questions about these Terms, please contact us.
              </p>
            </div>
          </div>
          <NavLink
            to="/contact"
            className="contact-btn mt-3 mt-md-0 text-decoration-none d-inline-block"
          >
            Contact Support
          </NavLink>
        </div>
      </div>
    </section>
  );
}

export default Terms;
