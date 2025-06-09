import { useState } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function SignupPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Sign up user
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Insert profile row
    try {
      // Wait a bit for user to be created and user id to exist
      const userId = data.user.id;

      // Insert into profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: userId,
        email: email,
        created_at: new Date().toISOString(),
      });

      if (profileError) {
        // Optional: you can still proceed or show error
        setError("Failed to create user profile: " + profileError.message);
        setLoading(false);
        return;
      }
    } catch (err) {
      setError("Unexpected error creating profile.");
      setLoading(false);
      return;
    }

    setEmailSent(true);
    setLoading(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="w-100" style={{ maxWidth: "420px" }}>
        <div className="border rounded-4 shadow-sm p-4 bg-white">
          <h3 className="mb-4 text-center text-success fw-bold">
            Create a NeoLife Account
          </h3>

          {error && (
            <div className="alert alert-danger text-sm py-2">{error}</div>
          )}

          {emailSent ? (
            <div className="alert alert-info text-center">
              A confirmation email has been sent to <strong>{email}</strong>.
              <br />
              Please verify your email before logging in.
              <br />
              <Link to="/login" state={{ from }} className="btn btn-success mt-3">
                Go to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSignup}>
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

              <div className="mb-3 position-relative">
                <label className="form-label fw-semibold">Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="Choose a password"
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

              <div className="mb-4 position-relative">
                <label className="form-label fw-semibold">Confirm Password</label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  className="form-control form-control-lg"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: "absolute",
                    top: "38px",
                    right: "12px",
                    cursor: "pointer",
                    color: "#555",
                  }}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>

              <button
                type="submit"
                className="btn btn-success btn-lg w-100"
                disabled={loading}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
            </form>
          )}

          {!emailSent && (
            <div className="text-center mt-4">
              <p className="mb-0 text-muted">
                Already have an account?{" "}
                <Link to="/login" className="text-success fw-semibold" state={{ from }}>
                  Log in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
