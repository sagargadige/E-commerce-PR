import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getLoginUser, logoutUser } from "../utils/api";

const Headers = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const user = getLoginUser();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/products?search=${encodeURIComponent(search.trim())}`);
    } else {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="site-header">
      <nav className="navbar navbar-expand-lg bg-white site-navbar">
        <div className="container nav-shell">
          <Link className="navbar-brand fw-bold" to="/">
            <span className="brand-mark">SK</span>
            <span>ShopKart</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex header-search" role="search" onSubmit={handleSearch}>
              <input
                className="form-control"
                type="search"
                placeholder="Try saree, sneakers, skincare"
                aria-label="Search products"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn btn-primary" type="submit">
                Search
              </button>
            </form>

            <ul className="navbar-nav ms-lg-auto mb-2 mb-lg-0 align-items-lg-center">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cart">
                  Cart
                </Link>
              </li>
              {user?.role === "admin" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin
                  </Link>
                </li>
              )}
            </ul>
            <div className="d-flex gap-2 ms-lg-3 mt-3 mt-lg-0 header-account">
              {user ? (
                <>
                  <span className="user-chip">
                    Hi, {user?.name || user?.email || "Shopper"}
                  </span>
                  <button className="btn btn-primary" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="btn btn-outline-primary" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-primary" to="/signup">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="category-menu">
        <div className="container category-scroll">
          <Link to="/products">Category</Link>
        </div>
      </div>
    </header>
  );
};

export default Headers;
