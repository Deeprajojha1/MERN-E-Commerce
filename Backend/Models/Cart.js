import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    // Product reference
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: false,
    },

    //  Product snapshot (order ke time change na ho)
    product_id: { type: String, required: true }, // CL001
    title: { type: String, required: true },
    product_name: { type: String },
    category: { type: String },
    subcategory: { type: String },

    image_url: { type: String, required: true },

    // Pricing
    price: { type: Number, required: true },
    discount_price: { type: Number },
    final_price: { type: Number, required: true }, // qty * price

    // Meta
    rating: { type: Number, default: 0 },
    reviews_count: { type: Number, default: 0 },

    // Quantity
    qty: { type: Number, default: 1, min: 1 },

    // Stock snapshot
    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock",
    },

    weight: { type: Number }, // shipping ke liye
    warranty: { type: Number }, // months
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // One cart per user
    },

    items: [cartItemSchema],

    // // Cart totals
    // totalItems: { type: Number, default: 0 },
    // totalAmount: { type: Number, default: 0 },

    // 🕒
    updatedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
