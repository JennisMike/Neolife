import { Link } from "react-router-dom";

function SuccessPage() {
  return (
    <div className="container mt-5 text-center">
      <h2>Thank You for Your Purchase!</h2>
      <p className="lead mt-3">
        Your order has been received and is being processed.
      </p>
      <Link to="/" className="btn btn-success mt-4">
        Back to Home
      </Link>
    </div>
  );
}

export default SuccessPage;
