// src/pages/ProductListPage.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/ProductListPage.css";
import { supabase } from "../supabaseClient";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products from Supabase on mount
  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("id, name, category, price, main_image")
        .order("id", { ascending: true });

      if (error) {
        setError(error.message);
        setLoading(false);
        return;
      }
      setProducts(data);
      setLoading(false);
    }

    fetchProducts();
  }, []);

  // Compute categories dynamically from fetched products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // Popular products: first 4 products (adjust logic as needed)
  const popularProducts = products.slice(0, 4);

  if (loading) return <div className="container my-5">Loading products...</div>;

  if (error)
    return (
      <div className="container my-5 text-danger">
        Error loading products: {error}
      </div>
    );

  return (
    <div className="container my-5">
      {/* Product List Section */}
      <div className="row">
        <div className="col-md-3">
          <h5 className="mb-3">Categories</h5>
          <ul className="list-group">
            {categories.map((cat) => (
              <li
                key={cat}
                className={`list-group-item ${
                  selectedCategory === cat ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
                style={{ cursor: "pointer" }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-md-9">
          <div className="row">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="col-sm-6 col-md-4 col-lg-3 mb-4"
                >
                  <ProductCard
                    product={{
                      id: product.id,
                      name: product.name,
                      category: product.category,
                      price: product.price,
                      image: product.main_image,
                    }}
                  />
                </div>
              ))
            ) : (
              <p>No products found in this category.</p>
            )}
          </div>
        </div>
      </div>

      {/* Popular Products Full Width */}
      <hr className="my-5" />
      <div className="popular-products">
        <h4 className="mb-4">Popular Products</h4>
        <div className="row">
          {popularProducts.length > 0 ? (
            popularProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-3 col-lg-3 mb-4">
                <ProductCard
                  product={{
                    id: product.id,
                    name: product.name,
                    category: product.category,
                    price: product.price,
                    image: product.main_image,
                  }}
                />
              </div>
            ))
          ) : (
            <p>No popular products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
