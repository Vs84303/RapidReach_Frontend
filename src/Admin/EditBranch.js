import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";

function EditBranch() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [branchName, setBranchName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  // Redirect based on role (optional)
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

  // Fetch branch details
  useEffect(() => {
    axios
      .get(`http://localhost:5050/admin/getBranchById/${id}`, config)
      .then((response) => {
        const data = response.data;
        setBranchName(data.branchName || "");
        setEmail(data.email || "");
        setPhone(data.phone || "");
        setAddress(data.address || "");
      })
      .catch((error) => {
        console.error("Error fetching branch details:", error);
        toast.error("Failed to fetch branch details");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!branchName || !email || !phone || !address) {
      toast.error("All fields are required");
      return;
    }

    const payload = {
      branchName,
      email,
      phone,
      address,
    };

    try {
      await axios.put(
        `http://localhost:5050/admin/updateBranchById/${id}`,
        payload,
        config
      );
      toast.success("Branch updated successfully!");
      setTimeout(() => navigate("/admin/viewbranches"), 2000);
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update branch");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            border: "2px solid #f3d70b",
            backgroundColor: "#f4f4f9",
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="text-center mb-4">Edit Branch</h2>
          <form onSubmit={handleSubmit}>
            {/* Branch Name */}
            <div className="mb-3">
              <label>Branch Name:</label>
              <input
                type="text"
                className="form-control"
                value={branchName}
                onChange={(e) => setBranchName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Phone */}
            <div className="mb-3">
              <label>Phone:</label>
              <input
                type="tel"
                className="form-control"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="[0-9]{10}"
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label>Address:</label>
              <textarea
                className="form-control"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <div className="mb-3 w-100">
              <button type="submit" className="btn btn-warning w-100">
                Update Branch
              </button>
            </div>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default EditBranch;
