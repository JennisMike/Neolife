import { Link } from "react-router-dom";
import logo from "/logo.png";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // 👈 enable navbar collapse

function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="NeoLife" height="40" />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav ms-auto align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/products">Shop</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact</Link></li>

            {user && user.email_confirmed_at ? (
              <li className="nav-item">
                <Link to="/myneolife" className="btn btn-outline-dark rounded-circle ms-3" style={{ width: 45, height: 45 }}>
                  <span className="d-flex align-items-center justify-content-center" style={{ height: "100%" }}>
                    <i className="bi bi-person" title="MyNeoLife"></i>
                  </span>
                </Link>
              </li>
            ) : (
              <div className="d-flex ms-3">
                <Link className="btn btn-outline-success me-2" to="/login">Login</Link>
                <Link className="btn btn-success" to="/signup">Sign Up</Link>
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
