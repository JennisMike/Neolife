// src/admin/views/OrdersView.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";
import dayjs from "dayjs";

function OrdersView() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select(`
        id,
        quantity,
        total_price,
        momo_phone,
        created_at,
        products(name),
        profiles(full_name, email, phone)
      `)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setOrders(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <h5 className="mb-3">Order History</h5>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Product</th>
              <th>Buyer Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>MoMo Phone</th>
              <th>Quantity</th>
              <th>Total (XAF)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.products?.name || "-"}</td>
                <td>{order.profiles?.full_name || "Unknown"}</td>
                <td>{order.profiles?.email || "-"}</td>
                <td>{order.profiles?.phone || "-"}</td>
                <td>{order.momo_phone}</td>
                <td>{order.quantity}</td>
                <td>{order.total_price}</td>
                <td>{dayjs(order.created_at).format("YYYY-MM-DD HH:mm")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export default OrdersView;
