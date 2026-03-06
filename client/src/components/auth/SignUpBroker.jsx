import React, { useState } from "react";
import "../../assets/css/BrokerSignup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpBroker = () => {

  const navigate = useNavigate();

  const [formData,setFormData] = useState({
    name:"",
    email:"",
    phone:"",
    agency:"",
    rera:"",
    password:"",
    reraConfirm:false
  });

  const handleChange = (e)=>{
    const {name,value,type,checked} = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async(e)=>{
    e.preventDefault();

    // validation
    if(!formData.name){
      alert("Full Name is required");
      return;
    }

    if(!formData.reraConfirm){
      alert("Please confirm your RERA registration");
      return;
    }

    try{

      const res = await axios.post(
        "http://localhost:5000/api/auth/register-broker",
        formData
      );

      alert(res.data.message);

      navigate("/signin");

    }catch(err){
      alert("Registration Failed");
    }

  };

  return (

    <div className="register-container">

      {/* LEFT */}
      <div className="left-side">
        <h1>Broker Registration</h1>
        <p>Join our platform as a verified real estate broker</p>
      </div>

      <div className="divider"></div>

      {/* RIGHT */}
      <div className="right-side">

        <div className="signup-card">

          <h3>Create Broker Account</h3>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="agency"
                placeholder="Agency Name"
                value={formData.agency}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="text"
                name="rera"
                placeholder="RERA Registration Number"
                value={formData.rera}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
            </div>

            <div className="checkbox-group">
              <input
                type="checkbox"
                name="reraConfirm"
                checked={formData.reraConfirm}
                onChange={handleChange}
              />
              <label>I confirm that my RERA registration is valid</label>
            </div>

            <button className="btn-signup">
              Register Broker
            </button>

          </form>

          <div className="login-text">
            Already registered ?
            <Link to="/signin"> Login</Link>
          </div>

        </div>

      </div>

    </div>

  );
};

export default SignUpBroker;