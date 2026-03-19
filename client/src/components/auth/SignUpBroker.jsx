import React, { useState } from "react";
import "../../assets/css/BrokerSignup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUpBroker = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    agency: "",
    rera: "",
    password: "",
    reraConfirm: false
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full Name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!formData.rera) {
      newErrors.rera = "RERA number is required";
    }

    if (!formData.reraConfirm) {
      newErrors.reraConfirm = "You must confirm RERA registration";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/register-broker",
        formData,
        { withCredentials: true }
      );

      alert(res.data.message);
      navigate("/signin");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-container">
      <div className="left-side">
        <h1>Broker Registration</h1>
        <p>Join our platform as a verified real estate broker</p>
      </div>

      <div className="divider"></div>

      <div className="right-side">
        <div className="signup-card">
          <h3>Create Broker Account</h3>

          <form onSubmit={handleSubmit}>

            <div className="input-group">
              <input type="text" name="name" placeholder="Full Name"
                value={formData.name} onChange={handleChange}/>
              <span className="error">{errors.name}</span>
            </div>

            <div className="input-group">
              <input type="email" name="email" placeholder="Email"
                value={formData.email} onChange={handleChange}/>
              <span className="error">{errors.email}</span>
            </div>

            <div className="input-group">
              <input type="text" name="phone" placeholder="Phone Number"
                value={formData.phone} onChange={handleChange}/>
              <span className="error">{errors.phone}</span>
            </div>

            <div className="input-group">
              <input type="text" name="agency" placeholder="Agency Name"
                value={formData.agency} onChange={handleChange}/>
            </div>

            <div className="input-group">
              <input type="text" name="rera" placeholder="RERA Number"
                value={formData.rera} onChange={handleChange}/>
              <span className="error">{errors.rera}</span>
            </div>

            <div className="input-group">
              <input type="password" name="password" placeholder="Password"
                value={formData.password} onChange={handleChange}/>
              <span className="error">{errors.password}</span>
            </div>

            <div className="checkbox-group">
              <input type="checkbox" name="reraConfirm"
                checked={formData.reraConfirm}
                onChange={handleChange}/>
              <label>I confirm that my RERA registration is valid</label>
            </div>

            <span className="error">{errors.reraConfirm}</span>

            <button className="btn-signup">Register Broker</button>
          </form>

          <div className="login-text">
            Already registered ? <Link to="/signin"> Login</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SignUpBroker;