import axios from "axios";
import { getProductImageUrl } from "./productImages.js";

export const API_URL = "http://localhost:3200";

export const authHeader = (token = localStorage.getItem("token")) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getLoginUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user")) || null;
  } catch {
    return null;
  }
};

export const saveLogin = (token, user) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const getProductsFromResponse = (res) => {
  return res?.data?.products || res?.data?.data || [];
};

export const getCartsFromResponse = (res) => {
  return res?.data?.carts || res?.data?.data || [];
};

export const getProductId = (product) => {
  return product?._id || product?.id;
};

export const getProductImage = (product) => {
  // First, try to get mapped image based on category or title
  const category =
    product?.category?.name || product?.categoryName || product?.type;
  const title = product?.title;
  const mappedImage = getProductImageUrl(category, title);

  if (mappedImage) {
    return mappedImage;
  }

  // Then try product's own image field
  const image =
    product?.image ||
    product?.img ||
    product?.productImage ||
    product?.imagePath ||
    product?.thumbnail;

  if (!image) {
    return fallbackImage;
  }

  const imageUrl = String(image).trim();

  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl;
  }

  return `${API_URL}/${imageUrl.replace(/^\/+/, "")}`;
};

export const fallbackImage =
  "https://placehold.co/600x700/fdf2f8/b0185b?text=ShopKart";

export const addProductToCart = (
  productId,
  token = localStorage.getItem("token"),
) => {
  return axios.post(
    `${API_URL}/api/cart`,
    { product: productId },
    authHeader(token),
  );
};

export const savePendingCart = (productId, redirect = "/cart") => {
  localStorage.setItem("pendingCartProduct", productId);
  localStorage.setItem("pendingCartRedirect", redirect);
};

export const getPendingCart = () => {
  return {
    productId: localStorage.getItem("pendingCartProduct"),
    redirect: localStorage.getItem("pendingCartRedirect") || "/cart",
  };
};

export const clearPendingCart = () => {
  localStorage.removeItem("pendingCartProduct");
  localStorage.removeItem("pendingCartRedirect");
};
