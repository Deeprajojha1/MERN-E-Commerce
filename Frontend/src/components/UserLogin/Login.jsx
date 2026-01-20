import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //  SAME LOGIC, ONLY STORAGE CHANGE
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res.data);

      if (res.data.success) {
        toast.success("Login successful!", {
          autoClose: 1800,
          transition: Bounce,
          onClose: () => navigate("/")
        });

        localStorage.setItem("token", res.data.token);
      }

    } catch (error) {
      toast.error(
        `❌ ${error.response?.data?.message || "Login failed"}`,
        { autoClose: 2000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <ToastContainer />

      <div className="login-card">
        <h2>Welcome Back 👋</h2>
        <p className="subtitle">Login to your account</p>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="footer-text">
            Don’t have an account?{" "}
            <Link to="/register" className="link-item">
              <span>Register</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
