import { useState } from "react";
import axios from "axios";
import "../assets/Css/AddProperty.css";

const AddProperty = () => {

  const [property, setProperty] = useState({
    name: "",
    price: "",
    location: "",
    city: "",
    state: "",
    bedroom: "",
    bathroom: "",
    area: "",
    year: "",
    type: "",
    description: "",
    features: [],
    image: null
  });

  const [featureInput, setFeatureInput] = useState("");

  const handleChange = (e) => {
    setProperty({
      ...property,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setProperty({
      ...property,
      image: e.target.files[0]
    });
  };

  const addFeature = () => {
    if (featureInput.trim() !== "") {
      setProperty({
        ...property,
        features: [...property.features, featureInput]
      });
      setFeatureInput("");
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("name", property.name);
      formData.append("price", property.price);
      formData.append("location", property.location);
      formData.append("city", property.city);
      formData.append("state", property.state);
      formData.append("bedroom", property.bedroom);
      formData.append("bathroom", property.bathroom);
      formData.append("area", property.area);
      formData.append("year", property.year);
      formData.append("type", property.type);
      formData.append("description", property.description);

      property.features.forEach((f) => {
        formData.append("features", f);
      });

      if (property.image) {
        formData.append("image", property.image);
      }

      await axios.post(
        "http://localhost:5000/api/property/add",
        formData,
        { withCredentials: true } // important for session
      );

      alert("Property Added Successfully");

      setProperty({
        name: "",
        price: "",
        location: "",
        city: "",
        state: "",
        bedroom: "",
        bathroom: "",
        area: "",
        year: "",
        type: "",
        description: "",
        features: [],
        image: null
      });

      setFeatureInput("");

    } catch (err) {

      console.log(err);

      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Error");
      }

    }

  };

  return (
    <div className="property-form-container">

      <h2>Add New Property</h2>

      <form onSubmit={handleSubmit} className="property-form">

        <div className="form-group">
          <label>Property Image *</label>
          <input type="file" accept="image/*" onChange={handleImageChange}/>
        </div>

        <div className="form-group">
          <label>Year Built *</label>
          <input type="number" name="year" value={property.year} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Property Name *</label>
          <input type="text" name="name" value={property.name} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Property Type *</label>
          <select name="type" value={property.type} onChange={handleChange}>
            <option value="">Select Type</option>
            <option>Villa</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Plot</option>
            <option>Penthouse</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price *</label>
          <input type="number" name="price" value={property.price} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Location *</label>
          <input type="text" name="location" value={property.location} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>City *</label>
          <input type="text" name="city" value={property.city} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>State *</label>
          <input type="text" name="state" value={property.state} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Bedroom *</label>
          <input type="number" name="bedroom" value={property.bedroom} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Bathroom *</label>
          <input type="number" name="bathroom" value={property.bathroom} onChange={handleChange}/>
        </div>

        <div className="form-group">
          <label>Area (sqft)</label>
          <input type="number" name="area" value={property.area} onChange={handleChange}/>
        </div>

        <div className="form-group full">
          <label>Description</label>
          <textarea name="description" value={property.description} onChange={handleChange}/>
        </div>

        <div className="form-group full">

          <label>Property Features</label>

          <div className="feature-box">
            <input
              type="text"
              value={featureInput}
              onChange={(e)=>setFeatureInput(e.target.value)}
            />
            <button type="button" onClick={addFeature}>Add</button>
          </div>

          <ul className="feature-list">
            {property.features.map((f,i)=>(
              <li key={i}>{f}</li>
            ))}
          </ul>

        </div>

        <button className="submit-btn">Submit</button>

      </form>

    </div>
  );
};

export default AddProperty;