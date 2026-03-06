import "../styles/addProperty.css";

export default function AddProperty(){
  return(

    <div className="add-property">

      <div className="container">

        <div className="form-box">

          <h2>Add Property</h2>

          <form>

            <div className="row">

              <div className="col-md-6">
                <label>Property Title</label>
                <input className="form-control" placeholder="Enter property title"/>
              </div>

              <div className="col-md-6">
                <label>Price</label>
                <input className="form-control" placeholder="Enter price"/>
              </div>

              <div className="col-md-6 mt-3">
                <label>Location</label>
                <input className="form-control" placeholder="Enter location"/>
              </div>

              <div className="col-md-6 mt-3">
                <label>Property Type</label>
                <select className="form-control">
                  <option>Select Property Type</option>
                  <option>Apartment</option>
                  <option>Villa</option>
                  <option>Bungalow</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div className="col-md-4 mt-3">
                <label>Bedrooms</label>
                <input className="form-control" placeholder="Bedrooms"/>
              </div>

              <div className="col-md-4 mt-3">
                <label>Bathrooms</label>
                <input className="form-control" placeholder="Bathrooms"/>
              </div>

              <div className="col-md-4 mt-3">
                <label>Area (sqft)</label>
                <input className="form-control" placeholder="Area"/>
              </div>

              <div className="col-md-12 mt-3">
                <label>Description</label>
                <textarea className="form-control" rows="3" placeholder="Property description"></textarea>
              </div>

              <div className="col-md-12 mt-3">
                <label>Upload Image</label>
                <input type="file" className="form-control"/>
              </div>

            </div>

            <div className="text-center mt-4">
              <button className="btn submit-btn">
                Add Property
              </button>
            </div>

          </form>

        </div>

      </div>

    </div>

  )
}