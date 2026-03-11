import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/css/EditProfile.css";

axios.defaults.withCredentials = true;

const EditProfile = () => {

const navigate = useNavigate();

const [form,setForm] = useState({
name:"",
phone:"",
agency:"",
rera:"",
address:"",
professionalSummary:"",
quotes:"",
experienceYears:"",
officeLocation:"",
languages:"",
businessHours:{
mondayFriday:"",
saturday:"",
sunday:""
}
});

const [image,setImage] = useState(null);
const [preview,setPreview] = useState(null);


// ================= GET PROFILE =================

useEffect(()=>{

axios.get("http://localhost:5000/api/auth/profile")

.then(res=>{

const data = res.data;

setForm({
name:data.name || "",
phone:data.phone || "",
agency:data.agency || "",
rera:data.rera || "",
address:data.address || "",
professionalSummary:data.professionalSummary || "",
quotes:data.quotes || "",
experienceYears:data.experienceYears || "",
officeLocation:data.officeLocation || "",
languages:data.languages ? data.languages.join(",") : "",
businessHours:{
mondayFriday:data.businessHours?.mondayFriday || "",
saturday:data.businessHours?.saturday || "",
sunday:data.businessHours?.sunday || ""
}
});

// image preview safe
if(data.brokerImage){
setPreview(`http://localhost:5000/uploads/brokers/${data.brokerImage}`);
}

})

.catch(err=>{
console.log("Profile Fetch Error",err);
});

},[]);


// ================= INPUT CHANGE =================

const handleChange=(e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};


// ================= BUSINESS HOURS =================

const handleBusiness=(e)=>{

setForm({
...form,
businessHours:{
...form.businessHours,
[e.target.name]:e.target.value
}
});

};


// ================= IMAGE =================

const handleImage=(e)=>{

const file = e.target.files[0];

if(file){
setImage(file);
setPreview(URL.createObjectURL(file));
}

};


// ================= SUBMIT =================

const handleSubmit=async(e)=>{

e.preventDefault();

const formData = new FormData();

for(let key in form){

if(key==="businessHours"){
formData.append("businessHours",JSON.stringify(form.businessHours));
}

else{
formData.append(key,form[key]);
}

}

if(image){
formData.append("image",image);
}

try{

await axios.put(
"http://localhost:5000/api/auth/profile",
formData
);

alert("Profile Updated Successfully");

navigate("/profile");

}

catch(error){

console.log(error);
alert("Profile update failed");

}

};


return(

<div className="edit-profile-page">

<h2>Edit Profile</h2>

<form onSubmit={handleSubmit} className="edit-form">

<div className="image-box">

<img
src={preview ?? "http://localhost:5000/uploads/default-user.png"}
className="profile-preview"
alt="Profile"
/>

<input type="file" onChange={handleImage}/>

</div>


<div className="form-grid">

<input
type="text"
name="name"
value={form.name}
onChange={handleChange}
placeholder="Full Name"
/>

<input
type="text"
name="phone"
value={form.phone}
onChange={handleChange}
placeholder="Phone"
/>

<input
type="text"
name="agency"
value={form.agency}
onChange={handleChange}
placeholder="Agency"
/>

<input
type="text"
name="rera"
value={form.rera}
onChange={handleChange}
placeholder="RERA Number"
/>

<input
type="text"
name="address"
value={form.address}
onChange={handleChange}
placeholder="Address"
/>

<input
type="number"
name="experienceYears"
value={form.experienceYears}
onChange={handleChange}
placeholder="Experience Years"
/>

<input
type="text"
name="officeLocation"
value={form.officeLocation}
onChange={handleChange}
placeholder="Office Location"
/>

<input
type="text"
name="languages"
value={form.languages}
onChange={handleChange}
placeholder="Languages (English,Hindi,Gujarati)"
/>

</div>


<textarea
name="professionalSummary"
value={form.professionalSummary}
onChange={handleChange}
placeholder="Professional Summary"
/>


<textarea
name="quotes"
value={form.quotes}
onChange={handleChange}
placeholder="Your Quote"
/>


<h3>Business Hours</h3>

<div className="form-grid">

<input
type="text"
name="mondayFriday"
value={form.businessHours.mondayFriday}
onChange={handleBusiness}
placeholder="Mon - Fri"
/>

<input
type="text"
name="saturday"
value={form.businessHours.saturday}
onChange={handleBusiness}
placeholder="Saturday"
/>

<input
type="text"
name="sunday"
value={form.businessHours.sunday}
onChange={handleBusiness}
placeholder="Sunday"
/>

</div>


<button className="save-btn">
Save Changes
</button>

</form>

</div>

);

};

export default EditProfile;