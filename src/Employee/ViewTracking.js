import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewTracking.css";
import { useNavigate } from "react-router-dom";
import Employee from "./Employee";

function ViewTracking() {
  const [trackings, setTrackings] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState({}); // Track selected status for each tracking

  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

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
    const fetchTrackings = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`
          }
        };
        const res = await axios.get(
          `http://localhost:5050/customer/getCouriersByEmployee/${userId}`,
          config
        );
        setTrackings(res.data || []);
      } catch (err) {
        console.error("Error fetching trackings:", err);
      }
    };

    fetchTrackings();
  }, [userId]);

  const trackingOptions = [
    "Courier Picked Up",
    "In Transit",
    "Out for Delivery",
    "Delivered"
  ];

  const handleStatusSelect = (trackingId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [trackingId]: newStatus
    }));
  };

  const handleStatusUpdate = async (trackingId) => {
    const newStatus = selectedStatuses[trackingId];
    if (!newStatus) {
      alert("Please select a status before updating.");
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          "Content-Type": "application/json"
        }
      };

      await axios.put(
        `http://localhost:5050/customer/updateStatus/${trackingId}`,
        JSON.stringify(newStatus), // API expects raw string body
        config
      );

      // Update UI
      setTrackings((prev) =>
        prev.map((courier) => ({
          ...courier,
          trackings: courier.trackings.map((t) =>
            t.id === trackingId ? { ...t, status: newStatus } : t
          )
        }))
      );

      alert("Status updated successfully!");
    } catch (err) {
      console.error("Failed to update status:", err);
      alert("Error updating status. Please try again.");
    }
  };

  return (
    <Employee>
      <div className="view-trackings-container">
        <h3>View & Update Trackings</h3>
        <table className="tracking-table">
          <thead>
            <tr>
              <th>Tracking ID</th>
              <th>Courier Date</th>
              <th>Status</th>
              <th>Courier ID</th>
              <th>PickUp Location</th>
              <th>Drop Location</th>
              <th>Parcel Weight</th>
              <th>Customer Name</th>
              <th>New Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {trackings.length > 0 ? (
              trackings.flatMap((courier) =>
                courier.trackings.map((tracking) => (
                  <tr key={tracking.id}>
                    <td>{tracking.id}</td>
                    <td>{tracking.updatedAt}</td>
                    <td>{tracking.status}</td>
                    <td>{courier.id}</td>
                    <td>{courier.pickUpLocation}</td>
                    <td>{courier.dropLocation}</td>
                    <td>{courier.parcelWeight}</td>
                    <td>{courier.user?.userName}</td>
                    <td>
                      <select
                        value={selectedStatuses[tracking.id] || tracking.status}
                        onChange={(e) =>
                          handleStatusSelect(tracking.id, e.target.value)
                        }
                      >
                        {trackingOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleStatusUpdate(tracking.id)}
                        className="update-btn"
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan="10">No trackings found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Employee>
  );
}

export default ViewTracking;
