import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ViewCouriers.css"; // Create or reuse for styling
import { useNavigate } from "react-router-dom";
import Admin from "./Admin";

function ViewCouriers() {
  const [couriers, setCouriers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    }
    else if (sessionStorage.getItem("userRole") === "EMPLOYEE") {
      navigate("/employee");
    }
  }, [navigate]);


  // Fetch all courier data
  useEffect(() => {
    const fetchCouriers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get("http://localhost:5050/customer/getAllCouriers", config);
        setCouriers(response.data || []);
      } catch (error) {
        console.error("Error fetching couriers:", error);
      }
    };

    fetchCouriers();
  }, []);

  return (
    <Admin>
      <div className="view-couriers-container">
        <h2>View Couriers</h2>
        <table className="couriers-table">
          <thead>
            <tr>
              <th>Pickup Location</th>
              <th>Drop Location</th>
              <th>Description</th>
              <th>Weight (kg)</th>
              <th>Price</th>
              <th>Branch</th>
            </tr>
          </thead>
          <tbody>
            {couriers.length > 0 ? (
              couriers.map((courier) => (
                <tr key={courier.courierId}>
                  <td>{courier.pickupLocation}</td>
                  <td>{courier.dropLocation}</td>
                  <td>{courier.description}</td>
                  <td>{courier.weight}</td>
                  <td>{courier.price}</td>
                  <td>{courier.branchName || "N/A"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No couriers available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewCouriers;
