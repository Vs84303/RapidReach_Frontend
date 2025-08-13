import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Section2.css';

function Section2() {
  return (
    <div className="section2-container py-4">
      <div className="position-relative section2-banner">
        {/* Banner Image */}
        <img
          src="../assests/backimg3.jpg" // <-- Make sure path/image exists
          alt="RapidReach Banner"
          className="img-fluid w-100 banner-img"
        />

        {/* Dark Overlay */}
        <div className="overlay"></div>

        {/* Text on Banner */}
        <div className="banner-text text-center text-white px-3">
          <h2 className="banner-title mb-3">Why Choose RapidReach?</h2>
          <p className="banner-description lead">
            Experience lightning-fast, reliable, and secure courier services with RapidReach.
            From real-time tracking to doorstep delivery, our platform ensures your packages
            arrive on time, every time — powered by technology and driven by trust.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Section2;
