import React from "react";
import {
  FaStar,
  FaCheckCircle,
  FaArrowRight,
  FaBuilding,
  FaSearch,
  FaChartLine,
  FaKey,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUsers,
} from "react-icons/fa";
import Home1 from "../../assets/Images/Home1.jpg";
import Home2 from "../../assets/Images/Home2.jpg";
import Home3 from "../../assets/Images/Home3.jpg";
import Home4 from "../../assets/Images/Home4.jpg";
import Home5 from "../../assets/Images/Home5.jpg";

import person1 from "../../assets/Images/person-1.jpg";
import person2 from "../../assets/Images/person-2.jpg";
import person3 from "../../assets/Images/person-5.jpg";
import person4 from "../../assets/Images/person-4.jpg";
import "../../assets/Css/Home.css";

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="premium-badge">
                <FaStar className="me-2" />
                Premium Properties
              </div>

              <h1 className="hero-title">
                Discover Your Perfect Home in the Heart of the City
              </h1>

              <p className="hero-text">
                Browse thousands of verified listings from trusted agents. Find
                your perfect home with modern amenities and great locations.
              </p>

              <div className="search-box">
                <div className="custom-field full">
                  <label>Location</label>
                  <select>
                    <option>Select Location</option>
                    <option>New York</option>
                    <option>London</option>
                    <option>Mumbai</option>
                  </select>
                </div>

                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="custom-field">
                      <label>Property Type</label>
                      <select>
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Villa</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="custom-field">
                      <label>Price Range</label>
                      <select>
                        <option>Price Range</option>
                        <option>$100k - $300k</option>
                        <option>$300k - $600k</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="custom-field">
                      <label>Bedrooms</label>
                      <select>
                        <option>Bedrooms</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3+</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="custom-field">
                      <label>Bathrooms</label>
                      <select>
                        <option>Bathrooms</option>
                        <option>1</option>
                        <option>2</option>
                        <option>3+</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button className="search-btn w-100 mt-3">
                  <FaSearch className="me-2" />
                  Search Properties
                </button>
              </div>
            </div>

            <div className="col-lg-6 position-relative">
              <img src={Home2} alt="house" className="hero-image" />

              <div className="small-img-card">
                <img src={Home1} alt="interior" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="about-badge">
                <FaBuilding className="me-2" />
                Premium Real Estate
              </div>

              <h2 className="about-title">
                Transforming Real Estate Dreams Into Reality
              </h2>

              <p className="about-text">
                We help buyers and sellers achieve their real estate goals with
                trusted expertise and personalized service. From luxury homes to
                smart investments, our team ensures a smooth and rewarding
                property experience. Your dream property is just one smart
                decision away.
              </p>

              <ul className="feature-list">
                <li>
                  <FaCheckCircle className="check-icon" />
                  Expert market analysis and pricing strategies
                </li>

                <li>
                  <FaCheckCircle className="check-icon" />
                  Personalized property matching services
                </li>

                <li>
                  <FaCheckCircle className="check-icon" />
                  Professional photography and virtual tours
                </li>
              </ul>

              <button className="about-btn">
                Learn More About Us
                <FaArrowRight className="ms-2" />
              </button>
            </div>

            <div className="col-lg-6 position-relative">
              <img src={Home3} alt="main" className="about-main-img" />

              <div className="bottom-images">
                <img src={Home4} alt="small1" />
                <img src={Home5} alt="small2" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="services-section py-5">
        <div className="container text-center">
          <h2 className="section-title">Featured Services</h2>
          <p className="section-subtitle">
            Our comprehensive real estate services are designed to simplify your
            property journey. From finding your dream home to handling legal
            documentation, we provide trusted support at every step.
          </p>

          <div className="row mt-5 g-4">
            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="icon-circle">
                  <FaSearch />
                </div>
                <span className="number">01</span>
                <h4>Property Search</h4>
                <p className="features-text">
                  Explore verified property listings with advanced filters to
                  find homes that perfectly match your needs and budget.
                </p>

                <ul className="features-text">
                  <li>
                    <FaCheckCircle /> Advanced Search Filters
                  </li>
                  <li>
                    <FaCheckCircle /> 360° Virtual Tours
                  </li>
                  <li>
                    <FaCheckCircle /> Real-time Property Updates
                  </li>
                </ul>

                <button className="btn custom-btn">Explore Properties →</button>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card active-card ">
                <div className="icon-circle active-icon">
                  <FaChartLine />
                </div>
                <span className="number active-number">02</span>
                <h4>Market Analysis</h4>
                <p className="active-features-text">
                  Get accurate market insights, price trends, and investment
                  strategies to make informed property decisions.
                </p>

                <ul className="active-features-text">
                  <li>
                    <FaCheckCircle /> Price Trend Reports
                  </li>
                  <li>
                    <FaCheckCircle /> Investment Insights
                  </li>
                  <li>
                    <FaCheckCircle /> Market Forecasting
                  </li>
                </ul>

                <button className="btn active-btn">Get Analysis →</button>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="icon-circle">
                  <FaKey />
                </div>
                <span className="number">03</span>
                <h4>Property Management</h4>
                <p className="features-text">
                  Complete property management solutions including tenant
                  screening, maintenance, and rent collection services.
                </p>

                <ul className="features-text">
                  <li>
                    <FaCheckCircle /> Tenant Screening
                  </li>
                  <li>
                    <FaCheckCircle /> Rental Collection
                  </li>
                  <li>
                    <FaCheckCircle /> Maintenance Services
                  </li>
                </ul>

                <button className="btn custom-btn">Manage Now →</button>
              </div>
            </div>

            <div className="col-lg-3 col-md-6">
              <div className="service-card">
                <div className="icon-circle">
                  <FaShieldAlt />
                </div>
                <span className="number">04</span>
                <h4>Legal Support</h4>
                <p className="features-text">
                  Ensure safe and secure transactions with expert legal
                  assistance and proper documentation handling.
                </p>

                <ul className="features-text">
                  <li>
                    <FaCheckCircle /> Contract Review
                  </li>
                  <li>
                    <FaCheckCircle /> Title Verification
                  </li>
                  <li>
                    <FaCheckCircle /> Legal Documentation
                  </li>
                </ul>

                <button className="btn custom-btn">Learn More →</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonials-section py-5">
        <div className="container text-center">
          <h2 className="section-title">Testimonials</h2>
          <p className="section-subtitle">
            What our happy clients say about our property services
          </p>

          <div
            id="testimonialCarousel"
            className="carousel slide mt-5"
            data-bs-ride="carousel"
            data-bs-interval="4000"
          >
            <div className="carousel-inner">
              
              <div className="carousel-item active">
                <div className="testimonial-card">
                  <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                      <h4>
                        Buying my first home felt overwhelming, but the team
                        made everything simple and transparent. From property
                        visits to final paperwork, the entire journey was smooth
                        and stress-free. I truly felt supported at every step.
                      </h4>

                      <div className="d-flex align-items-center mt-4">
                        <img
                          src={person3}
                          alt="Amit Patel"
                          className="client-small-img"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">Amit Patel</h6>
                          <small>Property Buyer</small>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <img
                        src={person3}
                        alt="Amit Patel"
                        className="main-client-img"
                      />
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="carousel-item">
                <div className="testimonial-card">
                  <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                      <h4>
                        Their market knowledge and investment guidance helped me
                        choose the right property with strong future value. The
                        process was secure, quick, and professionally handled.
                      </h4>

                      <div className="d-flex align-items-center mt-4">
                        <img
                          src={person2}
                          alt="Sneha Desai"
                          className="client-small-img"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">Sneha Desai</h6>
                          <small>Real Estate Investor</small>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <img
                        src={person2}
                        alt="Sneha Desai"
                        className="main-client-img"
                      />
                    </div>
                  </div>
                </div>
              </div>

            
              <div className="carousel-item">
                <div className="testimonial-card">
                  <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                      <h4>
                        Selling my property was faster than I expected. Their
                        pricing strategy and marketing approach brought serious
                        buyers quickly. I’m extremely satisfied with the final
                        deal.
                      </h4>

                      <div className="d-flex align-items-center mt-4">
                        <img
                          src={person1}
                          alt="Sakshi Patel"
                          className="client-small-img"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">Sakshi Patel</h6>
                          <small>Home Seller</small>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <img
                        src={person1}
                        alt="Sakshi Patel"
                        className="main-client-img"
                      />
                    </div>
                  </div>
                </div>
              </div>

              
              <div className="carousel-item">
                <div className="testimonial-card">
                  <div className="row align-items-center">
                    <div className="col-lg-6 text-start">
                      <h4>
                        I was looking for a commercial space for my startup.
                        Their expert advice and fast documentation process made
                        everything hassle-free. Highly recommended for business
                        owners.
                      </h4>

                      <div className="d-flex align-items-center mt-4">
                        <img
                          src={person4}
                          alt="Karan Shah"
                          className="client-small-img"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">Karan Shah</h6>
                          <small>Business Owner</small>
                        </div>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <img
                        src={person4}
                        alt="Karan Shah"
                        className="main-client-img"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="carousel-buttons mt-4">
              <button
                className="carousel-btn"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="prev"
              >
                ‹
              </button>

              <button
                className="carousel-btn"
                type="button"
                data-bs-target="#testimonialCarousel"
                data-bs-slide="next"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="whyus-section py-5">
        <div className="container">
          <div className="text-center mb-4">
            <h3 className="section-title">Why Us</h3>
            <p className="section-small mt-4">
              Necessitatibus eius consequatur ex aliquid fuga eum quidem sint
              consectetur velit
            </p>
          </div>

          <div className="row align-items-center mt-5">
            <div className="col-lg-6 position-relative">
              <div className="image-wrapper">
                <img src={Home2} alt="house" className="img-fluid main-img" />
              </div>
            </div>

            <div className="col-lg-6">
              <span className="badge why-badge mb-3">
                <FaStar className="me-2" /> Why Elite Properties
              </span>

              <h2 className="main-heading">
                Your Gateway to Exceptional Real Estate Experiences
              </h2>

              <p className="text-muted mt-3">
                Our platform simplifies property transactions by offering
                verified listings, advanced search filters, expert guidance, and
                secure documentation support — all in one place.
              </p>

              <div className="row mt-4">
                <div className="col-md-6 feature-box">
                  <FaMapMarkerAlt className="feature-icon" />
                  <h6>Prime Locations</h6>
                  <p>Exclusive access to top neighborhoods and markets.</p>
                </div>

                <div className="col-md-6 feature-box">
                  <FaShieldAlt className="feature-icon" />
                  <h6>Guaranteed Results</h6>
                  <p>Proven success in real estate transactions.</p>
                </div>

                <div className="col-md-6 feature-box">
                  <FaClock className="feature-icon" />
                  <h6>Fast Processing</h6>
                  <p>Quick documentation and deal closing support.</p>
                </div>

                <div className="col-md-6 feature-box">
                  <FaUsers className="feature-icon" />
                  <h6>Expert Team</h6>
                  <p>Certified professionals with market knowledge.</p>
                </div>
              </div>

              <div className="mt-4">
                <button className="btn explore-btn me-3">
                  Explore Properties
                </button>
                <button className="btn schedule-btn">
                  Schedule Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
