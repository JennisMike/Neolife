import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import products from "../data/products"; // assume product data
import ProductCard from "../components/ProductCard";

function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const found = products.find((p) => p.id.toString() === id);
    if (!found) return navigate("/products");
    setProduct(found);
  }, [id, navigate]);

  if (!product) return <p>Loading...</p>;

  const popularProducts = products.slice(0, 4);

  return (
    <div className="container py-5">
      <div className="row g-4 align-items-start">
        <div className="col-md-6">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid"
            style={{ maxHeight: "400px", objectFit: "contain" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold mb-3">{product.name}</h2>
          <p className="text-muted">ITEM NO: {product.itemNo}</p>
          <p className="fs-5 mb-3">{product.description}</p>
          <p className="fw-bold fs-4 text-success">${product.price.toFixed(2)}</p>
          <button
            className="btn btn-success btn-lg"
            onClick={() => navigate(`/checkout/${product.id}`)}
          >
            Buy Now
          </button>
        </div>
      </div>

      <hr className="my-5" />

      <h4 className="fw-bold mb-4">Popular Products</h4>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {popularProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;
