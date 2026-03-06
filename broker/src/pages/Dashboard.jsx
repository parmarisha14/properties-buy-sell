import banner from "../assets/images/banner.webp";
import property1 from "../assets/images/property1.webp";
import property2 from "../assets/images/property2.jpg";
import property3 from "../assets/images/property3.jpg";
import property4 from "../assets/images/property4.jpg";

import "../styles/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard">

      {/* Banner Section */}
      <div className="banner">
        <img src={banner} alt="banner" className="banner-img"/>
        <div className="banner-text">
          <h1>Broker Dashboard</h1>
          <p>Manage your properties, bookings and inquiries</p>
        </div>
      </div>

      <div className="container">

        {/* Stats Cards */}
        <div className="row stats-section">

          <div className="col-md-3">
            <div className="card dash-card">
              <h5>Total Properties</h5>
              <h3>15</h3>
              <p>Properties listed by you</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dash-card">
              <h5>Total Bookings</h5>
              <h3>7</h3>
              <p>Property visit bookings</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dash-card">
              <h5>Pending Approvals</h5>
              <h3>3</h3>
              <p>Waiting for admin approval</p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card dash-card">
              <h5>Total Inquiries</h5>
              <h3>9</h3>
              <p>User messages received</p>
            </div>
          </div>

        </div>


        {/* Recent Properties */}
        <div className="recent-section">
          <h3 className="section-title">Recent Properties</h3>

          <div className="row">

            <div className="col-md-3">
              <div className="property-card">
                <img src={property1} alt="property"/>
                <div className="property-info">
                  <h5>Luxury Villa</h5>
                  <p>Ahmedabad</p>
                  <span className="price">₹85,00,000</span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="property-card">
                <img src={property2} alt="property"/>
                <div className="property-info">
                  <h5>Modern Apartment</h5>
                  <p>Surat</p>
                  <span className="price">₹45,00,000</span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="property-card">
                <img src={property3} alt="property"/>
                <div className="property-info">
                  <h5>Luxury Bungalow</h5>
                  <p>Vadodara</p>
                  <span className="price">₹1,20,00,000</span>
                </div>
              </div>
            </div>

            <div className="col-md-3">
              <div className="property-card">
                <img src={property4} alt="property"/>
                <div className="property-info">
                  <h5>City Flat</h5>
                  <p>Rajkot</p>
                  <span className="price">₹32,00,000</span>
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* Recent Bookings */}
        <div className="recent-section">
          <h3 className="section-title">Recent Booking Requests</h3>

          <table className="table booking-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Property</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Rahul Shah</td>
                <td>Luxury Villa</td>
                <td>12 March 2026</td>
                <td><span className="status pending">Pending</span></td>
              </tr>

              <tr>
                <td>Priya Patel</td>
                <td>Modern Apartment</td>
                <td>15 March 2026</td>
                <td><span className="status approved">Approved</span></td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>
    </div>
  );
}