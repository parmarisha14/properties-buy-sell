import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../assets/css/Profile.css";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

 
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile");
        setUser(res.data);
      } catch (err) {
        navigate("/signin");
      }
    };
    fetchProfile();
  }, [navigate]);

  if (!user) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container my-5">
      <div className="row justify-content-center">

        
        <div className="col-md-4 text-center">
          <div className="profile-card">
            <img
              src={
                user.profileImage
                  ? `http://localhost:5000/uploads/users/${user.profileImage}`
                  : "http://localhost:5000/uploads/users/default.png"
              }
              alt="Profile"
              className="profile-avatar"
            />
            <h4 className="profile-name">{user.fullName || "No Name"}</h4>
            <p className="profile-email">{user.email}</p>

            <p className="text-muted">
              Joined:{" "}
              <b>
                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-GB")
                  : "N/A"}
              </b>
            </p>

            <button
              className="btn-edit w-100 mb-2"
              onClick={() => navigate("/edit-profile")}
            >
              Edit Profile
            </button>

            <button
              className="btn-password w-100"
              onClick={() => navigate("/change-password")}
            >
              Change Password
            </button>
          </div>
        </div>

        
        <div className="col-md-8">
          <div className="profile-card card-details">
            <h5>Personal Details</h5>

            <p>
              <span className="label-bold">Full Name:</span> {user.fullName || "Not Provided"}
            </p>

            <p>
              <span className="label-bold">Mobile:</span> {user.phone || "Not Provided"}
            </p>

            <p>
              <span className="label-bold">Address:</span> {user.address || "Not Provided"}
            </p>

            <p>
              <span className="label-bold">Gender:</span> {user.gender || "Not Provided"}
            </p>

            <p>
              <span className="label-bold">Date of Birth:</span>{" "}
              {user.dob ? new Date(user.dob).toLocaleDateString("en-GB") : "Not Provided"}
            </p>

            <p>
              <span className="label-bold">Email:</span> {user.email}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;