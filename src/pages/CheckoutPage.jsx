// CheckoutPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CheckoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    momoNumber: "",
    contactNumber: "",
    city: "",
    quantity: 1,
  });
  const [error, setError] = useState("");
  const [campayToken, setCampayToken] = useState(null);

  useEffect(() => {
    supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error(error);
        } else {
          setProduct(data);
        }
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    // Load Campay widget script
    const script = document.createElement("script");
    script.src = "https://demo.campay.net/sdk/js?app-id=VKHtjDP14gjUUOJDk8qqUdbuc105P-KbHGPoJNOjyX-JIdWpUmjjZuuk_h9P9MCyRk74qRn9Xe0iPBuFNG_O0A";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, Number(value)) : value,
    }));
  };

  const validatePhone = (num) => /^[0-9]{9}$/.test(num);

  const initiatePayment = (externalReference, amount) => {
    window.campay.options({
      payButtonId: "payButton",
      description: `Order for ${product.name}`,
      amount: amount.toString(),
      currency: "XAF",
      externalReference,
      redirectUrl: window.location.origin + "/myneolife",
    });

    window.campay.onSuccess = (data) => {
      alert(`Success: ${data.status} - ${data.reference}`);
      navigate("/myneolife");
    };

    window.campay.onFail = (data) => {
      alert(`Payment Failed: ${data.status} - ${data.reference}`);
    };

    window.campay.onModalClose = (data) => {
      alert("You can dial *126# to manually validate the payment if not prompted.");
    };

    document.getElementById("payButton").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePhone(form.momoNumber) || !validatePhone(form.contactNumber)) {
      setError("Phone numbers must be exactly 9 digits.");
      return;
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      setError("You must be logged in to place an order.");
      return;
    }

    try {
      const externalRef = `ORDER-${Date.now()}`;
      const total = product.price * form.quantity;

      const { error: insertError } = await supabase.from("orders").insert([
        {
          user_id: userData.user.id,
          product_id: id,
          quantity: form.quantity,
          total_price: total,
          status: "pending",
          momo_phone: form.momoNumber,
          contact_number: form.contactNumber,
          name: form.name,
          city: form.city,
          ordered_at: new Date().toISOString(),
          external_reference: externalRef,
        },
      ]);

      if (insertError) {
        console.error("Order insert failed:", insertError);
        setError("Failed to place order. Try again.");
        return;
      }

      initiatePayment(externalRef, total);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Unexpected error occurred.");
    }
  };

  const total = product ? product.price * form.quantity : 0;

  return (
    <div className="container my-5">
      <h3 className="mb-4">Checkout</h3>
      <div className="row">
        <div className="col-md-6 mb-4">
          {loading ? (
            <Skeleton height={300} className="w-100 rounded" />
          ) : (
            <img src={product.main_image} alt={product.name} className="img-fluid rounded" />
          )}
        </div>

        <div className="col-md-6">
          {loading ? (
            <>
              <Skeleton height={40} style={{ marginBottom: 12 }} count={5} />
              <Skeleton height={40} width="60%" />
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name</label>
                <input type="text" name="name" className="form-control" required value={form.name} onChange={handleChange} autoComplete="name" />
              </div>
              <div className="mb-3">
                <label>MTN MoMo Number</label>
                <input type="tel" name="momoNumber" className="form-control" required value={form.momoNumber} onChange={handleChange} maxLength={9} autoComplete="tel" />
              </div>
              <div className="mb-3">
                <label>Contact Number</label>
                <input type="tel" name="contactNumber" className="form-control" required value={form.contactNumber} onChange={handleChange} maxLength={9} autoComplete="tel" />
              </div>
              <div className="mb-3">
                <label>City</label>
                <input type="text" name="city" className="form-control" required value={form.city} onChange={handleChange} autoComplete="address-level2" />
              </div>
              <div className="mb-3">
                <label>Quantity</label>
                <input type="number" name="quantity" className="form-control" min="1" value={form.quantity} onChange={handleChange} />
              </div>

              <p className="text-muted">
                Total: <strong>FCFA {total}</strong>
              </p>
              {error && <div className="alert alert-danger">{error}</div>}
              <button className="btn btn-success w-100" type="submit" id="payButton">
                Pay
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
