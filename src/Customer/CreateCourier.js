import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";

function CreateCourier() {
  const navigate = useNavigate();

  const userId = sessionStorage.getItem("userId");
  const token = sessionStorage.getItem("jwtToken");
  const customerId = sessionStorage.getItem("userId");

  // Redirect based on role
  useEffect(() => {
    const role = sessionStorage.getItem("userRole");
    if (!userId) return; // No redirect if not logged in
    if (role === "CUSTOMER") navigate("/customer");
    else if (role === "ADMIN") navigate("/admin");
    else if (role === "EMPLOYEE") navigate("/employee");
  }, [navigate, userId]);

  const [branches, setBranches] = useState([]);
  const [pickup, setPickup] = useState("");
  const [drop, setDrop] = useState("");
  const [selectedBranchId, setSelectedBranchId] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [price, setPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch branches
  useEffect(() => {
    if (!userId) return; // Don't call API if not logged in
    const config = { headers: { Authorization: `Bearer ${token}` } };
    axios
      .get("http://localhost:5050/admin/getAllBranches", config)
      .then((res) => setBranches(res.data || []))
      .catch(() => toast.error("Failed to load branches"));
  }, [token, userId]);

  // Auto-calculate price
  useEffect(() => {
    const w = parseFloat(weight);
    setPrice(w > 0 ? w * 100 : 0);
  }, [weight]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!pickup || !drop || !selectedBranchId || !description || !weight) {
      toast.warn("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);
    const payload = {
     
      PickUpLocation: pickup,
      DropLocation: drop,
      BranchId: Number(selectedBranchId),
      ParcelDescription: description,
      ParcelWeight: parseFloat(weight),
      Price: price,
    };

    const config = {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    };

    try {
      const res = await axios.post(
        `http://localhost:5050/customer/addCourier/${customerId}`,
        payload,
        config
      );

      const courierId = res.data?.courierId;
      if (courierId) {
        navigate("/payment", {
          state: { PackageId: courierId, Amount: price },
        });
      } else {
        toast.error("Courier created, but missing ID for payment");
      }
    } catch {
      toast.error("Failed to create courier request");
    } finally {
      setIsSubmitting(false);
    }
  };

  // If not logged in, show message instead of form
  if (!userId) {
    return (
      <>
        <CustomerNavbar />
        <ToastContainer />
        <div className="container mt-5 text-center">
          <h3 className="fw-bold">Please login to create a courier request</h3>
          <Link to="/login" className="btn btn-warning mt-3">
            Go to Login
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <CustomerNavbar />
      <ToastContainer />
      <div className="container mt-5" style={{ maxWidth: "600px" }}>
        <div className="card shadow p-4">
          <h2 className="mb-4 text-center fw-bold">Create Courier Request</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Pickup Location</label>
              <input
                className="form-control"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Drop Location</label>
              <input
                className="form-control"
                value={drop}
                onChange={(e) => setDrop(e.target.value)}
                placeholder="Enter drop location"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Select Branch</label>
              <select
                className="form-select"
                value={selectedBranchId}
                onChange={(e) => setSelectedBranchId(e.target.value)}
                required
              >
                <option value="">-- Choose Branch --</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.branchName} — {b.address}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Package Description</label>
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the parcel"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Weight (kg)</label>
              <input
                type="number"
                className="form-control"
                value={weight}
                min="0"
                step="0.1"
                onChange={(e) => setWeight(e.target.value)}
                placeholder="Enter package weight"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price (₹100/kg)</label>
              <input
                type="text"
                className="form-control"
                value={`₹ ${price.toFixed(2)}`}
                readOnly
              />
            </div>

            <button
              type="submit"
              className="btn btn-warning w-100 py-2 fw-bold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Request"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateCourier;
