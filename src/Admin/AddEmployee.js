import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";
import Admin from "./Admin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AddEmployee() {
  const [engineerName, setEngineerName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState("");

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

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const res = await axios.get("http://localhost:5050/admin/getAllBranches", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          },
        });
        setBranches(res.data || []);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranches();
  }, []);

  const validateForm = () => {
    if (!engineerName || !email || !address || !pincode || !contact || !password || !branchId) {
      setError("All fields are required.");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const pinRegex = /^[0-9]{6}$/;
    const contactRegex = /^[0-9]{10}$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;

    if (!emailRegex.test(email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!contactRegex.test(contact)) {
      setError("Contact must be 10 digits.");
      return false;
    }
    if (!pinRegex.test(pincode)) {
      setError("Pincode must be 6 digits.");
      return false;
    }
    if (!passwordRegex.test(password)) {
      setError("Password must be at least 6 characters with a letter and a number.");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const engineerData = {
      userName: engineerName,
      email,
      address,
      pincode,
      contact,
      password,
      branchId: parseInt(branchId),
    };

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      const response = await axios.post(
        "http://localhost:5050/admin/addEmployee",
        engineerData,
        config
      );

      if (response.status === 201) {
        alert("Employee added successfully!");
        setEngineerName("");
        setEmail("");
        setAddress("");
        setPincode("");
        setContact("");
        setPassword("");
        setBranchId("");
        setError("");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add Employee. Please try again.");
    }
  };

  return (
    <Admin>
      <div className="add-vets-container">
        <h3>Add New Employee</h3>
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Employee Name</label>
            <input
              type="text"
              value={engineerName}
              onChange={(e) => setEngineerName(e.target.value)}
              placeholder="Enter employee's name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Number</label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              pattern="[0-9]{10}"
              required
            />
          </div>

          <div className="form-group">
            <label>Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter 6-digit pincode"
              maxLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
              required
            />
          </div>

          <div className="form-group">
            <label>Assign to Branch</label>
            <select
              value={branchId}
              onChange={(e) => setBranchId(e.target.value)}
              required
            >
              <option value="">-- Select Branch --</option>
              {branches.map((branch) => (
                <option key={branch.id} value={branch.id}>
                  {branch.branchName} - {branch.address}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Password</label>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
              />
              <span
                style={{ marginLeft: "-30px", cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddEmployee;
