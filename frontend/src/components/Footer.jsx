import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer-wrap">
      <div className="container py-5">
        <div className="row gy-4">
          <div className="col-lg-4">
            <h5 className="mb-2 footer-brand">ShopKart</h5>
            <p className="mb-0 text-muted">
              Fresh products, quick carts, and simple checkout-ready shopping
              for daily needs and festive finds.
            </p>
          </div>
          <div className="col-sm-6 col-lg-2">
            <h6>Shop</h6>
            <Link className="footer-link" to="/">
              Home
            </Link>
            <Link className="footer-link" to="/products">
              Products
            </Link>
            <Link className="footer-link" to="/cart">
              Cart
            </Link>
          </div>
          <div className="col-sm-6 col-lg-3">
            <h6>Categories</h6>
            <Link className="footer-link" to="/products?search=fashion">
              Fashion
            </Link>
            <Link className="footer-link" to="/products?search=beauty">
              Beauty
            </Link>
            <Link className="footer-link" to="/products?search=home">
              Home Decor
            </Link>
          </div>
          <div className="col-lg-3">
            <h6>Support</h6>
            <Link className="footer-link" to="/contact">
              Contact
            </Link>
            <p className="mb-1 text-muted">Ahmedabad, Gujarat</p>
            <p className="mb-0 text-muted">support@shopkart.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
