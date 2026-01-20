// Frontend/src/components/Navbar/Navbar.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaHome,
  FaBoxOpen,
  FaShoppingCart,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
  FaBars,
  FaTimes
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // ✅ TOKEN FROM CONTEXT (LOCALSTORAGE BASED)
  const { token, cart } = useContext(AppContext);
  const isAuthenticated = Boolean(token);

  // 🔥 LOGOUT (Mobile)
  const logoutOut = () => {
    // ❌ remove token from localStorage
    localStorage.removeItem("token");

    setOpen(false);

    toast.success("👋 Logged out successfully", {
      position: "top-right",
      autoClose: 1550,
      theme: "colored",
      transition: Bounce,
    });

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1550);
  };

  // 🔥 LOGOUT (Desktop)
  const logoutOutDestop = () => {
    // ❌ remove token from localStorage
    localStorage.removeItem("token");

    toast.success("👋 Logged out successfully", {
      position: "top-right",
      autoClose: 1550,
      theme: "colored",
      transition: Bounce,
    });

    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1550);
  };

  return (
    <nav className="nav">
      <ToastContainer />

      <div className="nav_bar">
        {/* Logo */}
        <Link to="/" className="nav-link"><div className="left">
          <h3>
            MERN<span>Store</span>
          </h3>
        </div>
        </Link>

        {/* Mobile Toggle */}
        <button className="menu-toggle" onClick={() => setOpen(!open)}>
          {open ? <FaTimes /> : <FaBars />}
        </button>

        {/* ================= DESKTOP MENU ================= */}
        <div className="right desktop-menu">
          <Link to="/" className="nav-btn primary">
            <FaHome />
            <span>Home</span>
          </Link>

          <Link to="/showProducts" className="nav-btn primary">
            <FaBoxOpen />
            <span>Products</span>
          </Link>

          {isAuthenticated && (
            <>
              <Link to="/showUserCart" className="link-item ">
                <button className="nav-btn cart-wrapper">
                  <FaShoppingCart />
                  <p className="cart-text">
                    Cart
                    {cart.length > 0 && (
                      <span className="cart-badge">{cart.length}</span>
                    )}
                  </p>
                </button>
              </Link>

              <Link to="/profile" className="link-item">
                <button className="nav-btn">
                  <FaUserCircle />
                  <span>Profile</span>
                </button>
              </Link>

              <button className="nav-btn danger" onClick={logoutOutDestop}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          )}

          {!isAuthenticated && (
            <>
              <Link to="/login" className="link-item">
                <button className="nav-btn success">
                  <FaSignInAlt />
                  <span>Login</span>
                </button>
              </Link>

              <Link to="/register" className="link-item">
                <button className="nav-btn warning">
                  <FaUserPlus />
                  <span>Register</span>
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div className={`mobile-menu ${open ? "open" : ""}`}>
        <Link
          to="/"
          className="nav-btn primary"
          onClick={() => setOpen(false)}
        >
          <FaHome />
          <span>Home</span>
        </Link>

        <Link
          to="/showProducts"
          className="nav-btn primary"
          onClick={() => setOpen(false)}
        >
          <FaBoxOpen />
          <span>Products</span>
        </Link>

        {isAuthenticated && (
          <>
            <Link to="/showUserCart" className="link-item">
              <button className="nav-btn cart-wrapper">
                <FaShoppingCart />
                <p className="cart-text">
                  Cart
                  {cart.length > 0 && (
                    <span className="cart-badge">{cart.length}</span>
                  )}
                </p>
              </button>
            </Link>

            <Link to="/profile" className="link-item">
              <button className="nav-btn">
                <FaUserCircle />
                <span>Profile</span>
              </button>
            </Link>

            <button className="nav-btn danger" onClick={logoutOut}>
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </>
        )}

        {!isAuthenticated && (
          <>
            <Link to="/login" className="link-item">
              <button
                className="nav-btn success"
                onClick={() => setOpen(false)}
              >
                <FaSignInAlt />
                <span>Login</span>
              </button>
            </Link>

            <Link to="/register" className="link-item">
              <button
                className="nav-btn warning"
                onClick={() => setOpen(false)}
              >
                <FaUserPlus />
                <span>Register</span>
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
