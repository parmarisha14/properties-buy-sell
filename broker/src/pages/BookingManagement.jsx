import "../styles/booking.css"

export default function BookingManagement() {
  return (

    <div className="booking">

      <div className="container-fluid booking-wrapper">

        <h2 className="page-title text-center">Booking Requests</h2>
        <p className="page-info text-center">
          Manage property visit bookings from users
        </p>

        {/* Booking Summary */}

        <div className="row summary-box justify-content-center">

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="summary-card">
              <h5>Total Bookings</h5>
              <h3>12</h3>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="summary-card">
              <h5>Pending</h5>
              <h3>5</h3>
            </div>
          </div>

          <div className="col-lg-3 col-md-4 col-sm-6">
            <div className="summary-card">
              <h5>Approved</h5>
              <h3>7</h3>
            </div>
          </div>

        </div>

        {/* Booking Table */}

        <div className="table-box">

          <table className="table booking-table">

            <thead>
              <tr>
                <th>User</th>
                <th>Property</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              <tr>
                <td>Rahul</td>
                <td>Luxury Villa</td>
                <td>15 March</td>
                <td className="status-pending">Pending</td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Approve</button>
                  <button className="btn btn-danger btn-sm">Reject</button>
                </td>
              </tr>

              <tr>
                <td>Priya</td>
                <td>Modern Apartment</td>
                <td>18 March</td>
                <td className="status-approved">Approved</td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Approve</button>
                  <button className="btn btn-danger btn-sm">Reject</button>
                </td>
              </tr>

              <tr>
                <td>Amit</td>
                <td>City Flat</td>
                <td>20 March</td>
                <td className="status-pending">Pending</td>
                <td>
                  <button className="btn btn-success btn-sm me-2">Approve</button>
                  <button className="btn btn-danger btn-sm">Reject</button>
                </td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}