// Frontend/src/components/Cart/Cart.jsx
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { ThreeDots } from "react-loader-spinner";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  EMPTY: "empty",
};

const Cart = () => {
  const { cart = [], decreaseQty, increaseQty, removeCart, clearCart } = useContext(AppContext);
  const [status, setStatus] = useState(STATUS.INITIAL);
  const navigate = useNavigate();

  useEffect(() => {
    setStatus(STATUS.LOADING);
    const timer = setTimeout(() => {
      setStatus(cart.length === 0 ? STATUS.EMPTY : STATUS.SUCCESS);
    }, 400);
    return () => clearTimeout(timer);
  }, [cart]);

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  /* LOADING */
  if (status === STATUS.LOADING) {
    return (
      <div className="cart-loader">
        <ThreeDots height="60" width="60" color="#2563eb" />
      </div>
    );
  }

  /* EMPTY */
  if (status === STATUS.EMPTY) {
    return (
      <div className="empty-cart-content">
        <h2>Your cart is empty 🛒</h2>
        <p>Add products to see them here</p>
        <button className="btn btn-warning text-white" onClick={() => navigate("/showProducts")}>Continue Shoping</button>

      </div>
    );
  }

  /* SUCCESS */
  return (
    <div className="cart-page">
      <div className="cart-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <FaArrowLeft /> Back
        </button>
        <h2 className="mt-3">My Cart</h2>
      </div>

      <div className="cart-wrapper">
        {/* ITEMS */}
        <div className="cart-items">
          {cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.image_url} alt={item.title} />

              <div className="cart-info">
                <h4>{item.title}</h4>
                <span className="price">₹{item.price}</span>
                <p className="qty">Quantity: {item.qty}</p>

                {/* 🔹 BUTTON GROUP */}
                <div className="cart-actions">
                  <button className="qty-btn" onClick={() => { increaseQty(item.product_id, 1) }}><CiCirclePlus /></button>
                  <button className="qty-btn" onClick={() => { decreaseQty(item.product_id, 1) }}><CiCircleMinus /></button>
                  <button className="remove-btn" onClick={() => {
                    if (window.confirm("Are you sure to remove this item from cart?")) {
                      removeCart(item.product_id);
                    }
                  }}><MdDelete /></button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* SUMMARY */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Total Items</span>
            <span>{cart.length}</span>
          </div>

          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{totalPrice.toFixed(2)}</span>
          </div>

          <button className="checkout-btn" onClick={() => { navigate('/userAddress') }}>Proceed to Checkout</button>
          <button className="clearCart-btn" onClick={() => {
            if (window.confirm("Are you sure to clear the cart?")) {
              clearCart();
            }
          }}>Clear Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
