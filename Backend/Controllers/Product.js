import { Product } from "../Models/Product.js";

/* =========================
   ADD PRODUCT
========================= */
export const addProduct = async (req, res) => {
  const {
    product_id,
    product_name,
    title,
    description,
    category,
    subcategory,
    price,
    discount_price,
    availability,
    qty,
    rating,
    reviews_count,
    warranty,
    weight,
    image_url
  } = req.body;

  try {
    const product = new Product({
      product_id,
      product_name,
      title,
      description,
      category,
      subcategory,
      price,
      discount_price,
      availability,
      qty,
      rating,
      reviews_count,
      warranty,
      weight,
      image_url
    });

    await product.save();

    res.status(201).json({
      message: "Product added successfully",
      product
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Error adding product" });
  }
};

/* =========================
   GET ALL PRODUCTS
========================= */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

/* =========================
   GET PRODUCT BY ID
========================= */
// Get product by product_id (NOT Mongo _id)
export const getProductByProductId = async (req, res) => {
  try {
    const { product_id } = req.params;

    const result = await Product.aggregate([
      { $unwind: "$products" },
      { $match: { "products.product_id": product_id } },
      {
        $project: {
          _id: 0,
          product: "$products"
        }
      }
    ]);

    if (result.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ product: result[0].product });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};






/* =========================
   UPDATE PRODUCT
========================= */
export const updateProduct = async (req, res) => {
  const { id } = req.params;

  const {
    product_id,
    product_name,
    title,
    description,
    category,
    subcategory,
    price,
    discount_price,
    availability,
    qty,
    rating,
    reviews_count,
    warranty,
    weight,
    image_url
  } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      id,
      {
        product_id,
        product_name,
        title,
        description,
        category,
        subcategory,
        price,
        discount_price,
        availability,
        qty,
        rating,
        reviews_count,
        warranty,
        weight,
        image_url
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

/* =========================
   DELETE PRODUCT
========================= */
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
