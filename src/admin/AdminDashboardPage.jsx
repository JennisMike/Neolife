import React, { useState } from "react";
import AdminSidebar from "../components/AdminSidebar";
import ProductsView from "./views/ProductsView";
import OrdersView from "./views/OrdersView";
import UsersView from "./views/UsersView";

function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const renderContent = () => {
    switch (activeTab) {
      case "products":
        return <ProductsView />;
      case "orders":
        return <OrdersView />;
      case "users":
        return <UsersView />;
      default:
        return <ProductsView />;
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <AdminSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
      />

      <div
        className="flex-grow-1 p-3"
        style={{
          marginLeft: window.innerWidth >= 768 ? "250px" : "0",
          backgroundColor: "#f9f9f9",
          width: "100%",
        }}
      >
        <button className="btn btn-outline-dark mb-3 d-md-none" onClick={toggleSidebar}>
          ☰ Menu
        </button>

        <h3 className="mb-4 text-capitalize">{activeTab} Management</h3>
        <div className="card p-3 shadow-sm bg-white rounded">{renderContent()}</div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;
