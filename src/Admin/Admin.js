import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserPlus,
  FaBuilding,
  FaMapMarkedAlt,
  FaUsersCog,
  FaBoxes,
  FaUserTie,
  FaMoneyBillWave,
} from "react-icons/fa";


import AdminNavbar from "./AdminNavbar";
import "./Styles.css";

function Admin({ children }) {
  return (
    <div>
      <AdminNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{
            border: "2px solid black",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "yellow",
            minHeight: "100vh",
            padding: "1rem"
          }}
        >
          <div className="sidebar-header mb-4">
            <h3 className="fw-bold text-dark">Admin Panel</h3>
          </div>

          <nav className="sidebar-nav d-flex flex-column gap-3">
            {/* Add Branch */}
            <NavLink
              to="/admin/addbranch"
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <FaBuilding className="icon me-2" /> Add Branch
            </NavLink>

            {/* View Branches */}
            <NavLink
              to="/admin/viewbranches"
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <FaMapMarkedAlt className="icon me-2" /> View All Branches
            </NavLink>

            {/* Add Engineer */}
            <NavLink
              to="/admin/addemployee"
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <FaUserTie className="icon me-2" /> Add Employee
            </NavLink>

            {/* View Engineers */}
            <NavLink
              to="/admin/viewemployee"
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <FaUsersCog className="icon me-2" /> View All Employee
            </NavLink>

            {/* View Couriers
            <NavLink
              to="/admin/viewcouriers"
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <FaBoxes className="icon me-2" /> View All Couriers
            </NavLink> */}

            {/* View Payments */}
            <NavLink
              to="/admin/viewpayments"
              className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}
            >
              <FaMoneyBillWave className="icon me-2" /> View Payments
            </NavLink>

          </nav>
        </div>

        <div className="main-content p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Admin;
