// src/admin/views/ProductsView.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import ProductFormModal from "../../components/ProductFormModal";

function ProductsView() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) console.error(error);
    else setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowModal(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    const { error } = await supabase.from("products").delete().eq("id", productId);
    if (error) alert("Error deleting product");
    else fetchProducts();
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditProduct(null);
    fetchProducts();
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5>All Products</h5>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Product
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Item No</th>
              <th>Category</th>
              <th>Price (XAF)</th>
              <th>Images</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.item_no || "-"}</td>
                <td>{p.category || "-"}</td>
                <td>{p.price}</td>
                <td>
                  {p.images && p.images.length > 0
                    ? p.images.map((url, i) => (
                        <img
                          key={i}
                          src={url}
                          alt={`${p.name} ${i + 1}`}
                          style={{ height: 40, marginRight: 5, objectFit: "cover" }}
                        />
                      ))
                    : "-"}
                </td>
                <td>
                  <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(p)}>
                    Edit
                  </button>
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(p.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ProductFormModal show={showModal} onClose={handleModalClose} product={editProduct} />
    </>
  );
}

export default ProductsView;
