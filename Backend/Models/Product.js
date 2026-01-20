import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: String,
      required: true,
      unique: true
    },

    product_name: {
      type: String,
      required: true,
      trim: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    subcategory: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    discount_price: {
      type: Number
    },

    availability: {
      type: String,
      enum: ["In Stock", "Out of Stock"],
      default: "In Stock"
    },

    qty: {
      type: Number,
      default: 1
    },

    rating: {
      type: Number,
      default: 0
    },

    reviews_count: {
      type: Number,
      default: 0
    },

    warranty: {
      type: Number
    },

    weight: {
      type: Number
    },

    image_url: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Product = mongoose.model("Product", productSchema);
