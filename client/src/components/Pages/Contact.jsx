import React from "react";
import "../../assets/css/Contact.css";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaClock,
  FaUser,
  FaPaperPlane,
  FaCommentDots
} from "react-icons/fa";

const Contact = () => {
  return (
    <>
      
      <section className="contact-info-section">
        <div className="container">
          <div className="row g-4">

            
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon-circle">
                  <FaMapMarkerAlt className="contact-icon" />
                </div>
                <div>
                  <h6>Our Address</h6>
                  <p>
                    Ruchi Harmony, Navsari <br />
                    Gujarat 396427
                  </p>
                </div>
              </div>
            </div>

            
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon-circle">
                  <FaEnvelope className="contact-icon" />
                </div>
                <div>
                  <h6>Email Address</h6>
                  <p>
                    info@example.com <br />
                    contact@example.com
                  </p>
                </div>
              </div>
            </div>

            
            <div className="col-md-4">
              <div className="info-box">
                <div className="icon-circle">
                  <FaClock className="contact-icon" />
                </div>
                <div>
                  <h6>Hours of Operation</h6>
                  <p>
                    Sunday-Fri: 9 AM - 6 PM <br />
                    Saturday: 9 AM - 4 PM
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      
      <section className="map-section">
        <iframe
          title="map"
          src="https://www.google.com/maps?q=Ruchi+Harmony+Navsari+Gujarat+396427&output=embed"
          loading="lazy"
        ></iframe>
      </section>

      
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-form-wrapper">
            <h3 className="text-center fw-bold mb-4">Get in Touch</h3>

            <form>
              <div className="row g-3">

                <div className="col-md-6">
                  <div className="input-icon">
                    <FaUser />
                    <input type="text" placeholder="First Name" />
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-icon">
                    <FaEnvelope />
                    <input type="email" placeholder="Email Address" />
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-icon">
                    <FaPaperPlane />
                    <input type="text" placeholder="Subject" />
                  </div>
                </div>

                <div className="col-12">
                  <div className="input-icon textarea">
                    <FaCommentDots />
                    <textarea rows="5" placeholder="Write Message..."></textarea>
                  </div>
                </div>

                <div className="col-12 text-center">
                  <button type="submit" className="btn-main">
                    SEND MESSAGE
                  </button>
                </div>

              </div>
            </form>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;