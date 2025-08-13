import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ViewBranches.css"; // You can reuse or rename to ViewBranches.css
import Admin from "./Admin";

function ViewBranches() {
  const [branches, setBranches] = useState([]);
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
    const fetchBranches = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        };

        const res = await axios.get(
          "http://localhost:5050/admin/getAllBranches",
          config
        );
        setBranches(res.data || []);
      } catch (err) {
        console.error("Error fetching branches:", err);
      }
    };

    fetchBranches();
  }, []);

  const handleEdit = (id) => {
    if (id) {
      navigate(`/admin/editbranch/${id}`);
    } else {
      console.error("Branch ID is undefined");
    }
  };

  return (
    <Admin>
      <div className="view-products-container">
        <h3>All Branches</h3>
        <table className="product-table">
          <thead>
            <tr>
              <th>Branch Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
             
            </tr>
          </thead>
          <tbody>
            {branches.length > 0 ? (
              branches.map((branch) => (
                <tr key={branch.branchId}>
                  <td>{branch.branchName}</td>
                  <td>{branch.email}</td>
                  <td>{branch.phone}</td>
                  <td>{branch.address}</td>
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No branches found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Admin>
  );
}

export default ViewBranches;
