// src/components/ProductFormModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { supabase } from "../supabaseClient";

function ProductFormModal({ show, onClose, product }) {
  const [form, setForm] = useState({
    name: "",
    item_no: "",
    category: "",
    price: "",
    main_description: "",
    detail_description: "",
  });

  const [imageFiles, setImageFiles] = useState({
    main_image: null,
    image_2: null,
    image_3: null,
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name || "",
        item_no: product.item_no || "",
        category: product.category || "",
        price: product.price || "",
        main_description: product.main_description || "",
        detail_description: product.detail_description || "",
      });

      setImageFiles({
        main_image: product.main_image || null,
        image_2: product.image_2 || null,
        image_3: product.image_3 || null,
      });
    } else {
      setForm({
        name: "",
        item_no: "",
        category: "",
        price: "",
        main_description: "",
        detail_description: "",
      });
      setImageFiles({ main_image: null, image_2: null, image_3: null });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e, key) => {
    setImageFiles({ ...imageFiles, [key]: e.target.files[0] });
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `products/${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const { error } = await supabase.storage.from("product-images").upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      return null;
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(fileName);
    return data?.publicUrl || null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const payload = {
        ...form,
        item_no: parseInt(form.item_no, 10),
        price: parseInt(form.price, 10),
      };

      for (const key of ["main_image", "image_2", "image_3"]) {
        const file = imageFiles[key];
        if (typeof file === "string") {
          payload[key] = file;
        } else if (file instanceof File) {
          const uploadedUrl = await uploadImage(file);
          payload[key] = uploadedUrl;
        }
      }

      if (product) {
        const { error } = await supabase.from("products").update(payload).eq("id", product.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("products").insert(payload);
        if (error) throw error;
      }

      onClose();
    } catch (err) {
      alert("Error saving product");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  if (!show) return null;

  return (
    <Modal show={show} onHide={onClose} backdrop="static" size="lg">
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{product ? "Edit Product" : "Add New Product"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control name="name" value={form.name} onChange={handleChange} required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Item Number</Form.Label>
                <Form.Control name="item_no" value={form.item_no} onChange={handleChange} type="number" required />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Select name="category" value={form.category} onChange={handleChange} required>
                  <option value="">Select</option>
                  <option value="Nutritional">Nutritional</option>
                  <option value="Personal Care">Personal Care</option>
                  <option value="Home Care">Home Care</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price (XAF)</Form.Label>
                <Form.Control name="price" value={form.price} onChange={handleChange} type="number" required />
              </Form.Group>
            </div>

            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Short Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="main_description"
                  value={form.main_description}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Detailed Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="detail_description"
                  value={form.detail_description}
                  onChange={handleChange}
                />
              </Form.Group>

              {["main_image", "image_2", "image_3"].map((key, idx) => (
                <Form.Group className="mb-3" key={key}>
                  <Form.Label>{["Main", "Image 2", "Image 3"][idx]}</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, key)}
                  />
                  {typeof imageFiles[key] === "string" && (
                    <img
                      src={imageFiles[key]}
                      alt={`Preview ${key}`}
                      className="mt-2"
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                  )}
                </Form.Group>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose} disabled={uploading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={uploading}>
            {uploading ? "Saving..." : product ? "Update" : "Add"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default ProductFormModal;
