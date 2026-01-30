import Razorpay from "razorpay";
import crypto from "crypto";
import { Order } from "../Models/Payment.js";
import dotenv from "dotenv";
// import crypto from "crypto";
// import { Payment } from "../Models/Payment.js";

dotenv.config({ path: "./config/config.env" });
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const checkout = async (req, res) => {
  try {
    console.log("Checkout request received:", req.body); // Debug log
    
    const { amount, cartItems, userShipping, userId } = req.body;

    if (!amount || !cartItems || !userShipping || !userId) {
      console.error("Missing required fields in checkout");
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const options = {
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `order_${Date.now()}`,
      payment_capture: 1
    };

    console.log("Creating Razorpay order with options:", options); // Debug log

    const order = await razorpayInstance.orders.create(options);
    
    console.log("Razorpay order created:", order.id); // Debug log

    res.json({
      success: true,
      orderId: order.id,
      amount: amount,
      cartItems,
      userShipping,
      userId,
      payStatus: 'created'
    });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};


export const verify = async (req, res) => {
  try {
    const {
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping
    } = req.body;

    // Validate required fields
    if (!orderId || !paymentId || !signature || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing required payment details"
      });
    }

    // Verify the payment signature
    const body = orderId + "|" + paymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature"
      });
    }

    // Create order in database
    const order = new Order({
      orderId,
      paymentId,
      signature,
      amount,
      orderItems,
      userId,
      userShipping,
      status: "paid",
      paymentStatus: "completed"
    });

    await order.save();

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      order
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: "Error verifying payment",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// get userOrders
export const getUserOrders = async (req, res) => {
  try {
   const userId=req.user._id;
   console.log(userId)
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "UserId is required ❌",
      });
    }

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 }); // latest first

    return res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.log("Get User Orders Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error ❌",
      error: error.message,
    });
  }
};