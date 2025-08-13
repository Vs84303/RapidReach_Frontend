import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import CustomerNavbar from "./CustomerNavbar";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5050/login", values);
        toast.success("Login Successful!", {
          position: "top-center",
          autoClose: 1000,
        });

        const user = response.data;
        sessionStorage.setItem("userName", user.name);
        sessionStorage.setItem("userId", user.id);
        sessionStorage.setItem("userRole", user.role);
        sessionStorage.setItem("jwtToken", user.jwt);

        if (user.role === "ROLE_CUSTOMER") navigate("/");
        else if (user.role === "ROLE_ADMIN") navigate("/admin");
        else if (user.role === "ROLE_EMPLOYEE") navigate("/employee");
      } catch (error) {
        toast.error("Invalid email or password!", {
          position: "top-center",
          autoClose: 1000,
        });
      }
    },
  });

  return (
    <>
    <CustomerNavbar />
    <div style={{ backgroundColor: "white", color: "white", minHeight: "100vh" }}>
      <ToastContainer />
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="shadow-lg p-4"
          style={{
            width: "30rem",
            backgroundColor: "white",
            border: "3px solid #ff7e5f",
            color: "black",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h2 className="text-center mb-4">Login</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Email Input */}
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

            {/* Password Input with Eye Icon */}
            <div className="mb-3">
              <label>Password:</label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  {...formik.getFieldProps("password")}
                  className="form-control"
                />
                <span className="input-group-text" onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            {/* Login Button */}
            <div className="mb-3 w-100">
              <button
                type="submit"
                className="btn btn-light w-100 mt-3"
                style={{ backgroundColor: "#ff7e5f" }}
              >
                Login
              </button>
            </div>
          </form>

          {/* Register Link */}
          <div className="mt-3 text-center">
            <p>Don't have an account?</p>
            <Link to="/register" style={{ textDecoration: "none", color: "#ff7e5f" }}>
              <strong>Register here</strong>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
