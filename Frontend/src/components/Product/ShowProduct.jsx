import { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Navbar from "../Navbar/Navbar.jsx";
import "./ShowProduct.css";

const categories = [
  "All",
  "Clothing",
  "Cosmetics",
  "Footwear",
  "Books",
  "Electronics",
  "Furniture",
  "Vegetables",
  "Fashion",
  "Home & Kitchen",
];

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error",
};

const ShowProduct = () => {
  // ✅ addToCart context se liya (NO logic change)
  const { products = [], addToCart } = useContext(AppContext);
  console.log("Products from context:", products);

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [status, setStatus] = useState(STATUS.INITIAL);

  useEffect(() => {
    setStatus(STATUS.LOADING);
    setSearch("");
    if (products.length > 0) {
      setStatus(STATUS.SUCCESS);
    } else {
      setStatus(STATUS.ERROR);
    }
  }, [products, selectedCategory]);

  // 🔍 FILTER LOGIC (UNCHANGED)
  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  const renderContent = () => {
    switch (status) {
      case STATUS.LOADING:
        return (
          <div className="loader-container">
            <ThreeDots height="60" width="60" color="#2563eb" />
          </div>
        );

      case STATUS.ERROR:
        return (
          <div className="status-message error">
            No products found
          </div>
        );

      case STATUS.SUCCESS:
        return (
          <div className="show-product-container">

            {/* CATEGORY SIDEBAR */}
            <aside className="category-container">
              {categories.map((cat, i) => (
                <label
                  key={i}
                  className={`category-item ${selectedCategory === cat ? "active" : ""
                    }`}
                >
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  {cat}
                </label>
              ))}
            </aside>

            {/* CONTENT */}
            <section className="content-container">

              {/* SEARCH */}
              <div className="search-bar-container">
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="search"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>

              {/* PRODUCTS GRID */}
              <div className="row g-4">
                {filteredProducts.map((product) => (
                  <div
                    className="col-sm-6 col-md-4 col-lg-3"
                    key={product.product_id}
                  >
                    <div className="product-card">

                      {/* IMAGE */}
                      <Link
                        to={`/product/${product.product_id}`}
                        className="image-wrapper"
                      >
                        <img
                          src={product.image_url}
                          alt={product.title}
                        />
                        {product.rating > 0 && (
                          <span className="rating-badge">
                            ⭐ {product.rating}
                          </span>
                        )}
                      </Link>

                      {/* INFO */}
                      <div className="product-info">
                        <span className="brand">
                          {product.product_name}
                        </span>

                        <h6 className="title">{product.title}</h6>

                        <div className="price-row">
                          <span className="price">
                            ₹{product.price}
                          </span>

                          {product.discount_price && (
                            <span className="mrp">
                              ₹{product.discount_price}
                            </span>
                          )}
                        </div>

                        <span
                          className={`stock ${product.availability === "In Stock"
                            ? "in"
                            : "out"
                            }`}
                        >
                          {product.availability}
                        </span>

                        {/* ✅ ADD TO CART USING CONTEXT */}
                        <button
                          className="btn btn-primary w-100"
                          onClick={() =>
                            addToCart({
                              productId: product._id,          // ✅ Mongo ObjectId
                              product_id: product.product_id,  // CL001

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
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="status-message">
                  No matching products
                </div>
              )}
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        {renderContent()}
      </div>
    </>
  );
};

export default ShowProduct;
