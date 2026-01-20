import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AppContext from "../../Context/AppContext";
import "./UserAddress.css";

const UserAddress = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        address: "",
        city: "",
        state: "",
        country: "",
        pincode: "",
        phoneNumber: "",
    });
    const navigate = useNavigate();
    const { addAddress, addresses } = React.useContext(AppContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Address Submitted:", formData);
        // Here you can add the logic to send formData to the backend server
        addAddress(formData);
        setFormData({
            fullname: "",
            address: "",
            city: "",
            state: "",
            country: "",
            pincode: "",
            phoneNumber: "",
        });
    };

    return (
        <div className="address-page">
            <div className="address-card">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <FaArrowLeft /> Back
                </button>
                <h2>Add Delivery Address</h2>
                <p className="subtitle">Used for order delivery</p>

                <form onSubmit={handleSubmit} className="address-form">
                    <input
                        type="text"
                        name="fullname"
                        placeholder="Full Name"
                        value={formData.fullname}
                        onChange={handleChange}
                        required
                    />

                    <textarea
                        name="address"
                        placeholder="Street address, House no."
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <div className="grid-2">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="state"
                            placeholder="State"
                            value={formData.state}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="grid-2">
                        <input
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData.country}
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="pincode"
                            placeholder="Pincode"
                            value={formData.pincode}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit" className="save-btn" onClick={() => navigate('/checkout')}>
                        Submit
                    </button>
                    {
                        addresses && <button type="submit" className="save-btn btn-warning" onClick={() => navigate('/checkout')}>
                            Also have an address
                        </button>
                    }

                </form>
            </div>
        </div>
    );
};

export default UserAddress;
