import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TrackingProgress.css";
import CustomerNavbar from "../Components/CustomerNavbar";

const steps = [
  "Courier Picked Up",
  "In Transit",
  "Out for Delivery",
  "Delivered"
];

const TrackingProgress = () => {
  const { courierId } = useParams(); // matches :id in route
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    if (courierId) {
      axios
        .get(`http://localhost:5050/customer/getTrackingStatusByCourierId/${courierId}`)
        .then((res) => {
          if (res.data && res.data.length > 0) {
            setCurrentStatus(res.data[0].trackingStatus); // latest status
          }
        })
        .catch((err) => {
          console.error("Error fetching tracking status:", err);
        });
    }
  }, [courierId]);

  return (
    <>
      <CustomerNavbar />
      <div className="tracking-stepper">
        {steps.map((step, idx) => {
          const stepIndex = steps.indexOf(currentStatus);
          const isDone = stepIndex >= idx;
          const isCurrent = step === currentStatus;

          return (
            <div key={idx} className="step-container">
              <div
                className={`step-circle 
                  ${isDone ? "done" : ""} 
                  ${isCurrent ? "current" : ""} 
                `}
              >
                {isDone ? "✓" : idx + 1}
              </div>
              <div
                className={`step-label ${isCurrent ? "current-label" : ""}`}
              >
                {step}
              </div>
              {idx < steps.length - 1 && (
                <div className={`step-line ${isDone ? "done" : ""}`}></div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TrackingProgress;
