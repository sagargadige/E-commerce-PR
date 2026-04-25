import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "./Footer";
import Headers from "./Headers";
import {
  API_URL,
  addProductToCart,
  authHeader,
  fallbackImage,
  getApiErrorMessage,
  getCartsFromResponse,
  getLoginUser,
  getProductImage,
  getProductsFromResponse,
} from "../utils/api";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getLoginUser();

  const getId = (value) => {
    return value?._id || value?.id || value;
  };

  const getCartData = async () => {
    try {
      setLoading(true);
      const [cartRes, productRes] = await Promise.all([
        axios.get(`${API_URL}/api/cart`, authHeader()),
        axios.get(`${API_URL}/api/product`),
      ]);

      const products = getProductsFromResponse(productRes);
      const carts = getCartsFromResponse(cartRes).filter((item) => {
        return String(getId(item.user)) === String(user?._id || user?.id);
      });

      const finalCart = carts.map((item) => {
        const productId = getId(item.product);
        const product =
          products.find((val) => String(getId(val)) === String(productId)) ||
          item.product ||
          {};

        return {
          ...item,
          product,
          productId,
        };
      });

      setCartItems(finalCart);
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to load cart"));
    } finally {
      setLoading(false);
    }
  };

  const handleIncrease = async (productId) => {
    try {
      await addProductToCart(productId);
      await getCartData();
      toast.success("Cart updated");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to update cart"));
    }
  };

  const handleDecrease = async (item) => {
    try {
      if (item.qty <= 1) {
        await handleRemove(item._id);
        return;
      }

      await axios.delete(`${API_URL}/api/cart/${item._id}`, authHeader());

      for (let i = 1; i < item.qty; i++) {
        await addProductToCart(item.productId);
      }

      await getCartData();
      toast.success("Cart updated");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to update cart"));
    }
  };

  const handleRemove = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/cart/${id}`, authHeader());
      await getCartData();
      toast.success("Product removed");
    } catch (error) {
      toast.error(getApiErrorMessage(error, "Unable to remove product"));
    }
  };

  const total = cartItems.reduce((sum, item) => {
    return sum + Number(item.product?.price || 0) * Number(item.qty || 1);
  }, 0);

  useEffect(() => {
    getCartData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Headers />
      <section className="cart-page py-5">
        <div className="container">
          <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
            <div>
              <p className="section-kicker mb-1">Your cart</p>
              <h2 className="fw-bold mb-0">Shopping Cart</h2>
            </div>
            <span className="result-count">{cartItems.length} items</span>
          </div>

          {loading ? (
            <div className="empty-box text-center">Loading cart...</div>
          ) : cartItems.length === 0 ? (
            <div className="empty-box text-center">Your cart is empty.</div>
          ) : (
            <div className="row g-4">
              <div className="col-lg-8">
                <div className="cart-list">
                  {cartItems.map((item) => {
                    return (
                      <div className="cart-item" key={item._id}>
                        <img
                          src={getProductImage(item.product)}
                          onError={(e) => {
                            e.currentTarget.src = fallbackImage;
                          }}
                          alt={item.product?.title || "Product"}
                        />
                        <div className="cart-info">
                          <h5>{item.product?.title || "Product unavailable"}</h5>
                          <p className="mb-2">Rs {item.product?.price || 0}</p>
                          <div className="qty-wrap">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleDecrease(item)}
                            >
                              -
                            </button>
                            <span>{item.qty}</span>
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => handleIncrease(item.productId)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="cart-actions">
                          <strong>
                            Rs {Number(item.product?.price || 0) * Number(item.qty || 1)}
                          </strong>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemove(item._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="col-lg-4">
                <div className="summary-box">
                  <h4 className="mb-3">Order Summary</h4>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal</span>
                    <strong>Rs {total}</strong>
                  </div>
                  <div className="d-flex justify-content-between mb-3">
                    <span>Delivery</span>
                    <strong>Free</strong>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between fs-5">
                    <span>Total</span>
                    <strong className="text-primary">Rs {total}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Cart;
