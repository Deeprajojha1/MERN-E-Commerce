import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../Context/AppContext.jsx";
import { Link } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import "./RelatedProduct.css";

const STATUS = {
  INITIAL: "initial",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR: "error"
};

const RelatedProduct = ({ category, currentProductId }) => {
  const { products } = useContext(AppContext);
  const [status, setStatus] = useState(STATUS.INITIAL);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    setStatus(STATUS.LOADING);

    if (!category || !products?.length) {
      setStatus(STATUS.ERROR);
      return;
    }

    const filtered = products.filter(
      (product) =>
        product.category === category &&
        product.product_id !== currentProductId
    );

    setRelatedProducts(filtered);
    setStatus(STATUS.SUCCESS);
  }, [products, category, currentProductId]);

  const renderContent = () => {
    switch (status) {
      case STATUS.LOADING:
        return (
          <div className="loader-container">
            <ThreeDots height="50" width="50" color="#2563eb" />
          </div>
        );

      case STATUS.ERROR:
        return <p className="related-error">No related products</p>;

      case STATUS.SUCCESS:
        if (relatedProducts.length === 0) {
          return <p className="related-no-products">No related products found</p>;
        }

        return (
          <div className="related-products-grid">
            {relatedProducts.map((product) => (
              <Link
                to={`/product/${product.product_id}`}
                key={product._id}
                className="related-card"
              >
                <div className="related-img">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>

                <div className="related-info">
                  <h6>{product.title}</h6>
                  <p className="price">₹{product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="related-products">
      <h4 className="related-heading">Related Products</h4>
      {renderContent()}
    </section>
  );
};

export default RelatedProduct;
