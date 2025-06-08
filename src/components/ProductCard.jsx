import { Link } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="text-decoration-none text-dark"
    >
      <div className="card h-100 shadow-sm product-card">
        <img
          src={product.image}
          className="card-img-top"
          alt={product.name}
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div className="card-body d-flex flex-column">
          <h6 className="card-title text-truncate" title={product.name}>
            {product.name}
          </h6>
          <p className="card-text text-muted small mb-1">{product.category}</p>
          <p className="fw-semibold mb-2">FCFA {product.price}</p>
          <div className="btn btn-outline-success btn-sm mt-auto w-100">
            View Details
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
