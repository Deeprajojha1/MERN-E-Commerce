import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.email || !formData.password) {
      toast.error("❌ Please fill all fields", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/api/users/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      // ✅ SUCCESS TOAST
      toast.success("✅ Registration successful!", {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        transition: Bounce,
      });

      console.log("User Registered:", response.data);

      // Reset form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Navigate to login
      setTimeout(() => {
        navigate("/login");
      }, 1600);

    } catch (error) {
      console.error("Register Error:", error);

      // 🔑 Correct error message handling
      const errorMsg =
        error.response?.data?.message || "Registration failed";

      // ❌ ERROR TOAST (NOT success)
      toast.error(`❌ ${errorMsg}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="register-page">
      <ToastContainer />

      <div className="register-card">
        <h2>Create Account</h2>
        <p className="subtitle">Join us and start shopping</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <p className="footer-text">
          Already have an account?{" "}
          <Link to="/login" className="link-item">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
