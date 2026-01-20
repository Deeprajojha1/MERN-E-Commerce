// Frontend/src/Context/AppState.jsx
import appContext from "./AppContext";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export const AppState = (props) => {
  const [products, setProducts] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // TOKEN FROM localStorage
  const token = localStorage.getItem("token");

  /* ===================== FETCH PRODUCTS ===================== */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/products/all",
          { headers: { "Content-Type": "application/json" } }
        );

        const productArray = res.data?.[0]?.products;
        setProducts(Array.isArray(productArray) ? productArray : []);
        // 🔕 Optional toast (commented to avoid spam)
        // toast.success("✅ Products loaded", { autoClose: 1500, transition: Bounce });
      } catch (error) {
        console.error("Product fetch error:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  /* ===================== FETCH CART ===================== */
  useEffect(() => {
    if (!token) {
      setCart([]);
      return;
    }

    let userId;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.userId;
    } catch (err) {
      console.error("Token decode error:", err);
      setCart([]);
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/cart/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setCart(res.data?.items || []);
        // 🔕 Optional toast
        // toast.success("🛒 Cart loaded", { autoClose: 1500, transition: Bounce });
      } catch (error) {
        console.error("Cart fetch error:", error);
        setCart([]);
      }
    };

    fetchCart();
  }, [token]);

  /* ===================== FETCH ADDRESSES ===================== */
  useEffect(() => {
    if (!token) {
      setAddresses([]);
      return;
    }

    const fetchAddresses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/addresses/user-addresses",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setAddresses(res.data);
        console.log("Fetched addresses:", res.data);
        console.log("Current addresses state:", addresses);
      } catch (error) {
        console.error("Address fetch error:", error);
        setAddresses([]);
      }
    };

    fetchAddresses();
  }, [token]);

  /* ===================== ADD TO CART ===================== */
  const addToCart = async (item) => {
    if (!token) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/cart/add",
        {
          items: [
            {
              productId: item.productId,
              product_id: item.product_id,
              title: item.title,
              product_name: item.product_name,
              category: item.category,
              subcategory: item.subcategory,
              image_url: item.image_url,
              price: item.price,
              discount_price: item.discount_price,
              qty: item.qty || 1,
              rating: item.rating || 0,
              reviews_count: item.reviews_count || 0,
              availability: item.availability || "In Stock",
              weight: item.weight,
              warranty: item.warranty,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart.items);

      toast.success("🛒 Added to cart", {
        autoClose: 1500,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Add to cart error:", error);
    }
  };

  /* ===================== DECREASE QTY ===================== */
  const decreaseQty = async (product_id, qty) => {
    if (!token) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/cart/decreaseQty",
        { product_id, qty },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart.items);

      toast.success("➖ Quantity updated", {
        autoClose: 1200,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Decrease qty error:", error);
    }
  };

  /* ===================== INCREASE QTY ===================== */
  const increaseQty = async (product_id, qty) => {
    if (!token) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/cart/increaseQty",
        { product_id, qty },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart.items);

      toast.success("➕ Quantity updated", {
        autoClose: 1200,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Increase qty error:", error);
    }
  };

  /* ===================== REMOVE ITEM ===================== */
  const removeCart = async (product_id) => {
    if (!token) return;

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/cart/remove/${product_id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart(res.data.cart.items);

      toast.success("🗑️ Item removed", {
        autoClose: 1500,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Remove cart error:", error);
    }
  };

  /* ===================== CLEAR CART ===================== */
  const clearCart = async () => {
    if (!token) return;

    let userId;
    try {
      const decoded = JSON.parse(atob(token.split(".")[1]));
      userId = decoded.userId;
    } catch {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:8000/api/cart/clear/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCart([]);

      toast.success("🧹 Cart cleared", {
        autoClose: 1500,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Clear cart error:", error);
    }
  };

  /* ===================== ADD ADDRESS ===================== */
  const addAddress = async (addressData) => {
    if (!token) return;

    try {
      const res = await axios.post(
        "http://localhost:8000/api/addresses/add-address",
        addressData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAddresses((prev) => [...prev, res.data.address]);

      toast.success("🏠 Address added", {
        autoClose: 1500,
        transition: Bounce,
      });
    } catch (error) {
      console.error("Add address error:", error);
      toast.error("🏠 Failed to add address", {
        autoClose: 1500,
        transition: Bounce,
      });
    }
  };

  return (
    <appContext.Provider
      value={{
        products,
        cart,
        addresses,
        isLoading,
        token,
        addToCart,
        decreaseQty,
        increaseQty,
        removeCart,
        clearCart,
        addAddress,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default AppState;
