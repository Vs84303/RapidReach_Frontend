import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Packages.css";

function Packages() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get("http://localhost:5050/package/getAllPackages", config)
      .then((res) => {
        setPackages(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load packages.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading packages...</p>;
  if (error) return <p>{error}</p>;

  // Get current logged-in customer ID from session (adjust as per your auth flow)
  const customerId = Number(sessionStorage.getItem("userId")); // assuming userId stored as string

  const colors = ["#f3d70b", "#6fcf97", "#56ccf2", "#bb6bd9", "#f2994a"];

  const handleBuyClick = (pkg) => {
    if (!customerId) {
      alert("Please login to buy packages.");
      navigate("/login");
      return;
    }

    // Navigate to payment page with necessary data as state
    navigate("/payment", {
      state: {
        PackageId: pkg.packageId,
        Amount: pkg.price,
        CustomerId: customerId,
      },
    });
  };

  return (
    <div className="packages-container">
      {packages.length === 0 ? (
        <p>No packages found</p>
      ) : (
        packages.map((pkg, index) => (
          <div
            key={pkg.packageId}
            className="package-card"
            style={{ borderColor: colors[index % colors.length] }}
          >
            <h3
              className="package-name"
              style={{ color: colors[index % colors.length] }}
            >
              {pkg.packageName}
            </h3>
            <p className="package-description">
              {pkg.description || "No description available."}
            </p>
            <p>
              <span
                className="label"
                style={{ backgroundColor: colors[index % colors.length] }}
              >
                Price:
              </span>{" "}
              Rs. {pkg.price?.toFixed(2) ?? "0.00"}
            </p>
            <p>
              <span
                className="label"
                style={{ backgroundColor: colors[(index + 1) % colors.length] }}
              >
                Package ID:
              </span>{" "}
              {pkg.packageId}
            </p>
            <button
              className="buy-button"
              style={{ backgroundColor: colors[index % colors.length] }}
              onClick={() => handleBuyClick(pkg)}
            >
              Buy Now
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Packages;
