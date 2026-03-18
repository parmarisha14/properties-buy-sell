import React from "react";
import "../../assets/Css/About.css";
import building from "../../assets/Images/Home3.jpg";
import interior from "../../assets/Images/about.jpg";

import about2 from "../../assets/Images/Home4.jpg";
import founder from "../../assets/Images/person-3.jpg";

import { FaStar } from "react-icons/fa";

const About = () => {
  return (
    <>
      <section className="about-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="about-badge mb-3 d-inline-block">
                <FaStar className="me-2" />
                Trusted By Hundreds Of Happy Clients
              </span>

              <h2 className="about-title mb-4">
                Turning Property Goals Into Reality
              </h2>

              <p className="about-text">
                We understand that buying or selling a property is one of the
                most important decisions in life. That’s why we focus on
                providing personalized solutions tailored to each client’s
                unique needs.
              </p>

              <p className="about-text">
                Our expert team ensures complete transparency, honest advice,
                and market-driven strategies so you can make confident and
                informed decisions without stress or confusion.
              </p>

              <p className="about-text">
                From first consultation to final paperwork, we stay by your side
                — ensuring a smooth, secure, and successful transaction.
              </p>

              <div className="founder-box mt-4 d-flex align-items-start">
                <img src={founder} alt="Founder" className="founder-img" />
                <div className="ms-3">
                  <p className="fst-italic mb-2">
                    "Our clients are not just customers — they are long-term
                    partners."
                  </p>
                  <h6 className="fw-bold mb-0">Rajesh Patel</h6>
                  <small className="text-success">Founder & CEO</small>
                </div>
              </div>
            </div>

            <div className="col-lg-6 position-relative about-img-wrapper mt-5 mt-lg-0">
              <img
                src={building}
                alt="Building"
                className="img-fluid main-img"
              />

              <img src={interior} alt="Interior" className="small-img shadow" />
            </div>
          </div>
        </div>
      </section>

      <section className="our-story-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <span className="story-badge mb-3 d-inline-block">
                <FaStar className="me-2" />
                Why Choose Us
              </span>

              <h2 className="about-title mb-4">
                Dedicated To Delivering Exceptional Property Experiences
              </h2>

              <p className="about-text">
                We combine deep market knowledge with a client-first approach.
                Every property we handle is managed with attention to detail,
                strong negotiation skills, and complete professionalism.
              </p>

              <p className="about-text">
                Whether you are a first-time buyer, an investor, or a seller
                looking for the best market value, we provide strategic guidance
                and full support throughout the entire process.
              </p>

              <p className="about-text">
                Our goal is simple — to build trust, create value, and ensure
                every client walks away satisfied and confident.
              </p>

              <button className="btn explore-btn mt-3">
                Explore Available Properties
              </button>
            </div>

            <div className="col-lg-6 text-center mt-4 mt-lg-0">
              <img src={about2} alt="Modern Home" className="story-img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
