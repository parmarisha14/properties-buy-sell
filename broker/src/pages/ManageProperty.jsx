import property1 from "../assets/images/villa.jpg";
import property2 from "../assets/images/apartment.jpg";
import property3 from "../assets/images/property3.jpg";
import property4 from "../assets/images/property2.jpg";

import "../styles/manage.css";

export default function ManageProperty(){
  return(

    <div className="manage-property">

      <div className="container">

        <h2 className="page-title">Manage Properties</h2>
        <p className="page-info">View, edit or delete your listed properties</p>

        <div className="row">

          {/* Property 1 */}
          <div className="col-md-3">
            <div className="property-card">
              <img src={property1} className="card-img-top"/>

              <div className="card-body">
                <h5>Luxury Villa</h5>
                <p className="price">₹85,00,000</p>
                <p className="location">Ahmedabad</p>
                <p className="status pending">Pending</p>

                <button className="btn edit-btn btn-sm me-2">Edit</button>
                <button className="btn delete-btn btn-sm">Delete</button>
              </div>
            </div>
          </div>

          {/* Property 2 */}
          <div className="col-md-3">
            <div className="property-card">
              <img src={property2} className="card-img-top"/>

              <div className="card-body">
                <h5>Modern Apartment</h5>
                <p className="price">₹45,00,000</p>
                <p className="location">Surat</p>
                <p className="status approved">Approved</p>

                <button className="btn edit-btn btn-sm me-2">Edit</button>
                <button className="btn delete-btn btn-sm">Delete</button>
              </div>
            </div>
          </div>

          {/* Property 3 */}
          <div className="col-md-3">
            <div className="property-card">
              <img src={property3} className="card-img-top"/>

              <div className="card-body">
                <h5>Luxury Bungalow</h5>
                <p className="price">₹1,20,00,000</p>
                <p className="location">Vadodara</p>
                <p className="status pending">Pending</p>

                <button className="btn edit-btn btn-sm me-2">Edit</button>
                <button className="btn delete-btn btn-sm">Delete</button>
              </div>
            </div>
          </div>

          {/* Property 4 */}
          <div className="col-md-3">
            <div className="property-card">
              <img src={property4} className="card-img-top"/>

              <div className="card-body">
                <h5>City Flat</h5>
                <p className="price">₹32,00,000</p>
                <p className="location">Rajkot</p>
                <p className="status approved">Approved</p>

                <button className="btn edit-btn btn-sm me-2">Edit</button>
                <button className="btn delete-btn btn-sm">Delete</button>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>

  )
}