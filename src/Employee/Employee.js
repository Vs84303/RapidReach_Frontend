import React from "react";
import {useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaPlus, FaCreditCard } from "react-icons/fa"; 
import { MdCategory } from "react-icons/md";
import { useNavigate } from "react-router-dom"; 
import { GiReceiveMoney } from "react-icons/gi"; 
import { AiOutlineEye } from "react-icons/ai"; 
import { GrPlan } from "react-icons/gr";
import { FaUserMd } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import EngineerNavbar from "./EmployeeNavbar";
import "./Styles.css";

function Engineer({ children }) {

  const navigate = useNavigate();


  return (
    <div>
      <EngineerNavbar />
      <div className="layout-container">
        <div
          className="sidebar"
          style={{ border: "2px solid black", display: "flex", backgroundColor: "yellow" }}
        >
          <div className="sidebar-header">
            <h3>Employee Dashboard</h3>
          </div>
          <nav className="sidebar-nav">
            <NavLink
              to="/employee/viewtracking"
              className={({ isActive }) =>
                isActive ? "sidebar-link active" : "sidebar-link"
              }
            >
              <MdCategory className="icon" /> View Trackings
            </NavLink>
          </nav>
        </div>

        <div className="main-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Engineer;
