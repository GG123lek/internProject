import React from "react";
import { useLocation } from "react-router-dom";

const QualityProductPage = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Retrieve the product from location state

  return (
    <div className="quality-product">
      <h1 className="text-3xl font-bold">Quality Product</h1>
      {product ? (
        <div className="product-detail">
          <img
            src={product.img}
            alt={product.title}
            className="max-w-[140px] mx-auto"
          />
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>₦{product.price.toLocaleString()}</p>
        </div>
      ) : (
        <p>No product found!</p>
      )}
    </div>
  );
};

export default QualityProductPage;
