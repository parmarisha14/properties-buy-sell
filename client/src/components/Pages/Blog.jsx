import React from "react";
import "../../assets/css/Blog.css";
import blog1 from "../../assets/Images/blog1.jpg";
import blog2 from "../../assets/Images/blog2.jpg";
import blog3 from "../../assets/Images/blog3.jpg";
import blog4 from "../../assets/Images/blog4.jpg";
import blog5 from "../../assets/Images/blog5.jpg";
// import blog6 from "../../assets/Images/blog6.jpg";
// import blog7 from "../../assets/Images/blog7.jpg";
// import blog8 from "../../assets/Images/blog8.jpg";

const Blog = () => {
  return (
    <section className="blog-section py-5">
      <div className="container">
        <div className="row g-4">

          {/* LEFT SIDE */}
          <div className="col-lg-3">

            <div className="blog-card small-card mb-4">
              <div className="blog-img">
                <span className="badge bg-danger">Market</span>
                <img src={blog1} alt="market" />
              </div>
              <div className="blog-content">
                <h5>Real Estate Market Trends</h5>
                <p className="fs-6">
                  Discover property price growth patterns and future hotspots.
                </p>
              </div>
            </div>

            <div className="blog-card small-card mb-4">
              <div className="blog-img">
                <span className="badge bg-success">Investment</span>
                <img src={blog2} alt="investment" />
              </div>
              <div className="blog-content">
                <h5>Why Property Investment is Safer</h5>
                <p className="fs-6">
                  Stable returns and long-term financial security explained.
                </p>
              </div>
            </div>

            {/* NEW 1 */}
            <div className="blog-card small-card">
              <div className="blog-img">
                <span className="badge bg-info text-dark">Finance</span>
                <img src={blog3} alt="finance" />
              </div>
              <div className="blog-content">
                <h5>Home Loan Approval Process</h5>
                <p className="fs-6">
                  Understand documents, eligibility criteria, and EMI planning.
                </p>
              </div>
            </div>

          </div>

          {/* CENTER FEATURED */}
          <div className="col-lg-6">

            <div className="blog-card featured-card mb-4">
              <img src={blog3} alt="featured" />
              <div className="blog-content">
                <h2>Complete Guide to Buying Your First Dream Home</h2>
                <p className="fs-6">
                  Learn budgeting, legal verification, and smart investment
                  strategies before purchasing your first property.
                </p>
              </div>
            </div>

            {/* NEW 2 - Featured Style */}
            <div className="blog-card featured-card">
              <img src={blog2} alt="construction" />
              <div className="blog-content">
                <h2>Future of Smart Homes & Technology</h2>
                <p className="fs-6">
                  Explore automation, energy-saving systems, and modern
                  smart home innovations shaping real estate.
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-3">

            <div className="blog-card small-card mb-4">
              <div className="blog-img">
                <span className="badge bg-primary">Buying Tips</span>
                <img src={blog4} alt="buying" />
              </div>
              <div className="blog-content">
                <h5>Checklist Before Finalizing Deal</h5>
                <p className="fs-6">
                  Verify documents and inspect property before closing.
                </p>
              </div>
            </div>

            <div className="blog-card small-card mb-4">
              <div className="blog-img">
                <span className="badge bg-warning text-dark">Lifestyle</span>
                <img src={blog5} alt="lifestyle" />
              </div>
              <div className="blog-content">
                <h5>Modern Interior Design Ideas</h5>
                <p className="fs-6">
                  Stylish and functional interior concepts for new homes.
                </p>
              </div>
            </div>

            {/* NEW 3 */}
            <div className="blog-card small-card">
              <div className="blog-img">
                <span className="badge bg-secondary">Construction</span>
                <img src={blog5} alt="construction" />
              </div>
              <div className="blog-content">
                <h5>Construction Quality Check Guide</h5>
                <p className="fs-6">
                  Inspect materials, structure strength, and finishing quality.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Blog;