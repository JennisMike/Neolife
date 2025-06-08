import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/HomePage.css";
// import NeoLifeQuality from "../components/NeoLifeQuality";


function HomePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-light text-center py-5">
        <div className="container">
          <h1 className="display-5 fw-bold">Welcome to NeoLife</h1>
          <p className="lead mb-4">Health and Wellness products for a better life.</p>
          <Link to="/shop" className="btn btn-success btn-lg">
            Shop Now
          </Link>
        </div>
      </section>

      {/* <NeoLifeQuality /> */}

      {/* Features Section */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="mb-5">Why Choose NeoLife?</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <h5>Scientifically Backed</h5>
              <p>Our products are based on decades of research.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Natural Ingredients</h5>
              <p>Pure and effective solutions for your health.</p>
            </div>
            <div className="col-md-4 mb-4">
              <h5>Trusted Worldwide</h5>
              <p>Over 60 years of delivering wellness globally.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="mb-5 fw-bold text-muted">
            Cleaner, Safer, Healthier <span className="text-dark">Solutions</span>
          </h2>
          <div className="row align-items-center justify-content-center">
            {/* Nutritionals */}
            <div className="col-md-4 mb-4">
              <Link to="/shop?category=Nutritionals" className="text-decoration-none text-dark">
                <img
                  src="/images/nutritionals.png"
                  alt="Nutritionals"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "250px" }}
                />
                <img
                  src="/images/neolife-logo.png"
                  alt="NeoLife Logo"
                  style={{ height: "40px", marginBottom: "10px" }}
                />
                <h5 className="fw-bold">Nutritionals</h5>
              </Link>
            </div>

            {/* Skin Care */}
            <div className="col-md-4 mb-4">
              <Link to="/shop?category=Skin%20Care" className="text-decoration-none text-dark">
                <img
                  src="/images/skin-care.png"
                  alt="Skin Care"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "250px" }}
                />
                <img
                  src="/images/nutriance-logo.png"
                  alt="Nutriance Logo"
                  style={{ height: "30px", marginBottom: "10px" }}
                />
                <h5 className="fw-bold">Skin care</h5>
              </Link>
            </div>

            {/* Home Care */}
            <div className="col-md-4 mb-4">
              <Link to="/shop?category=Home%20Care" className="text-decoration-none text-dark">
                <img
                  src="/images/home-care.png"
                  alt="Home Care"
                  className="img-fluid mb-3"
                  style={{ maxHeight: "250px" }}
                />
                <img
                  src="/images/golden-logo.png"
                  alt="Golden Logo"
                  style={{ height: "35px", marginBottom: "10px" }}
                />
                <h5 className="fw-bold">Home care</h5>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* Testimonials Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5">What Our Customers Say</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <blockquote className="blockquote">
                <p>"NeoLife products have transformed my health!"</p>
                <footer className="blockquote-footer">Sarah W.</footer>
              </blockquote>
            </div>
            <div className="col-md-4 mb-4">
              <blockquote className="blockquote">
                <p>"High quality and trustworthy supplements."</p>
                <footer className="blockquote-footer">James T.</footer>
              </blockquote>
            </div>
            <div className="col-md-4 mb-4">
              <blockquote className="blockquote">
                <p>"I recommend NeoLife to all my friends and family."</p>
                <footer className="blockquote-footer">Emily R.</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup Section */}
      <section className="py-5 position-relative bg-light overflow-hidden">
        {/* Decorative leaf graphic at bottom-right */}
        <img
          src="/images/leaf-bg.png"
          alt=""
          className="position-absolute end-0 bottom-0 opacity-25 leaf-bg"
        />

        <div className="container">
          <div className="row align-items-center">
            {/* Left side: text */}
            <div className="col-lg-6 mb-4">
              <h2 className="fw-bold">Stay in the Loop</h2>
              <p className="lead">
                Join our monthly NeoLife newsletter for health tips, product updates,
                exclusive offers, and inspiring stories that uplift your mind, body, and soul.
              </p>
            </div>

            {/* Right side: form */}
            <div className="col-lg-6">
              {submitted ? (
                <div className="alert alert-success text-center">
                  Thank you for subscribing! 🎉
                </div>
              ) : (
                <form
                  onSubmit={handleNewsletterSubmit}
                  className="row g-2 justify-content-center"
                  style={{ maxWidth: 600, margin: "0 auto" }}
                >
                  <div className="col-8">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-4 d-grid">
                    <button type="submit" className="btn btn-success btn-lg">
                      Subscribe
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
