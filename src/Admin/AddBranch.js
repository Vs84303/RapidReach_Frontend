import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AddBranch.css";
import Admin from "./Admin";
import { useNavigate } from "react-router-dom";

function AddBranch() {
  const [branchName, setBranchName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "CUSTOMER") {
      navigate("/customer");
    } else if (sessionStorage.getItem("userRole") === "ADMIN") {
      navigate("/admin");
    } else if (sessionStorage.getItem("userRole") === "EMPLOYEE") {
      navigate("/employee");
    }
  }, [navigate]);

  const validateForm = () => {
    if (!branchName.trim() || branchName.length < 3) {
      return "Branch name must be at least 3 characters.";
    }
    if (!/^[a-zA-Z0-9\s]+$/.test(branchName)) {
      return "Branch name can only contain letters, numbers, and spaces.";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "Please enter a valid email address.";
    }
    if (!/^\d{10,15}$/.test(phone)) {
      return "Phone number must be between 10 and 15 digits.";
    }
    if (!address.trim() || address.length < 10) {
      return "Address must be at least 10 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const payload = {
      branchName,
      email,
      phone,
      address,
    };

    try {
      const res = await axios.post(
        "http://localhost:5050/admin/addBranch",
        payload,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200 || res.status === 201) {
        setSuccess("Branch added successfully!");
        setBranchName("");
        setEmail("");
        setPhone("");
        setAddress("");
        setError("");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      console.error("Error adding branch:", err);
      setError("Failed to add branch. Please try again.");
    }
  };

  return (
    <Admin>
      <div className="add-category-container">
        <h3 className="mb-4">Add New Branch</h3>
        <form onSubmit={handleSubmit}>
          {/* Branch Name */}
          <div className="mb-3">
            <label className="form-label">Branch Name</label>
            <input
              type="text"
              className="form-control"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              placeholder="Enter branch name"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email address"
              required
            />
          </div>

          {/* Phone */}
          <div className="mb-3">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter phone number"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-3">
            <label className="form-label">Address</label>
            <textarea
              className="form-control"
              rows="3"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            ></textarea>
          </div>

          {/* Feedback */}
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddBranch;
