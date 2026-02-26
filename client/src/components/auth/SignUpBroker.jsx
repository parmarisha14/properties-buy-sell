import React from 'react'
import "../../assets/css/BrokerSignup.css";
import { Link } from "react-router-dom";
const SignUpBroker = () => {
  return (
     <div className="register-container">

      {/* Left Side */}
      <div className="left-side">
        <h1>Broker Registration</h1>
        <p>Join our platform as a verified real estate broker</p>
      </div>

      <div className="divider"></div>

      {/* Right Side */}
      <div className="right-side">
        <div className="signup-card">
          <h3>Create Broker Account</h3>
          <p className="text-small">
            Please provide your professional details
          </p>

          <form>
            <div className="input-group">
              <i className="bi bi-person input-icon"></i>
              <input type="text" placeholder="Full Name" required />
            </div>

            <div className="input-group">
              <i className="bi bi-envelope input-icon"></i>
              <input type="email" placeholder="Email Address" required />
            </div>

            <div className="input-group">
              <i className="bi bi-telephone input-icon"></i>
              <input type="tel" placeholder="Phone Number" required />
            </div>

            <div className="input-group">
              <i className="bi bi-building input-icon"></i>
              <input type="text" placeholder="Agency Name" required />
            </div>

            <div className="input-group">
              <i className="bi bi-shield-check input-icon"></i>
              <input
                type="text"
                placeholder="RERA Registration Number"
                required
              />
            </div>

            <div className="input-group">
              <i className="bi bi-lock input-icon"></i>
              <input type="password" placeholder="Password" required />
            </div>

            <div className="checkbox-group">
              <input type="checkbox" id="reraConfirm" required />
              <label htmlFor="reraConfirm">
                I confirm that my RERA registration is valid
              </label>
            </div>

            <button type="submit" className="btn-signup">
              Register as Broker
            </button>
          </form>

          <div className="login-text">
            Already registered? <Link to="/signin">Login Here</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpBroker