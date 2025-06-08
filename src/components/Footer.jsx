import momo from "../images/momo.png";
import orange_money from "../images/orange money.jpeg";

function Footer() {
  return (
    <footer style={{ backgroundColor: '#2d1f1f', color: '#fff', fontSize: '0.95rem' }} className="pt-5 pb-3">
      <div className="container">
        <div className="row text-light">
          {/* Customer Service */}
          <div className="col-md-4 mb-4">
            <h6 className="text-warning fw-semibold">Customer service</h6>
            <ul className="list-unstyled">
              <li><a href="/info" className="text-light text-decoration-none">Information</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">Contact us</a></li>
              <li><a href="/terms" className="text-light text-decoration-none">Terms and conditions</a></li>
            </ul>
          </div>

          {/* Help Info */}
          <div className="col-md-4 mb-4">
            <h6 className="text-warning fw-semibold">Do you need help?</h6>
            <p>Our customer service will help you answer all your questions.</p>
            <p><a href="mailto:customerservice@uk.neolife.com" className="text-light text-decoration-none">customerservice@uk.neolife.com</a></p>
            <p>UK / Ireland: +46 (0)31 - 706 74 00</p>
            <p>UK Landline Only: 0800-145-6550</p>
          </div>

          {/* Company Info */}
          <div className="col-md-4 mb-4">
            <h6 className="text-warning fw-semibold">NeoLife International Ltd</h6>
            <p className="mb-1">Old Bank Chambers</p>
            <p className="mb-1">582-586 Kingsbury Road</p>
            <p className="mb-1">Littoral</p>
            <p className="mb-1">Douala/Yaounde</p>
            <p className="mb-2">Cameroon</p>
            <p>Company registration number 291 04 00</p>
            {/* Social Icons */}
            <div className="mt-3 d-flex gap-3">
              <a href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="bi bi-facebook fs-5"></i>
              </a>
              <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="bi bi-instagram fs-5"></i>
              </a>
              <a href="https://youtube.com/yourchannel" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="bi bi-youtube fs-5"></i>
              </a>
              <a href="https://pinterest.com/yourprofile" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="bi bi-pinterest fs-5"></i>
              </a>
              <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" className="text-light">
                <i className="bi bi-linkedin fs-5"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-top border-light mt-4" />

        {/* Bottom Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-3">
          <div className="text-light mb-2 mb-md-0">
            <small>© 2025 NeoLife. All rights reserved</small><br />
            <small>Site by ppl</small>
          </div>
          <div className="d-flex align-items-center gap-2">
            <img src={momo} alt="MTN Mobile Money" height="40" />
            <img src={orange_money} alt="Orange Money" height="50" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
