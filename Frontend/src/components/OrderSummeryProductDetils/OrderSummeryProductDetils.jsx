// Frontend/src/components/OrderSummary/OrderSummeryProductDetils.jsx
import React from "react";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import "./OrderSummeryProductDetils.css";

const OrderSummeryProductDetils = ({
    cart = [],
    increaseQty,
    decreaseQty,
    removeCart,
}) => {
    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0
    );

    if (cart.length === 0) {
        return <p className="empty-text">No products in order summary</p>;
    }

    return (
        <div className="order-summary-container">
            <h3 className="order-title">Order Summary</h3>

            {/* DESKTOP TABLE */}
            <div className="table-wrapper">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Qty</th>
                            <th>Total</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {cart.map((item) => (
                            <tr key={item.product_id}>
                                <td>
                                    <img
                                        src={item.image_url}
                                        alt={item.title}
                                        className="product-img"
                                    />
                                </td>
                                <td>{item.title}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    <div className="qty-control">
                                        <button onClick={() => decreaseQty(item.product_id, 1)}>
                                            <CiCircleMinus />
                                        </button>
                                        <span>{item.qty}</span>
                                        <button onClick={() => increaseQty(item.product_id, 1)}>
                                            <CiCirclePlus />
                                        </button>
                                    </div>
                                </td>
                                <td>₹{(item.price * item.qty).toFixed(2)}</td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => {
                                            if (window.confirm("Are you sure to remove this item from cart?")) {
                                                removeCart(item.product_id);
                                            }
                                        }}
                                    >
                                        Remove
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* MOBILE CARDS */}
            <div className="mobile-cards">
                {cart.map((item) => (
                    <div className="order-card" key={item.product_id}>
                        <img src={item.image_url} alt={item.title} />
                        <div className="card-info">
                            <h4>{item.title}</h4>
                            <p>Price: ₹{item.price}</p>

                            <div className="qty-control">
                                <button onClick={() => decreaseQty(item.product_id, 1)}>
                                    <CiCircleMinus />
                                </button>
                                <span>{item.qty}</span>
                                <button onClick={() => increaseQty(item.product_id, 1)}>
                                    <CiCirclePlus />
                                </button>
                            </div>

                            <p className="card-total">
                                Total: ₹{(item.price * item.qty).toFixed(2)}
                            </p>

                            <button
                                className="delete-btn"
                                onClick={() => {
                                    if (window.confirm("Are you sure to remove this item from cart?")) {
                                        removeCart(item.product_id);
                                    }
                                }}
                            >
                                <MdDelete /> Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* FINAL TOTAL */}
            <div className="final-total">
                <span>Total Payable</span>
                <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>
        </div>
    );
};

export default OrderSummeryProductDetils;
