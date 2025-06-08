// src/pages/ProductListPage.jsx
import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/ProductListPage.css";
import mockProducts from "../data/mockProducts";
import "../styles/ProductCard.css";

// const mockProducts = [
//   {
//     id: 1,
//     name: "Pro Vitality, Food supplement",
//     itemNo: 942,
//     price: 55.1,
//     category: "Nutritionals",
//     image: "/images/pro-vitality.png",
//   },
//   {
//     id: 2,
//     name: "Carotenoid Complex",
//     itemNo: 566,
//     price: 62.4,
//     category: "Nutritionals",
//     image: "/images/carotenoid.png",
//   },
//   {
//     id: 3,
//     name: "Kal-Mag Plus D, Mineral food",
//     itemNo: 724,
//     price: 20.5,
//     category: "Nutritionals",
//     image: "/images/kal-mag.png",
//   },
//   {
//     id: 4,
//     name: "Omega-3 Plus",
//     itemNo: 929,
//     price: 35.3,
//     category: "Nutritionals",
//     image: "/images/omega3.png",
//   },
//   {
//     id: 5,
//     name: "Herbal Toothpaste",
//     itemNo: 101,
//     price: 8.5,
//     category: "Personal Care",
//     image: "/images/toothpaste.png",
//   },
//   {
//     id: 6,
//     name: "LDC Multi-purpose Cleaner",
//     itemNo: 301,
//     price: 12.75,
//     category: "Home Care",
//     image: "/images/ldc.png",
//   },
// ];

const categories = ["All", "Nutritionals", "Personal Care", "Home Care"];

const ProductListPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? mockProducts
      : mockProducts.filter((product) => product.category === selectedCategory);

  const popularProducts = mockProducts.slice(0, 4);

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
            {filteredProducts.map((product) => (
              <div key={product.id} className="col-sm-6 col-md-4 col-lg-3 mb-4">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popular Products Full Width */}
      <hr className="my-5" />
      <div className="popular-products">
        <h4 className="mb-4">Popular Products</h4>
        <div className="row">
          {popularProducts.map((product) => (
            <div key={product.id} className="col-sm-6 col-md-3 col-lg-3 mb-4">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
