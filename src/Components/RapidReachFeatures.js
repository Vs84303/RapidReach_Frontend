import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./RapidReachFeatures.css"; // Create or rename your CSS file accordingly

const RapidReachFeatures = () => {
  const features = [
    {
      src: "../assests/post3.jpg",
      alt: "Real-time Tracking",
      title: "Real-Time Tracking",
      desc: "Track your parcels in real-time from pickup to delivery."
    },
    {
      src: "../assests/post2.jpg",
      alt: "Secure Handling",
      title: "Secure Handling",
      desc: "Your packages are handled with care and protected at every step."
    },
    {
      src: "../assests/post1.jpg",
      alt: "Doorstep Delivery",
      title: "Doorstep Delivery",
      desc: "Convenient and fast delivery right at your door, anytime, anywhere."
    }
  ];

  return (
    <div className="container my-5 text-center">
      {/* Header */}
      <div className="mb-5">
        <h2 className="feature-title text-danger fw-bold">Why Choose RapidReach?</h2>
        <p className="lead text-muted mx-auto" style={{ maxWidth: "600px" }}>
          Experience unmatched courier services designed for speed, safety, and simplicity.
          Whether it's across the street or across the state — we've got you covered.
        </p>
      </div>

      {/* Features Grid */}
      <div className="row g-4">
        {features.map((feature, index) => (
          <div className="col-md-4" key={index}>
            <div className="card h-100 feature-card shadow-sm border-0">
              <img
                src={feature.src}
                alt={feature.alt}
                className="card-img-top feature-image"
              />
              <div className="card-body">
                <h5 className="card-title fw-bold text-warning">{feature.title}</h5>
                <p className="card-text text-dark">{feature.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learn More Button */}
      <div className="mt-5">
        <button className="btn btn-warning fw-semibold px-4 py-2 rounded-pill text-dark">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default RapidReachFeatures;
