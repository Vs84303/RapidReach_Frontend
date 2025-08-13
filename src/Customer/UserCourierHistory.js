import React, { useEffect, useState } from "react";
import axios from "axios";
import CustomerNavbar from "../Components/CustomerNavbar";
import { useNavigate } from "react-router-dom";
import "./UseCourierHistory.css"

function UserCourierHistory() {
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  useEffect(() => {
    if (!userId) {
      setError("Please log in to view your couriers.");
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}` },
        };
        const res = await axios.get(`http://localhost:5050/customer/getCouriersByUserId/${userId}`, config);
        setCouriers(res.data);
      } catch {
        setError("Failed to load courier history.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) return <p className="text-center text-warning mt-5">Loading your courier history…</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!couriers.length) return <p className="text-center text-warning mt-5">No courier history found.</p>;

  return (
    <>
      <CustomerNavbar />
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-warning">Your Courier History</h2>
        <div className="table-responsive shadow-lg rounded">
          <table className="table table-hover">
            <thead className="bg-warning text-dark">
              <tr>
                <th>Courier ID</th>
                <th>Pickup → Drop</th>
                <th>Weight (kg)</th>
                <th>Price (₹)</th>
                <th>Branch Name</th>
                <th>Branch Address</th>
              </tr>
            </thead>
            <tbody>
              {couriers.map((c, idx) => (
                <tr
                  key={c.id}
                  className="courier-row"
                  onClick={() => navigate(`/couriertracking/${c.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{c.id}</td>
                  <td>{c.pickUpLocation} → {c.dropLocation}</td>
                  <td>{c.parcelWeight}kg</td>
                  <td>₹{c.price.toFixed(2)}</td>
                  <td>{c.branch.branchName}</td>
                  <td>{c.branch.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserCourierHistory;
