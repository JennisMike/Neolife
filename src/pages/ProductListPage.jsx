// src/pages/ProductListPage.jsx
import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/ProductListPage.css";
import { supabase } from "../supabaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const categories = ["All", ...new Set(products.map((p) => p.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const popularProducts = products.slice(0, 4);

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
            {loading
              ? // Skeleton placeholders: show 8 skeleton cards during loading
                [...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="col-sm-6 col-md-4 col-lg-3 mb-4"
                    style={{ minHeight: "350px" }}
                  >
                    <div className="card h-100 shadow-sm">
                      <Skeleton height={200} />
                      <div className="card-body d-flex flex-column">
                        <Skeleton height={20} width={`80%`} />
                        <Skeleton height={15} width={`60%`} style={{ marginTop: 6 }} />
                        <Skeleton height={20} width={`40%`} style={{ marginTop: 12 }} />
                        <Skeleton
                          height={35}
                          width="100%"
                          style={{ marginTop: "auto" }}
                        />
                      </div>
                    </div>
                  </div>
                ))
              : filteredProducts.length > 0
              ? filteredProducts.map((product) => (
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
              : (
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
          {loading
            ? // Skeleton placeholders for popular products (4 cards)
              [...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className="col-sm-6 col-md-3 col-lg-3 mb-4"
                  style={{ minHeight: "350px" }}
                >
                  <div className="card h-100 shadow-sm">
                    <Skeleton height={200} />
                    <div className="card-body d-flex flex-column">
                      <Skeleton height={20} width={`80%`} />
                      <Skeleton height={15} width={`60%`} style={{ marginTop: 6 }} />
                      <Skeleton height={20} width={`40%`} style={{ marginTop: 12 }} />
                      <Skeleton
                        height={35}
                        width="100%"
                        style={{ marginTop: "auto" }}
                      />
                    </div>
                  </div>
                </div>
              ))
            : popularProducts.length > 0
            ? popularProducts.map((product) => (
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
            : <p>No popular products yet.</p>}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
