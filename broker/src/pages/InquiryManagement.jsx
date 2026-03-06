import "../styles/inquiry.css";

export default function InquiryManagement() {
  return (
    <div className="container inquiry">

      {/* Page Heading */}
      <div className="text-center mb-4">
        <h2>Property Inquiries</h2>
        <p className="page-info">
          View user questions about your listed properties and send replies.
        </p>
      </div>

      <div className="row">

        {/* Inquiry 1 */}
        <div className="col-md-6">
          <div className="message-card">
            <h5>User Inquiry</h5>
            <p><strong>User:</strong> Anju</p>
            <p><strong>Property:</strong> Luxury Apartment</p>
            <p><strong>Date:</strong> 14 March 2026</p>

            <p className="question">
              Is this property negotiable?
            </p>

            <textarea
              className="form-control mb-2"
              placeholder="Reply to the user..."
            />

            <button className="btn btn-sm reply-btn">
              Send Reply
            </button>
          </div>
        </div>

        {/* Inquiry 2 */}
        <div className="col-md-6">
          <div className="message-card">
            <h5>User Inquiry</h5>
            <p><strong>User:</strong> Rahul</p>
            <p><strong>Property:</strong> 3BHK Villa</p>
            <p><strong>Date:</strong> 12 March 2026</p>

            <p className="question">
              Is parking available with this property?
            </p>

            <textarea
              className="form-control mb-2"
              placeholder="Reply to the user..."
            />

            <button className="btn btn-sm reply-btn">
              Send Reply
            </button>
          </div>
        </div>

        {/* Inquiry 3 */}
        <div className="col-md-6">
          <div className="message-card">
            <h5>User Inquiry</h5>
            <p><strong>User:</strong> Meera</p>
            <p><strong>Property:</strong> Modern Studio Flat</p>
            <p><strong>Date:</strong> 10 March 2026</p>

            <p className="question">
              Can I schedule a visit this weekend?
            </p>

            <textarea
              className="form-control mb-2"
              placeholder="Reply to the user..."
            />

            <button className="btn btn-sm reply-btn">
              Send Reply
            </button>
          </div>
        </div>

        {/* Inquiry 4 */}
        <div className="col-md-6">
          <div className="message-card">
            <h5>User Inquiry</h5>
            <p><strong>User:</strong> Karan</p>
            <p><strong>Property:</strong> Family House</p>
            <p><strong>Date:</strong> 9 March 2026</p>

            <p className="question">
              What is the exact location of the property?
            </p>

            <textarea
              className="form-control mb-2"
              placeholder="Reply to the user..."
            />

            <button className="btn btn-sm reply-btn">
              Send Reply
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}