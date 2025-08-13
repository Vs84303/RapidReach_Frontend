import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import axios from "axios";

// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import About from "./Components/About";
import Register from "./Components/Register";
import Payment from "./Components/Payment";
import AddReview from "./Customer/AddReview";
import EditProfile from "./Components/EditProfile";
import CreateCourier from "./Customer/CreateCourier";
import UserCourierHistory from "./Customer/UserCourierHistory";

import Reviews from "./Customer/Reviews";
import TrackingProgress from "./Customer/TrackingProgress";

// Admin Components
import Admin from "./Admin/Admin";
import AddBranch from "./Admin/AddBranch";
import ViewBranches from "./Admin/ViewBranches";
import ViewCouriers from "./Admin/ViewCouriers";
import ViewPayments from "./Admin/ViewPayments";
import EditBranch from "./Admin/EditBranch";
import AddEmployee from "./Admin/AddEmployee";
import ViewEmployees from "./Admin/ViewEmployees";

// Employee Components
import Employee from "./Employee/Employee";
import ViewTracking from "./Employee/ViewTracking";





function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/addBranch" element={<AddBranch />} />
            <Route path="/admin/viewBranches" element={<ViewBranches />} />
            <Route path="/admin/viewCouriers" element={<ViewCouriers />} />
            <Route path="/admin/viewpayments" element={<ViewPayments/>}/>
            <Route path="/admin/editbranch/:id" element={<EditBranch/>}></Route>
            <Route path="/admin/addemployee" element={<AddEmployee/>}></Route>
            <Route path="/admin/viewemployee" element={<ViewEmployees/>}></Route>
           

            {/* employee Routes */}
            <Route path="/employee" element={<Employee />} />
            <Route path="/employee/Viewtracking" element={<ViewTracking />}/>


            <Route path="/payment" element={<Payment />} />
            <Route path="/reviews" element={<Reviews/>}/>
            <Route path="/createcourier" element={<CreateCourier />} />
            <Route path="/courierhistory" element={<UserCourierHistory />}/>
           <Route path="/couriertracking/:courierId" element={<TrackingProgress />} />
            <Route path="/editprofile/:id" element={<EditProfile/>}/>
            <Route path="/customer/addreview" element={<AddReview />}/>
           
          </Routes>
        
      </Router>
    </div>
  );
}

export default App;
