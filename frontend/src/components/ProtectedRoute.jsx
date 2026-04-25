import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getLoginUser } from "../utils/api";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const user = getLoginUser();

  if (!token) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (adminOnly && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
