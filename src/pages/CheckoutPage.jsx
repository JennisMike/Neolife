import { useParams } from "react-router-dom";
import { useState } from "react";

const dummyProducts = {
  1: {
    name: "Tre-en-en",
    price: 15000,
    description: "Essential fatty acids for optimal cellular nutrition.",
  },
  2: {
    name: "Omega-3 Salmon Oil",
    price: 18500,
    description: "Supports heart and brain health with pure salmon oil.",
  },
  3: {
    name: "Vitamin C Sustained Release",
    price: 10000,
    description: "Boost immunity and fight free radicals naturally.",
  },
};

function CheckoutPage() {
  const { id } = useParams();
  const product = dummyProducts[id];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Processing payment of ${product.price} FCFA for ${product.name}\nName: ${name}\nPhone: ${phone}`
    );

    // After alert, redirect to success
    navigate("/success");
  };

  if (!product) {
    return <div className="container mt-5">Product not found.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Checkout</h2>
      <div className="card p-4 mt-3">
        <h4>{product.name}</h4>
        <p>{product.description}</p>
        <p className="fw-bold">Price: {product.price.toLocaleString()} FCFA</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">MTN MoMo Phone Number</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Pay with MoMo
          </button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutPage;
