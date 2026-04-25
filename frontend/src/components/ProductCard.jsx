import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addProductToCart,
  fallbackImage,
  getApiErrorMessage,
  getProductId,
  getProductImage,
  savePendingCart,
} from "../utils/api";

const ProductCard = ({ product, onAdded }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const productId = getProductId(product);
  const price = Number(product?.price || 0);
  const oldPrice = price ? Math.round(price * 1.32) : 0;
  const category =
    product?.category?.name || product?.categoryName || product?.type || "Daily pick";

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      savePendingCart(productId, "/cart");
      toast.info("Please login to add this product.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }

    try {
      const res = await addProductToCart(productId, token);
      toast.success(res.data.message || "Product added to cart");
      if (onAdded) {
        onAdded();
      }
    } catch (error) {
      const message = getApiErrorMessage(error, "Please login again");
      toast.error(message);
      if (error.response?.status === 401) {
        savePendingCart(productId, "/cart");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { state: { from: location.pathname } });
      }
    }
  };

  return (
    <div className="product-card h-100">
      <div className="product-image-wrap">
        <img
          src={getProductImage(product)}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="product-img"
          alt={product?.title || "Product"}
        />
        <span className="product-badge">Free Delivery</span>
      </div>
      <div className="card-body d-flex flex-column">
        <span className="product-category">{category}</span>
        <h5 className="card-title product-title">{product?.title}</h5>
        <div className="product-price-row">
          <span className="product-price">Rs {product?.price}</span>
          {oldPrice > price && <span className="product-mrp">Rs {oldPrice}</span>}
        </div>
        <p className="card-text product-desc">
          {(product?.description || "").split(" ").slice(0, 12).join(" ")}
        </p>
        <div className="product-meta">
          <span>4.4 rating</span>
          <span>COD</span>
        </div>
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn btn-primary mt-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
