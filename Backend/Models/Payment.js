import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Store items
    orderId: {
      type: String
    },
    paymentId: {
      type: String
    },

    orderItems: [
      {
        product_id: String,
        title: String,
        image_url: String,
        price: Number,
        qty: Number,
      },
    ],

    // Optional: store shipping address
    userShipping: {
      fullname: String,
      email: String,
      phoneNumber: String,
      address: String,
      city: String,
      state: String,
      country: String,
      pincode: String,
    },

    razorpay_order_id: String,
    razorpay_payment_id: String,
    razorpay_signature: String,

    amount: Number,
    currency: { type: String, default: "INR" },

    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
