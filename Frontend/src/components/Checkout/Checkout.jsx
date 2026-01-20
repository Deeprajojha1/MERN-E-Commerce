// Frontend/src/components/Checkout/Checkout.jsx
import React, { useContext } from "react";
import AppContext from "../../Context/AppContext";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import OrderSummeryProductDetils from "../OrderSummeryProductDetils/OrderSummeryProductDetils";
import "./Checkout.css";

const Checkout = () => {
  const { addresses, cart, decreaseQty, increaseQty, removeCart } =
    useContext(AppContext);

  if (!addresses) {
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
        {/* LEFT : ORDER SUMMARY */}
        <div className="checkout-left">
          <OrderSummeryProductDetils
            cart={cart}
            decreaseQty={decreaseQty}
            increaseQty={increaseQty}
            removeCart={removeCart}
          />
        </div>

        {/* RIGHT : ADDRESS */}
        <div className="checkout-right">
          <h2 className="checkout-title">Delivery Address</h2>

          <div className="address-card ">
            <div className="address-header">
              <FaMapMarkerAlt className="icon" />
              <h4>{addresses.fullname}</h4>
            </div>

            <p className="address-text">{addresses.address}</p>
            <p className="address-text">
              {addresses.city}, {addresses.state}
            </p>
            <p className="address-text">
              {addresses.country} - {addresses.pincode}
            </p>

            <div className="phone-row">
              <FaPhoneAlt />
              <span>{addresses.phoneNumber}</span>
            </div>

             </div>
        </div>
      </div>
      <div className="confirm-btn-container">
      <button className="confirm-btn">
              Procced To Pay
         </button>
         </div>
    </div>
  );
};

export default Checkout;
