import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewBranches"; 
import Admin from "./Admin";

function ViewEmployees() {
  const [engineers, setEngineers] = useState([]);
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
  
  useEffect(() => {
    const fetchEngineers = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const response = await axios.get("http://localhost:5050/admin/getAllEmployees", config);
        setEngineers(response.data);
      } catch (error) {
        console.error("Error fetching vets:", error);
      }
    };

    fetchEngineers();
  }, []);


  return (
    <Admin>
      <div className="view-products-container">
        <h3>View Engineers</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Engineer Name</th>
              <th>Email</th>
              <th>Contact Number</th>
              <th>Pincode</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {engineers.length > 0 ? (
              engineers.map((engineer) => (
                <tr key={engineer.id}>
                  <td>{engineer.userName}</td>
                  <td>{engineer.email}</td>
                  <td>{engineer.contact}</td>
                  <td>{engineer.pincode}</td>
                  <td>{engineer.address}</td>
                  
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No engineer available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewEmployees;
