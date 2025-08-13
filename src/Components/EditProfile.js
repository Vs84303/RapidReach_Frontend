import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import CustomerNavbar from "./CustomerNavbar";


function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

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

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const editUrl = `http://localhost:5050/customer/getUserById/${id}`;
  const updateUrl = `http://localhost:5050/customer/updateUser/${id}`;

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios
      .get(editUrl, config)
      .then((response) => {
        const { userName, email, contact, pincode, address } = response.data;
        setUserName(userName || "");
        setEmail(email || "");
        setContact(contact || "");
        setPincode(pincode || "");
        setAddress(address || "");
        setPassword(""); // Leave password blank for security
      })
      .catch((error) => {
        console.error("Error occurred getting user details:", error);
        toast.error("Failed to fetch user details");
      });
  }, [editUrl]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password && password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    const userDetails = {
      userName,
      email,
      contact,
      pincode,
      address,
      password, // Only updated if entered
    };

    axios
      .put(updateUrl, userDetails, config)
      .then(() => {
        toast.success("Profile updated successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.error("Failed to update profile:", error);
        toast.error("Failed to update profile.");
      });
  };

  return (
  <>
  <CustomerNavbar />
  
    <div style={{ marginTop: "-15%" }}>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            marginTop: "25rem",
            border: "2px solid #feb47b",
            backgroundColor: "#f4f4f9",
            color: "black",
          }}
        >
          <h2 className="text-center mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label>User Name:</label>
              <input
                type="text"
                className="form-control"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "30px" }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Contact:</label>
              <input
                type="text"
                className="form-control"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                style={{ height: "30px" }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Pincode:</label>
              <input
                type="text"
                className="form-control"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength={6}
                pattern="\d{6}"
                style={{ height: "30px" }}
                required
              />
            </div>

            <div className="mb-3">
              <label>Address:</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{ height: "80px" }}
                required
              />
            </div>

            {/* Password + Eye Icon */}
           <div className="mb-3">
  <label>Password:</label>
  <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
    <input
      type={showPassword ? "text" : "password"}
      className="form-control"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter password"
      style={{ height: "30px", paddingRight: "35px" }} // extra padding for icon space
    />
    <span
      onClick={() => setShowPassword(!showPassword)}
      style={{
        position: "absolute",
        right: "10px",
        cursor: "pointer",
        color: "#6c757d",
        zIndex: 2
      }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
  {password && password.length < 6 && (
    <div className="text-danger">Password must be at least 6 characters.</div>
  )}
</div>


            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100"
                style={{ backgroundColor: "#feb47b" }}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </>
  );
}

export default EditProfile;
