import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      <div className="container mx-auto py-10 px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* BillPay Section */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-4">BillPay</h2>
            <p className="text-sm text-gray-300 mb-4">
              Your trusted platform for managing and paying all kinds of utility bills in Bangladesh.
            </p>
            <div className="flex space-x-6 mt-4">
              <a href="#" className="text-xl hover:text-primary transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-xl hover:text-primary transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-xl hover:text-primary transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-xl hover:text-primary transition-colors">
                <FaLinkedin />
              </a>
            </div>
          </div>
          
          {/* Quick Links Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link to="/bills" className="hover:text-primary transition-colors">Bills</Link></li>
              <li><Link to="/profile" className="hover:text-primary transition-colors">My Profile</Link></li>
            </ul>
          </div>
          
          {/* Supported Organizations Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Supported Organizations</h3>
            <ul className="space-y-2 text-gray-300">
              <li>DESCO</li>
              <li>NESCO</li>
              <li>WASA</li>
              <li>Titas Gas</li>
              <li>All Major Banks</li>
            </ul>
          </div>
          
          {/* Contact Us Section */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
            <address className="text-gray-300 not-italic">
              <p>123 Payment Street</p>
              <p>Dhaka, Bangladesh</p>
              <p className="mt-2">Email: <a href="mailto:info@billpay.com" className="hover:text-primary transition-colors">info@billpay.com</a></p>
              <p>Phone: <a href="tel:+8801700000000" className="hover:text-primary transition-colors">+880 1700 000000</a></p>
            </address>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} BillPay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
