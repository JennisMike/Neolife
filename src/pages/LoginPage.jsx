import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Redirect if already logged in AND email verified
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data.session;

      if (session && session.user.email_confirmed_at) {
        navigate(from, { replace: true });
      }
    };
    checkSession();
  }, [navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { data, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      setError(loginError.message);
      setLoading(false);
      return;
    }

    if (!data.user.email_confirmed_at) {
      setError("Please verify your email before logging in.");
      setLoading(false);
      return;
    }

    setLoading(false);
    navigate(from, { replace: true });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="border rounded-4 shadow-sm p-4 bg-white">
          <h3 className="mb-4 text-center text-success fw-bold">
            Login to NeoLife
          </h3>
          {error && (
            <div className="alert alert-danger text-sm py-2">{error}</div>
          )}
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control form-control-lg"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4 position-relative">
              <label className="form-label fw-semibold">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  top: "38px",
                  right: "12px",
                  cursor: "pointer",
                  color: "#555",
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <button
              type="submit"
              className="btn btn-success btn-lg w-100"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="mb-0 text-muted">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-success fw-semibold"
                state={{ from }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
