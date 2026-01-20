import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar/Navbar.jsx";
import RelatedProduct from "../RelatedProducts/RelatedProduct.jsx";
import AppContext from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const ProductDetail = () => {
  const { product_id } = useParams();
  const { addToCart,cart } = useContext(AppContext); // ✅ CONTEXT
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState(STATUS.INITIAL);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductById = async () => {
      setStatus(STATUS.LOADING);
      try {
        const res = await axios.get(
          `http://localhost:8000/api/products/product/${product_id}`,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        setProduct(res.data.product);
        setStatus(STATUS.SUCCESS);
      } catch (error) {
        console.error(error);
        setStatus(STATUS.ERROR);
      }
    };

    fetchProductById();
  }, [product_id]);

  const renderContent = () => {
    switch (status) {
      case STATUS.LOADING:
        return (
          <div className="loader-container">
            <ThreeDots height="60" width="60" color="#2563eb" />
          </div>
        );

      case STATUS.ERROR:
        return <div className="error">Oops! Page not found</div>;

      case STATUS.SUCCESS:
        return (
          <div className="product-detail-card">
            {/* IMAGE */}
            <div className="product-image-section">
              <img src={product.image_url} alt={product.title} />
            </div>

            {/* INFO */}
            <div className="product-info-section">
              <h2 className="product-title">{product.title}</h2>
              <p className="product-subtitle">{product.product_name}</p>

              <p className="description">{product.description}</p>

              <div className="meta-grid">
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Subcategory:</strong> {product.subcategory}</p>
                <p><strong>Availability:</strong> {product.availability}</p>
                <p><strong>Warranty:</strong> {product.warranty} months</p>
                <p><strong>Weight:</strong> {product.weight} kg</p>
              </div>

              <div className="price-section">
                <span className="price">₹{product.price}</span>
                {product.discount_price && (
                  <span className="discount">₹{product.discount_price}</span>
                )}
              </div>

              <div className="rating">
                ⭐ {product.rating} ({product.reviews_count} reviews)
              </div>

              <div className="buttons">
                {cart.length > 0 && <button className="btn-buy-now" onClick={() => navigate('/userAddress')}>Buy Now</button>}

                {/* ✅ ADD TO CART (SAME PAYLOAD AS ShowProduct) */}
                <button
                  className="btn-add-cart"
                  onClick={() =>
                    addToCart({
                      product_id: product.product_id, // CL001
                      qty: 1,
                      title: product.title,
                      product_name: product.product_name,

                      price: product.price,
                      discount_price: product.discount_price,

                      image_url: product.image_url,

                      category: product.category,
                      subcategory: product.subcategory,

                      rating: product.rating,
                      reviews_count: product.reviews_count,

                      availability: product.availability,
                      weight: product.weight,
                      warranty: product.warranty,
                    })
                  }
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <Navbar />
      <div className="product-detail-container">{renderContent()}</div>

      {/* RELATED PRODUCTS */}
      <RelatedProduct
        category={product?.category}
        currentProductId={product?.product_id}
      />
    </div>
  );
};

export default ProductDetail;
