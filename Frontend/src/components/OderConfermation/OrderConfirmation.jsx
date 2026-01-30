import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import axios from "axios";
import "./OrderConfirmation.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

// ✅ Three dots spinner (react-spinners)
import { ThreeDots } from "react-loader-spinner";

const constantValue = {
  success: "SUCCESS",
  failed: "FAILED",
  loading: "LOADING",
  initial: "INITIAL",
};

const OrderConfirmation = () => {
  const { url, userId, token } = useContext(AppContext);
  const navigate = useNavigate();

  const [status, setStatus] = useState(constantValue.initial);
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setStatus(constantValue.loading);

        if (!userId) {
          setStatus(constantValue.failed);
          setErrorMsg("User not logged in ❌ Please login first.");
          return;
        }

        if (!token) {
          setStatus(constantValue.failed);
          setErrorMsg("Token missing ❌ Please login again.");
          return;
        }

        const res = await axios.get(`${url}/payment/userorder`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Orders Response ✅", res.data);

        if (res.data.success) {
          setOrders(res.data.orders || []);
          setStatus(constantValue.success);
        } else {
          setStatus(constantValue.failed);
          setErrorMsg("Failed to fetch orders ❌");
        }
      } catch (err) {
        console.log("Order fetch error ❌", err);

        setStatus(constantValue.failed);
        setErrorMsg(
          err?.response?.data?.message ||
            "Something went wrong while fetching orders ❌"
        );
      }
    };

    fetchOrders();
  }, [url, userId, token]);

  const latestOrder = orders?.[0];

  const renderUI = () => {
    switch (status) {
      case constantValue.loading:
        return (
          <div className="order-confirm-page">
            <div className="order-confirm-card center">
              <h2 className="title">Loading your order details...</h2>

              {/* ✅ Three Dots Loader */}
              <div className="loader-wrap">
                 <ThreeDots height="60" width="60" color="#2563eb" />
              </div>

              <p className="subtitle">Please wait 💫</p>
            </div>
          </div>
        );

      case constantValue.failed:
        return (
          <div className="order-confirm-page">
            <div className="order-confirm-card center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoce2ALrTr4EXqiE0iG0A8A_QldgR6q6T6jQ&s"
                alt="Error"
                className="error-img"
              />

              <h2 className="title">Oops! Something went wrong ❌</h2>
              <p className="subtitle">{errorMsg}</p>

              <div className="action-row">
                <button className="btn-outline" onClick={() => navigate("/")}>
                  Go Home
                </button>

                <button
                  className="btn-solid"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </button>
              </div>
            </div>
          </div>
        );

      case constantValue.success:
        if (!latestOrder) {
          return (
            <div className="order-confirm-page">
              <div className="order-confirm-card center">
                <h2 className="title">No orders found ✅</h2>
                <button className="btn-solid" onClick={() => navigate("/")}>
                  Continue Shopping
                </button>
              </div>
            </div>
          );
        }

        return (
          <div className="order-confirm-page">
            <FaArrowLeft onClick={() => navigate("/")} className="arrow" />

            <div className="order-confirm-card">
              <h1 className="success-title">✅ Order Confirmed!</h1>
              <p className="success-subtitle">
                Your payment is successful and your order has been placed 🎉
              </p>

              <div className="order-details-box">
                <h3>Order Details</h3>

                <p>
                  <b>Order Status:</b>{" "}
                  <span className="status">{latestOrder.status}</span>
                </p>

                <p>
                  <b>Total Amount:</b> ₹{latestOrder.amount}
                </p>

                <p>
                  <b>Currency:</b> {latestOrder.currency || "INR"}
                </p>

                <p>
                  <b>Order ID:</b> {latestOrder.orderId}
                </p>

                <p>
                  <b>Payment ID:</b> {latestOrder.paymentId}
                </p>
              </div>

              {/* ✅ SHIPPING INFO */}
              {latestOrder.userShipping && (
                <div className="shipping-box">
                  <h3>Shipping Address</h3>
                  <p>
                    <b>Name:</b> {latestOrder.userShipping.fullname}
                  </p>
                  <p>
                    <b>Phone:</b> {latestOrder.userShipping.phoneNumber}
                  </p>
                  <p>
                    <b>Address:</b> {latestOrder.userShipping.address}
                  </p>
                  <p>
                    <b>City:</b> {latestOrder.userShipping.city},{" "}
                    {latestOrder.userShipping.state}
                  </p>
                  <p>
                    <b>Country:</b> {latestOrder.userShipping.country} -{" "}
                    {latestOrder.userShipping.pincode}
                  </p>
                </div>
              )}

              {/* ✅ ITEMS */}
              <div className="items-box">
                <h3>Items Ordered</h3>

                {latestOrder.orderItems?.length > 0 ? (
                  latestOrder.orderItems.map((item, index) => (
                    <div className="item-row" key={index}>
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="item-img"
                      />

                      <div className="item-info">
                        <p className="item-title">{item.title}</p>
                        <p>Price: ₹{item.price}</p>
                        <p>Qty: {item.qty}</p>
                        <p>Total: ₹{Number(item.price) * Number(item.qty)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items found in this order.</p>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="order-confirm-page">
            <div className="order-confirm-card center">
              <h2 className="title">Preparing your order...</h2>
            </div>
          </div>
        );
    }
  };

  return <>{renderUI()}</>;
};

export default OrderConfirmation;
