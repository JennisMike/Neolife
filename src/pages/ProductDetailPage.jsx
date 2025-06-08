import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import "../styles/ProductDetailPage.css";
import { supabase } from "../supabaseClient";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from("products")
        .select(
          `
            id,
            name,
            main_description,
            price,
            item_no,
            category,
            detail_description,
            main_image,
            image_2,
            image_3
          `
        )
        .eq("id", id)
        .single();

      if (error) {
        setError(error.message);
      } else {
        setProduct(data);
      }
      setLoading(false);
    }

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container my-5">
        <h3>Loading product details...</h3>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container my-5">
        <h3>Error loading product: {error || "Product not found"}</h3>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <button className="btn btn-secondary mb-4" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>

      <div className="row mb-5">
        <div className="col-md-5">
          {/* Only main image here */}
          <img
            src={product.main_image}
            alt={product.name}
            className="img-fluid rounded product-detail-image"
          />
        </div>

        <div className="col-md-7 d-flex flex-column">
          <h2>{product.name}</h2>
          <p className="text-muted">Item No: {product.item_no}</p>
          <h4 className="text-primary">FCFA {product.price}</h4>
          <p>
            <strong>Category:</strong> {product.category}
          </p>

          <div className="product-short-description mb-4">
            {product.main_description || "No description available."}
          </div>

          <button className="btn btn-buy btn-lg mt-auto align-self-start">
            Buy Now
          </button>
        </div>
      </div>

      <div className="product-extra-section border-top pt-4">
        <h4>Description</h4>
        <p>{product.detail_description || product.main_description || "No additional description available."}</p>

        {/* Additional images below the description */}
        {(product.image_2 || product.image_3) && (
          <>
            <h5 className="mt-4">More Images</h5>
            <div className="d-flex flex-wrap gap-3">
              {product.image_2 && (
                <img
                  src={product.image_2}
                  alt={`${product.name} additional 1`}
                  className="img-thumbnail product-extra-image"
                  style={{ maxWidth: "150px", cursor: "pointer" }}
                  onClick={() =>
                    window.open(product.image_2, "_blank", "noopener,noreferrer")
                  }
                />
              )}
              {product.image_3 && (
                <img
                  src={product.image_3}
                  alt={`${product.name} additional 2`}
                  className="img-thumbnail product-extra-image"
                  style={{ maxWidth: "150px", cursor: "pointer" }}
                  onClick={() =>
                    window.open(product.image_3, "_blank", "noopener,noreferrer")
                  }
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
