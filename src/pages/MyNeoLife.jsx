import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MyNeoLife = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch current user session on mount
  useEffect(() => {
    const fetchUserAndOrders = async () => {
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        navigate("/login");
        return;
      }
      setUser(session.user);

      try {
        // Fetch orders joined with product info
        const { data: ordersData, error: ordersError } = await supabase
          .from("orders")
          .select(`id, quantity, total_price, status, ordered_at,
            product:products(id, name, main_image, price)`)
          .eq("user_id", session.user.id)
          .order("ordered_at", { ascending: false });

        if (ordersError) {
          setError("Failed to load orders: " + ordersError.message);
          return;
        }
        setOrders(ordersData || []);
      } catch (err) {
        setError("Unexpected error: " + err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUserAndOrders();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  return (
    <div className="container my-4" style={{ maxWidth: 720 }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>MyNeoLife Orders</h2>
        <button className="btn btn-outline-danger" onClick={handleLogout}>
          Log out
        </button>
      </div>

      {loading && (
        <>
          <Skeleton height={120} count={2} style={{ marginBottom: 16 }} />
        </>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && orders.length === 0 && (
        <p>You have no orders yet.</p>
      )}

      <div className="list-group">
        {orders.map((order) => (
          <div
            key={order.id}
            className="list-group-item list-group-item-action flex-column align-items-start mb-3 rounded shadow-sm"
          >
            <div className="d-flex w-100 justify-content-between">
              <h5 className="mb-1">{order.product?.name || "Product"}</h5>
              <small className="text-muted">
                {new Date(order.ordered_at).toLocaleDateString()}
              </small>
            </div>
            <div className="d-flex flex-column flex-md-row align-items-center gap-3 mt-2">
              <img
                src={order.product?.main_image}
                alt={order.product?.name}
                style={{ width: 100, height: 100, objectFit: "cover", borderRadius: 8 }}
                className="shadow-sm"
              />
              <div>
                <p className="mb-1">
                  Quantity: <strong>{order.quantity}</strong>
                </p>
                <p className="mb-1">
                  Total Price: <strong>FCFA {order.total_price}</strong>
                </p>
                <p className="mb-1">
                  Status:{" "}
                  <span
                    className={
                      order.status === "pending"
                        ? "badge bg-warning text-dark"
                        : order.status === "confirmed"
                        ? "badge bg-primary"
                        : order.status === "delivered"
                        ? "badge bg-success"
                        : order.status === "received"
                        ? "badge bg-secondary"
                        : "badge bg-light text-dark"
                    }
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNeoLife;
