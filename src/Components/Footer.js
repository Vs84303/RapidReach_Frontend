import React from 'react';
import { NavLink } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
  return (
    <footer className="bg-white text-black pt-5">
      <div className="container">
        <div className="row">

          {/* About RapidReach */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3 text-warning fw-bold">About RapidReach</h5>
            <p>
              <strong>RapidReach</strong> delivers fast, reliable, and secure courier services 
              across the country. With real-time tracking, easy pickups, and efficient delivery,
              we make sure your packages arrive on time—every time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="mb-3 text-warning fw-bold">Quick Links</h5>
            <ul className="list-unstyled">
              <li><NavLink to="/" className="text-decoration-none text-black">Home</NavLink></li>
              <li><NavLink to="/courier" className="text-decoration-none text-black">Courier</NavLink></li>
              <li><NavLink to="/reviews" className="text-decoration-none text-black">Reviews</NavLink></li>
              <li><NavLink to="/contact" className="text-decoration-none text-black">Contact</NavLink></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="mb-3 text-warning fw-bold">Contact</h5>
            <ul className="list-unstyled">
              <li><i className="fas fa-map-marker-alt me-2 text-warning"></i> RapidReach HQ, Logistics Park, Mumbai, India</li>
              <li><i className="fas fa-envelope me-2 text-warning"></i> support@rapidreach.com</li>
              <li><i className="fas fa-phone me-2 text-warning"></i> +91-90000-00000</li>
            </ul>
          </div>
        </div>

        {/* Social Icons */}
        <div className="text-center mb-3">
          <a href="#" className="text-warning me-3"><i className="fab fa-facebook fa-lg"></i></a>
          <a href="#" className="text-warning me-3"><i className="fab fa-twitter fa-lg"></i></a>
          <a href="#" className="text-warning me-3"><i className="fab fa-instagram fa-lg"></i></a>
          <a href="#" className="text-warning me-3"><i className="fab fa-linkedin fa-lg"></i></a>
          <a href="#" className="text-warning"><i className="fab fa-github fa-lg"></i></a>
        </div>

        {/* Copyright */}
        <div className="text-center py-3 border-top border-secondary" style={{ color: '#bbb' }}>
          &copy; {new Date().getFullYear()} RapidReach. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
