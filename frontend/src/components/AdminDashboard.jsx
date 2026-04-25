import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Footer from "./Footer";
import Headers from "./Headers";
import {
  API_URL,
  authHeader,
  fallbackImage,
  getCartsFromResponse,
  getProductImage,
  getProductsFromResponse,
} from "../utils/api";

const AdminDashboard = () => {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [updateId, setUpdateId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/product`);
      const data = getProductsFromResponse(res);
      setProducts(data);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to load products");
    }
  };

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/category`, authHeader());
      setCategorys(res.data.info || res.data.categorys || []);
    } catch {
      setCategorys([]);
    }
  };

  const getTotalUsers = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/user`, authHeader());
      const users = res.data.users || res.data.data || [];
      setTotalUsers(res.data.totalUsers || users.length);
    } catch {
      try {
        const cartRes = await axios.get(`${API_URL}/api/cart`, authHeader());
        const carts = getCartsFromResponse(cartRes);
        const users = new Set(
          carts.map((item) => item.user?._id || item.user).filter(Boolean)
        );
        setTotalUsers(users.size);
      } catch {
        setTotalUsers(0);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateId) {
      updateProduct();
    } else {
      createProduct();
    }
  };

  const getPayload = () => {
    const payload = {
      ...product,
      price: Number(product.price),
    };

    if (!payload.category) {
      delete payload.category;
    }

    if (payload.image) {
      payload.image = payload.image.trim();
    } else {
      delete payload.image;
    }

    delete payload._id;
    delete payload.__v;
    return payload;
  };

  const resetForm = () => {
    setProduct({});
    setUpdateId("");
  };

  const createProduct = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/product`,
        getPayload(),
        authHeader()
      );
      toast.success(res.data.message || "Product created");
      resetForm();
      getAllProduct();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to create product");
    }
  };

  const updateProduct = async () => {
    try {
      const res = await axios.patch(
        `${API_URL}/api/product/${updateId}`,
        getPayload(),
        authHeader()
      );
      toast.success(res.data.message || "Product updated");
      resetForm();
      getAllProduct();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to update product");
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/api/product/${id}`, authHeader());
      toast.success(res.data.message || "Product deleted");
      getAllProduct();
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to delete product");
    }
  };

  const editProduct = (item) => {
    setUpdateId(item._id);
    setProduct({
      title: item.title || "",
      price: item.price || "",
      category: item.category?._id || item.category || "",
      image: item.image || "",
      description: item.description || "",
    });
    document.getElementById("create")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getAllProduct();
    getAllCategory();
    getTotalUsers();
  }, []);

  return (
    <div>
      <Headers />
      <section className="admin-page">
        <div className="admin-sidebar">
          <h4 className="mb-4">Admin</h4>
          <a href="#overview">Overview</a>
          <a href="#create">Create Product</a>
          <a href="#products">Products</a>
        </div>

        <div className="admin-content">
          <div id="overview" className="row g-4 mb-4">
            <div className="col-md-6">
              <div className="stat-box">
                <span>Total Products</span>
                <strong>{products.length}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="stat-box">
                <span>Total Users</span>
                <strong>{totalUsers}</strong>
              </div>
            </div>
          </div>

          <div id="create" className="admin-panel mb-4">
            <h4 className="mb-3">
              {updateId ? "Update Product" : "Create Product"}
            </h4>
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Title</label>
                  <input
                    name="title"
                    value={product.title || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Product title"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Price</label>
                  <input
                    name="price"
                    value={product.price || ""}
                    onChange={handleChange}
                    type="number"
                    className="form-control"
                    placeholder="Product price"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  {categorys.length > 0 ? (
                    <select
                      name="category"
                      value={product.category || ""}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Select category</option>
                      {categorys.map((cat) => {
                        return (
                          <option value={cat._id} key={cat._id}>
                            {cat.name}
                          </option>
                        );
                      })}
                    </select>
                  ) : (
                    <input
                      name="category"
                      value={product.category || ""}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Category id"
                    />
                  )}
                </div>
                <div className="col-md-6">
                  <label className="form-label">Image URL / Path</label>
                  <input
                    name="image"
                    value={product.image || ""}
                    onChange={handleChange}
                    className="form-control"
                    placeholder="https://example.com/product.jpg"
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Description</label>
                  <textarea
                    name="description"
                    value={product.description || ""}
                    onChange={handleChange}
                    className="form-control"
                    rows="4"
                    placeholder="Product description"
                  ></textarea>
                </div>
                <div className="col-12">
                  <button className="btn btn-primary" type="submit">
                    {updateId ? "Update Product" : "Create Product"}
                  </button>
                  {updateId && (
                    <button
                      className="btn btn-outline-secondary ms-2"
                      type="button"
                      onClick={resetForm}
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div id="products" className="admin-panel">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">Products</h4>
              <span className="result-count">{products.length} total</span>
            </div>
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td>
                          <div className="admin-product">
                            <img
                              src={getProductImage(item)}
                              onError={(e) => {
                                e.currentTarget.src = fallbackImage;
                              }}
                              alt={item.title}
                            />
                            <div>
                              <strong>{item.title}</strong>
                              <p className="mb-0 text-muted">
                                {(item.description || "")
                                  .split(" ")
                                  .slice(0, 8)
                                  .join(" ")}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>Rs {item.price}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-outline-primary btn-sm"
                              onClick={() => editProduct(item)}
                            >
                              Update
                            </button>
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => deleteProduct(item._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
