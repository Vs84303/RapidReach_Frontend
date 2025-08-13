import React from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Section1() {
  const navigate = useNavigate();


  return (
    <div className="container my-5 px-4">
      <div className="row align-items-center">
        {/* Text Section */}
        <div className="col-lg-6 col-md-6 col-12 mb-4 mb-md-0">
          <h2 className="mb-4 fw-bold" style={{ color: "#f63331", fontSize: "2.5rem" }}>
            Welcome to RapidReach
          </h2>
          <p className="mb-4 fs-5 text-dark">
            RapidReach is your trusted courier partner for fast, secure, and reliable deliveries.
            Whether it's a document across town or a package across the country, our tech-powered platform
            ensures real-time tracking, hassle-free pickups, and on-time delivery every time.
            <br /><br />
            From individuals to businesses, we serve everyone who values speed and simplicity.
          </p>
        
        </div>

        {/* Image Section */}
        <div className="col-lg-6 col-md-6 col-12">
          <img
            src="./assests/poster.jpg" // Make sure this image exists in your public/assets folder
            alt="RapidReach Delivery"
            className="img-fluid rounded shadow"
          />
        </div>
      </div>
    </div>
  );
}

export default Section1;
