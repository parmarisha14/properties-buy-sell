import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/css/EditProfile.css";

axios.defaults.withCredentials = true;

const EditProfile = () => {

const navigate = useNavigate();

const [user,setUser] = useState({
fullName:"",
email:"",
phone:"",
dob:"",
address:"",
gender:"",
profileImage:""
});

const [image,setImage] = useState(null);


// ================= FETCH PROFILE =================

useEffect(()=>{

const fetchProfile = async()=>{

try{

const res = await axios.get("http://localhost:5000/api/auth/profile");

setUser({
fullName: res.data.fullName || res.data.name || "",
email: res.data.email || "",
phone: res.data.phone || "",
dob: res.data.dob ? res.data.dob.split("T")[0] : "",
address: res.data.address || "",
gender: res.data.gender || "",
profileImage: res.data.profileImage || ""
});

}
catch(err){

navigate("/signin");

}

};

fetchProfile();

},[navigate]);


// ================= INPUT =================

const handleChange=(e)=>{

setUser({
...user,
[e.target.name]:e.target.value
});

};

const handleImageChange=(e)=>{

setImage(e.target.files[0]);

};


// ================= SUBMIT =================

const handleSubmit = async(e)=>{

e.preventDefault();

try{

const formData = new FormData();

formData.append("fullName",user.fullName);
formData.append("email",user.email);
formData.append("phone",user.phone);
formData.append("dob",user.dob);
formData.append("address",user.address);
formData.append("gender",user.gender);

if(image){
formData.append("image",image); // FIXED
}

await axios.put(
"http://localhost:5000/api/auth/profile",
formData,
{
withCredentials:true
}
);

alert("Profile updated successfully");

navigate("/profile");

}
catch(err){

console.error(err);

alert("Failed to update profile");

}

};


// ================= UI =================

return(

<div className="edit-profile-wrapper">

<div className="edit-card">

<h3>Edit Profile</h3>

<div className="image-preview">

<img
src={
image
? URL.createObjectURL(image)
: user.profileImage
? `http://localhost:5000/uploads/users/${user.profileImage}`
: "http://localhost:5000/uploads/users/default.png"
}
alt="Profile"
/>

</div>

<form onSubmit={handleSubmit}>

<div className="form-row">

<div>

<label>Full Name</label>

<input
type="text"
name="fullName"
value={user.fullName}
onChange={handleChange}
required
/>

</div>

<div>

<label>Email</label>

<input
type="email"
name="email"
value={user.email}
onChange={handleChange}
required
/>

</div>

</div>


<div className="form-row">

<div>

<label>Mobile</label>

<input
type="text"
name="phone"
value={user.phone}
onChange={handleChange}
/>

</div>

<div>

<label>Date of Birth</label>

<input
type="date"
name="dob"
value={user.dob}
onChange={handleChange}
/>

</div>

</div>


<div>

<label>Address</label>

<textarea
name="address"
rows="3"
value={user.address}
onChange={handleChange}
/>

</div>


<div className="gender-wrapper">

<label>Gender</label>

<div className="gender-options">

<label className={`gender-card ${user.gender==="Male"?"active":""}`}>

<input
type="radio"
name="gender"
value="Male"
checked={user.gender==="Male"}
onChange={handleChange}
/>

Male

</label>


<label className={`gender-card ${user.gender==="Female"?"active":""}`}>

<input
type="radio"
name="gender"
value="Female"
checked={user.gender==="Female"}
onChange={handleChange}
/>

Female

</label>

</div>

</div>


<div>

<label>Profile Image</label>

<input
type="file"
onChange={handleImageChange}
/>

</div>


<button type="submit" className="update-btn">

Update Profile

</button>

</form>

</div>

</div>

);

};

export default EditProfile;