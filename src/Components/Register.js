import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      pincode: "",
      address: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      contact: Yup.string()
        .matches(/^\d{10}$/, "Mobile number must be exactly 10 digits")
        .required("Mobile number is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .matches(/[A-Z]/, "Must include at least one uppercase letter")
        .matches(/[a-z]/, "Must include at least one lowercase letter")
        .matches(/[0-9]/, "Must include at least one number")
        .matches(/[!@#$%^&*]/, "Must include at least one special character (!@#$%^&*)")
        .required("Password is required"),
      pincode: Yup.string()
        .matches(/^\d{6}$/, "Pincode must be exactly 6 digits")
        .required("Pincode is required"),
      address: Yup.string()
        .min(10, "Address should be at least 10 characters long")
        .required("Address is required"),
    }),
    onSubmit: (values) => {
      const userData = {
        userName: values.name,
        contact: values.contact,
        email: values.email,
        password: values.password,
        pincode: values.pincode,
        address: values.address,
      };

      axios
        .post("http://localhost:5050/customer/registerUser", userData)
        .then(() => {
          toast.success("Registration successful!");
          navigate("/login");
        })
        .catch(() => {
          toast.error("Error registering user. Please try again.");
        });
    },
  });

  return (
    <>
    <CustomerNavbar />
    
    <div style={{ backgroundColor: "white", color: "black", minHeight: "70vh" }}>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-40 mt-2">
        <div
          className="shadow-lg p-4"
          style={{
            width: "35rem",
            backgroundColor: "white",
            color: "black",
            border: "3px solid #ff7e5f",
          }}
        >
          <h3 className="text-center mb-3">Register</h3>

          <form onSubmit={formik.handleSubmit}>
            {/* Name */}
            <div className="mb-3">
              <label>Name:</label>
              <input
                type="text"
                {...formik.getFieldProps("name")}
                className="form-control"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-danger">{formik.errors.name}</div>
              )}
            </div>

            {/* Contact */}
            <div className="mb-3">
              <label>Mobile:</label>
              <input
                type="text"
                {...formik.getFieldProps("contact")}
                className="form-control"
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            {/* Email */}
            <div className="mb-3">
              <label>Email:</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className="form-control"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-danger">{formik.errors.email}</div>
              )}
            </div>

            {/* Pincode */}
            <div className="mb-3">
              <label>Pincode:</label>
              <input
                type="text"
                {...formik.getFieldProps("pincode")}
                className="form-control"
              />
              {formik.touched.pincode && formik.errors.pincode && (
                <div className="text-danger">{formik.errors.pincode}</div>
              )}
            </div>

            {/* Address */}
            <div className="mb-3">
              <label>Address:</label>
              <textarea
                {...formik.getFieldProps("address")}
                className="form-control"
                rows="2"
              />
              {formik.touched.address && formik.errors.address && (
                <div className="text-danger">{formik.errors.address}</div>
              )}
            </div>

<div className="form-group mb-3">
  <label>Password:</label>
  <div style={{ display: "flex", alignItems: "center" }}>
    <input
      type={showPassword ? "text" : "password"}
      {...formik.getFieldProps("password")}
      className="form-control"
      placeholder="Enter password"
    />
    <span
      onClick={() => setShowPassword((prev) => !prev)}
      style={{
        marginLeft: "-30px",
        cursor: "pointer",
        zIndex: 2,
        color: "#6c757d",
      }}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </span>
  </div>
  {formik.touched.password && formik.errors.password && (
    <div className="text-danger">{formik.errors.password}</div>
  )}
</div>

            {/* Submit */}
            <div className="mb-2 w-100">
              <button
                type="submit"
                className="btn w-100"
                style={{ backgroundColor: "#ff7e5f" }}
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-2 text-center">
            <p>Already have an account?</p>
            <Link to="/login" style={{ textDecoration: "none", color: "#ff7e5f" }}>
              <strong>Login here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Register;
