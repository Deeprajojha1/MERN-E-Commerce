import { Cart } from '../Models/Cart.js';
import { Authenticated } from '../Middlewares/IsAuthenticated.js';

// Add to Cart Controller
export const addToCart = async (req, res) => {
  const { items } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({
        userId: req.user.id,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      });
    }

    items.forEach(item => {
      const {
        productId,
        product_id,
        title,
        product_name,
        category,
        subcategory,
        image_url,
        price,
        discount_price,
        qty,
        rating,
        reviews_count,
        availability,
        weight,
        warranty
      } = item;

      const finalPrice =
        qty * (discount_price ?? price);

      const itemIndex = cart.items.findIndex(
        cartItem => cartItem.product_id.toString() === product_id
      );

      if (itemIndex > -1) {
        // update qty & final price
        cart.items[itemIndex].qty += qty;
        cart.items[itemIndex].final_price += finalPrice;
      } else {
        cart.items.push({
          productId,
          product_id,
          title,
          product_name,
          category,
          subcategory,
          image_url,

          price,
          discount_price,
          final_price: finalPrice,

          rating,
          reviews_count,
          qty,
          availability,
          weight,
          warranty,
        });
      }
    });

    // totals
    // cart.totalItems = cart.items.reduce((a, i) => a + i.qty, 0);
    // cart.totalAmount = cart.items.reduce((a, i) => a + i.final_price, 0);
    cart.updatedAt = new Date();

    await cart.save();

    res.status(200).json({
      message: "Items added to cart successfully",
      cart,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding to cart" });
  }
};

// get user cart
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching cart" });
  }
};


// Remove product from cart
export const removeProductFromCart = async (req, res) => {
  const { product_id } = req.params;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }


    const itemIndex = cart.items.findIndex(
      cartItem => cartItem.product_id.toString() === product_id
    );


    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();

      res.status(200).json({
        message: "Product removed from cart successfully",
        cart
      });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error removing product from cart" });
  }
};


// Clear Cart Controller (to be implemented)
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = [];
    cart.totalItems = 0;
    cart.totalPrice = 0;

    await cart.save();

    res.status(200).json({
      message: "Cart cleared successfully",
      cart
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error clearing cart" });
  }
};


// Decrease quantity
export const decreaseQuantity = async (req, res) => {
  const { product_id, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      cartItem => cartItem.product_id.toString() === product_id
    );

    // ✅ product exist check (very important)
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // ✅ same logic as yours
    if (cart.items[itemIndex].qty > qty) {
      cart.items[itemIndex].qty -= qty;
    } else {
      cart.items.splice(itemIndex, 1); // qty 0 ya negative
    }

    await cart.save();

    res.status(200).json({
      message: "Item quantity decreased successfully",
      cart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error decreasing cart item quantity"
    });
  }
};

// Increase quantity
// Increase quantity
export const increaseQuantity = async (req, res) => {
  const { product_id, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      item => item.product_id === product_id
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].qty += qty; // ALWAYS increase
    } else {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    await cart.save();

    res.status(200).json({
      message: "Item quantity increased successfully",
      cart
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error increasing quantity" });
  }
};


