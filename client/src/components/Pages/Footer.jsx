import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaPaperPlane,
  FaArrowUp,
} from "react-icons/fa";
import "../../assets/Css/Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <div className="container py-5">
          <div className="row">
           
            <div className="col-lg-4 mb-4">
              <h3 className="footer-logo">TheProperty</h3>
              <p className="footer-text">
                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
                posuere cubilia curae. Donec velit neque auctor sit amet
                aliquam.
              </p>

              <h5 className="mt-4">Stay Updated</h5>
              <div className="subscribe-box">
                <input type="email" placeholder="Enter your email" />
                <button>
                  <FaPaperPlane />
                </button>
              </div>
            </div>

           
            <div className="col-lg-2 col-md-6 mb-4">
              <h5 className="footer-title">Company</h5>
              <ul className="footer-links">
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/terms">Terms</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link to="/blog">Blog</Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
              </ul>
            </div>

            
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-title">Services</h5>
              <ul className="footer-links">
                <li>
                  <Link to="/buy-property">Buy Property</Link>
                </li>
                <li>
                  <Link to="/sell-property">Sell Property</Link>
                </li>
              </ul>
            </div>

           
            <div className="col-lg-3 mb-4">
              <h5 className="footer-title">Get in Touch</h5>

              <div className="contact-item">
                <FaMapMarkerAlt />
                <span>
                  2847 Maple Avenue
                  <br />
                  Los Angeles, CA 90210
                  <br />
                  United States
                </span>
              </div>

              <div className="contact-item">
                <FaPhoneAlt />
                <span>+1 (555) 987-6543</span>
              </div>

              <div className="contact-item">
                <FaEnvelope />
                <span>contact@example.com</span>
              </div>

              <div className="social-icons mt-3">
                <a href="#">
                  <FaFacebookF />
                </a>
                <a href="#">
                  <FaTwitter />
                </a>
                <a href="#">
                  <FaLinkedinIn />
                </a>
                <a href="#">
                  <FaYoutube />
                </a>
                <a href="#">
                  <FaGithub />
                </a>
              </div>
            </div>
          </div>
        </div>

        
        <div className="footer-bottom">
          <div className="container d-flex justify-content-between align-items-center">
            <p className="mb-0">
              &copy; Copyright <strong>MyWebsite</strong> All Rights Reserved
            </p>

            <div className="bottom-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
            </div>

            <button className="scroll-top">
              <FaArrowUp />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
