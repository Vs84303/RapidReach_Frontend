import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import { BsPersonCircle } from "react-icons/bs";
import { BsListCheck, BsChatDotsFill } from "react-icons/bs"; // Courier, Reviews

import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";

function CustomerNavbar({ cartCount }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  const handleLoginClick = () => navigate("/login");
  const handleRegisterClick = () => navigate("/register");
  const handleLogoutClick = () => {
    sessionStorage.clear();
    navigate("/");
  };

  const yellowThemeButton = {
    backgroundColor: "#ffeb3b",
    border: "none",
    color: "#222",
    fontWeight: "600",
    padding: "0.5rem 1.2rem",
    borderRadius: "50px",
    transition: "all 0.3s ease",
  };

  return (
    <nav
      className="navbar navbar-expand-lg px-3 shadow-sm"
      style={{
        minHeight: "8vh",
        backgroundColor: "#f63331", // light yellow
      }}
    >
      <div className="container-fluid">
        {/* Brand Logo */}
        <NavLink
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          to="/"
          style={{
            color: "#222",
            textDecoration: "none",
            letterSpacing: "1px",
          }}
        >
          <span
            style={{
              background: "linear-gradient(90deg, #fbc02d, #fdd835)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: "900",
              fontSize: "1.8rem",
            }}
          >
            RapidReach
          </span>
        </NavLink>

        {/* Toggler for Mobile View */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Items */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center gap-3">
            {/* Profile / Sign In */}
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              style={{ position: "relative" }}
            >
              <button style={yellowThemeButton}>
                <BsPersonCircle size={20} className="me-2" />
                {userId ? "Profile" : "Sign In"}
              </button>

              {isDropdownOpen && (
                <div
                  className="dropdown-menu show"
                  style={{
                    top: "100%",
                    left: 0,
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    minWidth: "180px",
                    padding: "8px 0",
                  }}
                >
                  {userId ? (
                    <>

                      <button
                        className="dropdown-item py-2"
                        onClick={() => navigate(`/editprofile/${userId}`)}
                      >
                        Profile
                      </button>
                      <button
                        className="dropdown-item py-2 text-danger"
                        onClick={handleLogoutClick}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="dropdown-item py-2"
                        onClick={handleLoginClick}
                      >
                        Login
                      </button>
                      <button
                        className="dropdown-item py-2"
                        onClick={handleRegisterClick}
                      >
                        Register
                      </button>
                    </>
                  )}
                </div>
              )}
            </li>

            {/* Courier */}
            <li className="nav-item dropdown">
              <Dropdown>
                <Dropdown.Toggle variant="warning" id="courierDropdown" style={yellowThemeButton}>
                  <BsListCheck size={20} className="me-2" />
                  Courier
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={NavLink} to="/createcourier">
                    Create Courier
                  </Dropdown.Item>
                  <Dropdown.Item as={NavLink} to="/courierhistory">
                    View History
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>

            {/* Reviews */}
            <li className="nav-item">
              <NavLink to="/reviews">
                <button style={yellowThemeButton}>
                  <BsChatDotsFill size={20} className="me-2" />
                  Reviews
                </button>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
