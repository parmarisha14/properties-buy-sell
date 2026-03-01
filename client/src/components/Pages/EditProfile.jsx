import React, { useState, useEffect } from "react";
import "../../assets/css/EditProfile.css";

const EditProfile = () => {

  const [user, setUser] = useState({
    fullName: "",
    email: "",
    mobile: "",
    birthdate: "",
    address: "",
    gender: "",
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile Updated Successfully ✅");
  };

  return (
    <div className="edit-profile-wrapper">
      <div className="profile-card">

        <div className="profile-header">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt="Profile"
          />
          <h3>{user.fullName}</h3>
          <p>{user.email}</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">

            <div className="col-md-6">
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                className="form-control"
                value={user.fullName}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={user.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>Mobile</label>
              <input
                type="text"
                name="mobile"
                className="form-control"
                value={user.mobile}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-6">
              <label>Date of Birth</label>
              <input
                type="date"
                name="birthdate"
                className="form-control"
                value={user.birthdate}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <label>Address</label>
              <textarea
                name="address"
                className="form-control"
                rows="3"
                value={user.address}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-md-6">
              <label>Gender</label><br />
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={user.gender === "Male"}
                onChange={handleChange}
              /> Male

              <input
                type="radio"
                name="gender"
                value="Female"
                className="ms-3"
                checked={user.gender === "Female"}
                onChange={handleChange}
              /> Female
            </div>

            <div className="col-12 mt-3">
              <button type="submit" className="btn-update w-100">
                Update Profile
              </button>
            </div>

          </div>
        </form>

      </div>
    </div>
  );
};

export default EditProfile;