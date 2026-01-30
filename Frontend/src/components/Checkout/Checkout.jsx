import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import OrderSummeryProductDetils from "../OrderSummeryProductDetils/OrderSummeryProductDetils";
import "./Checkout.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const {
    addresses,
    cart,
    decreaseQty,
    increaseQty,
    removeCart,
    url,
    userId,
    clearCart,
    totalAmount,
  } = useContext(AppContext);

  const navigate = useNavigate();
  const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  //  address fix
  const selectedAddress = Array.isArray(addresses)
    ? addresses[0]
    : addresses || null;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first!");
        return;
      }

      // Validate required fields
      if (!selectedAddress) {
        alert("Please add/select address");
        return;
      }

      if (!cart || cart.length === 0) {
        alert("Your cart is empty");
        return;
      }

      // Load Razorpay script
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Razorpay SDK failed to load. Please try again.");
        return;
      }

      // Create order
      const orderResponse = await axios.post(
        `${url}/payment/checkout`,
        {
          amount: totalAmount,
          cartItems: cart,
          userShipping: selectedAddress,
          userId: userId,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      console.log("Order created:", orderResponse.data);

      const orderId = orderResponse.data.orderId;
      const amount = orderResponse.data.amount;

      // Initialize Razorpay
      const options = {
        key: razorpayKeyId,
        amount: amount * 100, // Convert to paise
        currency: "INR",
        name: "Your Store Name",
        description: "Order Payment",
        order_id: orderId,
        handler: async function (response) {
          try {
            console.log("Razorpay response:", response); // Debug log

            // Make sure we have all required fields
            if (!response.razorpay_order_id || !response.razorpay_payment_id || !response.razorpay_signature) {
              throw new Error("Incomplete payment response from Razorpay");
            }

            const paymentData = {
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              amount: totalAmount,
              orderItems: cart,
              userId: userId,
              userShipping: selectedAddress,
            };

            console.log("Sending verification request with:", paymentData); // Debug log

            const verifyResponse = await axios.post(
              `${url}/payment/verify-payment`,
              paymentData,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            console.log("Verification response:", verifyResponse); // Debug log

            if (verifyResponse.data && verifyResponse.data.success) {
              clearCart();
              navigate("/order-confirmation", {
                state: {
                  success: true,
                  orderId: paymentData.orderId
                }
              });
            } else {
              throw new Error(verifyResponse.data?.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            alert(`Payment verification failed: ${error.message}`);
            // Optionally redirect to a failure page or show a retry button
          }
        },
        prefill: {
          name: selectedAddress?.fullname || "",
          email: selectedAddress?.email || "customer@example.com",
          contact: selectedAddress?.phoneNumber || "9999999999"
        },
        theme: {
          color: "#3399cc"
        }
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
        alert(`Payment failed: ${response.error.description || "Unknown error"}`);
      });

      rzp.open();

    } catch (error) {
      console.error("Payment error:", error);
      const errorMessage = error.response?.data?.message ||
        error.message ||
        "Payment failed. Please try again.";
      alert(errorMessage);
    }
  };

  if (!selectedAddress) {
    return (
      <div className="checkout-page">
        <p className="no-address">No address found</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-main-title">Checkout</h1>

      <div className="checkout-wrapper">
        <div className="checkout-left">
          <OrderSummeryProductDetils
            cart={cart}
            decreaseQty={decreaseQty}
            increaseQty={increaseQty}
            removeCart={removeCart}
          />
        </div>

        <div className="checkout-right">
          <h2 className="checkout-title">Delivery Address</h2>

          <div className="address-card">
            <div className="address-header">
              <FaMapMarkerAlt className="icon" />
              <h4>{selectedAddress.fullname}</h4>
            </div>

            <p className="address-text">{selectedAddress.address}</p>
            <p className="address-text">
              {selectedAddress.city}, {selectedAddress.state}
            </p>
            <p className="address-text">
              {selectedAddress.country} - {selectedAddress.pincode}
            </p>

            <div className="phone-row">
              <FaPhoneAlt />
              <span>{selectedAddress.phoneNumber}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="confirm-btn-container">
        <button className="confirm-btn" onClick={handlePayment}>
          Proceed To Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
