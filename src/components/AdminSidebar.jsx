// src/components/AdminSidebar.jsx
import React from "react";
import { ListGroup, Button } from "react-bootstrap";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";

function AdminSidebar({ activeTab, onTabChange, isOpen, toggleSidebar }) {
  const navigate = useNavigate();

  const tabs = [
    { key: "products", label: "Products" },
    { key: "orders", label: "Orders" },
    { key: "users", label: "Users" },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin-login");
  };

  return (
    <div
      className={`bg-dark text-white position-fixed top-0 start-0 h-100 shadow ${
        isOpen ? "d-block" : "d-none d-md-block"
      }`}
      style={{ width: "250px", zIndex: 1050 }}
    >
      <div className="d-flex justify-content-between align-items-center px-3 py-3 border-bottom border-secondary">
        <h5 className="mb-0">Admin Panel</h5>
        <button className="btn btn-sm btn-outline-light d-md-none" onClick={toggleSidebar}>
          ✕
        </button>
      </div>

      <ListGroup variant="flush">
        {tabs.map((tab) => (
          <ListGroup.Item
            key={tab.key}
            action
            onClick={() => {
              onTabChange(tab.key);
              if (window.innerWidth < 768) toggleSidebar(); // Close on small screen
            }}
            active={activeTab === tab.key}
            className={`text-capitalize ${
              activeTab === tab.key ? "bg-primary text-white" : "text-white"
            }`}
            style={{
              cursor: "pointer",
              backgroundColor: activeTab === tab.key ? "#0d6efd" : "transparent",
              border: "none",
              padding: "12px 20px",
            }}
          >
            {tab.label}
          </ListGroup.Item>
        ))}
      </ListGroup>

      <div className="text-center p-3 mt-auto border-top border-secondary">
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}

export default AdminSidebar;
