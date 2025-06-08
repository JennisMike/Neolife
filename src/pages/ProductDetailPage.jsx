import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import mockProducts from "../data/mockProducts";
import "../styles/ProductDetailPage.css"; // Custom styles only for specific tweaks

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = mockProducts.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="container my-5">
        <h3>Product not found</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>

      {/* Top section with main image and basic info */}
      <div className="row mb-5">
        <div className="col-md-5">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid rounded product-detail-image"
          />
        </div>

        <div className="col-md-7 d-flex flex-column">
          <h2>{product.name}</h2>
          <p className="text-muted">Item No: {product.itemNo}</p>
          <h4 className="text-primary">${product.price.toFixed(2)}</h4>
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <div className="product-short-description mb-4">
            {product.description || "No description available yet."}
          </div>

          <button className="btn btn-buy btn-lg mt-auto align-self-start">
            Buy Now
          </button>
        </div>
      </div>

      {/* Bottom full-width section with extended description and extra images */}
      <div className="product-extra-section border-top pt-4">
        <h4>Description</h4>
        <p>
          {/* For demo: using the same description but can replace with longer detailed text */}
          {product.detailedDescription ||
            product.description ||
            "No additional description available."}
        </p>

        {product.extraImages && product.extraImages.length > 0 && (
          <>
            <h5 className="mt-4">More Images</h5>
            <div className="d-flex flex-wrap gap-3">
              {product.extraImages.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`${product.name} extra image ${idx + 1}`}
                  className="img-thumbnail product-extra-image"
                  style={{ maxWidth: "150px", cursor: "pointer" }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
