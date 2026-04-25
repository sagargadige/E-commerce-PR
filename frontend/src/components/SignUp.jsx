import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  API_URL,
  addProductToCart,
  clearPendingCart,
  getPendingCart,
  saveLogin,
} from "../utils/api";

const SignUp = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    hadnleSignup();
  };

  const loginAfterSignup = async () => {
    const loginRes = await axios.post(`${API_URL}/api/user/login`, {
      email: user.email,
      password: user.password,
    });

    saveLogin(loginRes.data.token, loginRes.data.user);
    return loginRes.data.token;
  };

  const hadnleSignup = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/user/signup`, user);

      toast.success(res.data.message);

      const pendingCart = getPendingCart();
      if (pendingCart.productId) {
        const token = await loginAfterSignup();
        await addProductToCart(pendingCart.productId, token);
        clearPendingCart();
        toast.success("Product added to cart");

        setTimeout(() => {
          navigate(pendingCart.redirect);
        }, 1200);
        return;
      }

      setTimeout(() => {
        navigate("/login", { state: { from: location.state?.from || "/" } });
      }, 1200);
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
      console.log(error.message);
    }
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-card p-4">
        <h3 className="text-center mb-4 fw-bold text-primary">
          Create Account
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              onChange={handleChange}
              value={user.name || ""}
              placeholder="Enter your name"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handleChange}
              value={user.email || ""}
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handleChange}
              value={user.password || ""}
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Sign Up
          </button>

          <p className="text-center mt-3 mb-0">
            Already registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
