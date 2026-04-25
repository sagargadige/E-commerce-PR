import axios from "axios";
import { useState } from "react";
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

const Login = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/user/login`, user);

      console.log(res);
      toast.success(res.data.message);
      saveLogin(res.data.token, res.data.user);

      const pendingCart = getPendingCart();
      if (pendingCart.productId) {
        await addProductToCart(pendingCart.productId, res.data.token);
        clearPendingCart();
        toast.success("Product added to cart");
      }

      const redirect = pendingCart.productId
        ? pendingCart.redirect
        : location.state?.from || "/";

      setTimeout(() => {
        navigate(redirect);
      }, 1200);
    } catch (error) {
      console.log(error.message);
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed";
      toast.error(message);

      if (message.toLowerCase().includes("user not found")) {
        setTimeout(() => {
          navigate("/signup", { state: { from: location.state?.from || "/" } });
        }, 1200);
      }
    }
  };

  return (
    <div className="auth-page d-flex justify-content-center align-items-center">
      <div className="auth-card p-4">
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={user.email || ""}
              className="form-control"
              placeholder="Enter email"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              value={user.password || ""}
              type="password"
              onChange={handleChange}
              className="form-control"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>

          <p className="text-center mt-3 mb-0">
            New customer? <Link to="/signup">Create account</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
