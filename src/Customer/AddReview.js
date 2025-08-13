import React, { useEffect,useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "../Components/CustomerNavbar";
import './AddReview.css'; // Make sure to link the updated CSS

function AddReview() {
  const [comment, setComment] = useState("");
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

  const userId = sessionStorage.getItem("userId");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!comment.trim()) {
      toast.warn("Please enter a comment.", { autoClose: 2000 });
      return;
    }

    try {
      const url = `http://localhost:5050/customer/addFeedback?userId=${userId}&comment=${encodeURIComponent(comment)}`;
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };

      await axios.post(url, {}, config);
      toast.success("Review added successfully!", { autoClose: 2000 });
      setComment("");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error("Failed to add review. Please try again.", { autoClose: 3000 });
      console.error("API Error:", error);
    }
  };

  return (
    <div>
      <CustomerNavbar />
      <div className="container mt-5">
        <ToastContainer />
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card p-4 shadow-lg review-card">
              <h2 className="text-center mb-4 fw-bold text-danger">Add Your Review</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="comment" className="form-label fw-semibold text-dark">
                    Comment:
                  </label>
                  <textarea
                    id="comment"
                    className="form-control rounded-3 review-textarea"
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your review here..."
                    required
                  />
                </div>
                <button type="submit" className="btn btn-warning w-100 py-2 text-dark fw-bold review-button">
                  Post Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddReview;
