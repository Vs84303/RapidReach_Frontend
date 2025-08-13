import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Slides() {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <ToastContainer />

      <img
        src="./assests/backimg2.jpg"
        alt="Banner"
        style={{
          zIndex: 1,
          width: "100%",
         
          maxHeight: "100vh",
          objectFit: "cover",
        }}
      />

<div
  style={{
    position: "absolute",
    top: "30%",
    left: "20%",
    transform: "translateY(-50%)",
    zIndex: 2,
    backgroundColor: "rgba(144, 228, 236, 0.8)", // fainter blue with transparency
    padding: "25px 35px",
    borderRadius: "12px",
    maxWidth: "650px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    border: "2px solid black"
  }}
>
  <h3
    style={{
      color: "red",
      fontSize: "2rem",
      marginBottom: "1rem",
      fontWeight: "bold",
    }}
  >
    Delivering More Than Just Packages
  </h3>

  <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0", color: "#000" }}>
    Real-Time Tracking at Your Fingertips
  </h1>

  <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0", color: "#000" }}>
    Fast, Safe & Reliable Courier Services
  </h1>

  <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0", color: "#000" }}>
    From Pickup to Delivery — We’ve Got You Covered
  </h1>

  <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0", color: "#000" }}>
    Seamless Support for Individuals & Businesses
  </h1>

  <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0", color: "#000" }}>
    Nationwide Reach with Local Expertise
  </h1>

  <h1 style={{ fontSize: "1.5rem", margin: "0.5rem 0", color: "#000" }}>
    Easy Scheduling, Hassle-Free Delivery
  </h1>
</div>

    </div>
  );
}

export default Slides;
