import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/Profile.css";

const Profile = () => {

const [user,setUser] = useState(null);
const navigate = useNavigate();

useEffect(()=>{

axios.get("http://localhost:5000/api/auth/me",{withCredentials:true})
.then(res=>{
setUser(res.data);
})
.catch(err=>{
console.log(err);
});

},[]);

if(!user){
return <h2 className="loading">Loading...</h2>
}

return(

<div className="profile-page">

<div className="profile-card">

<div className="profile-header">

<img
src={`http://localhost:5000/uploads/brokers/${user.brokerImage || user.profileImage || "default-broker.png"}`}
alt="profile"
className="profile-img"
/>

<h2>{user.name || user.fullName}</h2>

<p className="profile-role">{user.role}</p>

</div>


{/* Basic Info */}

<div className="profile-section">

<h3>Basic Information</h3>

<p><strong>Email :</strong> {user.email || "Not Added"}</p>

<p><strong>Phone :</strong> {user.phone || "Not Added"}</p>

<p><strong>Agency :</strong> {user.agency || "Not Added"}</p>

<p><strong>RERA :</strong> {user.rera || "Not Added"}</p>

<p><strong>Address :</strong> {user.address || "Not Added"}</p>

</div>


{/* Professional Summary */}

<div className="profile-section">

<h3>Professional Summary</h3>

<p>{user.professionalSummary || "Not Added Yet"}</p>

</div>


{/* Quote */}

<div className="profile-section">

<h3>Quote</h3>

<p className="quote">{user.quotes || "Not Added Yet"}</p>

</div>


{/* Experience */}

<div className="profile-section">

<h3>Experience</h3>

<p>{user.experienceYears || "0"} Years</p>

</div>


{/* Office Location */}

<div className="profile-section">

<h3>Office Location</h3>

<p>{user.officeLocation || "Not Added Yet"}</p>

</div>


{/* Languages */}

<div className="profile-section">

<h3>Languages</h3>

<p>{user.languages?.length ? user.languages.join(", ") : "Not Added Yet"}</p>

</div>


{/* Business Hours */}

<div className="profile-section">

<h3>Business Hours</h3>

<p>Mon - Fri : {user.businessHours?.mondayFriday || "Not Set"}</p>

<p>Saturday : {user.businessHours?.saturday || "Not Set"}</p>

<p>Sunday : {user.businessHours?.sunday || "Not Set"}</p>

</div>


<div className="profile-buttons">

<button 
className="btn-edit"
onClick={()=>navigate("/edit-profile")}
>
Edit Profile
</button>

<button
className="btn-password"
onClick={()=>navigate("/change-password")}
>
Change Password
</button>

</div>

</div>

</div>

)

}

export default Profile