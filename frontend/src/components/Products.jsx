import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";
import Headers from "./Headers";
import ProductCard from "./ProductCard";
import { API_URL, authHeader, getProductsFromResponse } from "../utils/api";

const normalizeCategory = (value) => {
  return String(value || "").trim().toLowerCase();
};

const CATEGORY_CACHE_KEY = "shopkart-category-cache";

const fallbackBackendCategories = [
  { _id: "69e4b884c443cf568891eb51", name: "fashion" },
  { _id: "69e4b892c443cf568891eb52", name: "footwear" },
  { _id: "69e4b8a0c443cf568891eb53", name: "Electronics" },
  { _id: "69e4b8abc443cf568891eb54", name: "Home & Furniture" },
  { _id: "69e4b8b6c443cf568891eb55", name: "Beauty" },
  { _id: "69e4b8c0c443cf568891eb56", name: "Groceries" },
  { _id: "69e4b8c7c443cf568891eb57", name: "Sports" },
];

const getCategoryListFromResponse = (res) => {
  const data = res?.data;
  const categoryList =
    data?.info ||
    data?.categorys ||
    data?.categories ||
    data?.data ||
    data?.category;

  return Array.isArray(categoryList) ? categoryList : [];
};

const getCachedCategories = () => {
  try {
    const storedCategories = JSON.parse(localStorage.getItem(CATEGORY_CACHE_KEY));
    return Array.isArray(storedCategories) ? storedCategories : [];
  } catch {
    return [];
  }
};

const saveCachedCategories = (categories) => {
  localStorage.setItem(CATEGORY_CACHE_KEY, JSON.stringify(categories));
};

const getCategoryId = (category) => {
  return normalizeCategory(category?._id || category?.id || category);
};

const getCategoryName = (category) => {
  return String(category?.name || category?.title || category || "").trim();
};

const getProductCategoryValues = (product) => {
  const category = product?.category;
  const values = [
    category?._id,
    category?.id,
    category?.name,
    typeof category === "string" ? category : "",
    product?.categoryName,
    product?.type,
  ];

  return values.map(normalizeCategory).filter(Boolean);
};

const Products = () => {
  const [filter, setFilter] = useState({});
  const [categorys, setCategorys] = useState([]);
  const [allCategorys, setAllCategorys] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [productLoading, setProductLoading] = useState(false);
  const [list, setList] = useState([]);
  const [searchParams] = useSearchParams();

  const handleChange = (e) => {
    let { name, value, checked } = e.target;
    if (name == "categorys") {
      let newCategorys = [...categorys];
      if (checked) {
        newCategorys.push(value);
      } else {
        newCategorys = newCategorys.filter((val) => val != value);
      }
      value = newCategorys;
      setCategorys(newCategorys);
    }
    setFilter({ ...filter, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(filter);
  };

  const clearFilter = () => {
    setFilter({});
    setCategorys([]);
  };

  const getAllProduct = async () => {
    setProductLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/product`);
      let data = getProductsFromResponse(res);
      setList(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setProductLoading(false);
    }
  };

  const getAllCategory = async () => {
    const token = localStorage.getItem("token");
    const cachedCategories = getCachedCategories();
    const defaultCategories =
      cachedCategories.length > 0 ? cachedCategories : fallbackBackendCategories;

    if (!token) {
      setAllCategorys(defaultCategories);
      return;
    }

    setCategoryLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/category`, authHeader(token));
      const categories = getCategoryListFromResponse(res);

      if (categories.length > 0) {
        setAllCategorys(categories);
        saveCachedCategories(categories);
      } else {
        setAllCategorys(defaultCategories);
      }
    } catch (error) {
      console.log(error.response?.data || error.message);
      setAllCategorys(defaultCategories);
    } finally {
      setCategoryLoading(false);
    }
  };

  const categoryOptions = useMemo(() => {
    const optionsByValue = new Map();

    allCategorys.forEach((category) => {
      const option = {
        value: getCategoryId(category),
        label: getCategoryName(category),
      };

      if (option.value && option.label) {
        optionsByValue.set(option.value, option);
      }
    });

    return Array.from(optionsByValue.values());
  }, [allCategorys]);

  const filteredProducts = useMemo(() => {
    let data = [...list];

    if (filter.search) {
      const search = filter.search.toLowerCase();
      data = data.filter((product) => {
        return (
          product?.title?.toLowerCase().includes(search) ||
          product?.description?.toLowerCase().includes(search)
        );
      });
    }

    if (categorys.length > 0) {
      data = data.filter((product) => {
        const productCategorys = getProductCategoryValues(product);

        return categorys.some((category) => {
          return productCategorys.includes(category);
        });
      });
    }

    if (filter.min) {
      data = data.filter((product) => Number(product.price) >= Number(filter.min));
    }

    if (filter.max) {
      data = data.filter((product) => Number(product.price) <= Number(filter.max));
    }

    return data;
  }, [filter, categorys, list]);

  useEffect(() => {
    getAllProduct();
    getAllCategory();
  }, []);

  useEffect(() => {
    const search = searchParams.get("search");
    if (search) {
      setFilter((prev) => ({ ...prev, search }));
    }
  }, [searchParams]);

  return (
    <div>
      <Headers />
      <section className="products-hero">
        <div className="container">
          <p className="section-kicker mb-1">All products</p>
          <h1>Find your next favorite buy</h1>
          <p>
            Search, filter, and add fashion, beauty, home, and everyday picks
            straight to your cart.
          </p>
        </div>
      </section>

      <section className="products-page py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-3 mb-4">
              <div className="filter-card p-4">
                <h5 className="fw-bold mb-4 text-primary">Filters</h5>

                <form method="post" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Search</label>
                    <input
                      name="search"
                      onChange={handleChange}
                      value={filter.search || ""}
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Search products..."
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Category</label>

                    {categoryLoading || productLoading ? (
                      <p className="text-muted small mb-0">Loading categories...</p>
                    ) : categoryOptions.length > 0 ? (
                      categoryOptions.map((item, index) => {
                        return (
                          <div className="form-check mb-2" key={item.value}>
                            <input
                              name="categorys"
                              value={item.value}
                              onChange={handleChange}
                              checked={categorys.includes(item.value)}
                              className="form-check-input"
                              type="checkbox"
                              id={`cat${index}`}
                            />
                            <label className="form-check-label" htmlFor={`cat${index}`}>
                              {item.label}
                            </label>
                          </div>
                        );
                      })
                    ) : (
                      <p className="text-muted small mb-0">No categories found.</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Price Range</label>

                    <div className="input-group">
                      <span className="input-group-text">Rs</span>
                      <input
                        name="min"
                        value={filter.min || ""}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        placeholder="Min"
                      />
                      <input
                        name="max"
                        value={filter.max || ""}
                        onChange={handleChange}
                        type="number"
                        className="form-control"
                        placeholder="Max"
                      />
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    <button type="submit" className="btn btn-primary btn-lg">
                      Apply Filters
                    </button>

                    <button
                      type="button"
                      onClick={clearFilter}
                      className="btn btn-outline-secondary"
                    >
                      Clear All
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
                <div>
                  <p className="section-kicker mb-1">Products</p>
                  <h2 className="fw-bold mb-0">Fresh picks for you</h2>
                </div>
                <span className="result-count">
                  {filteredProducts.length} products found
                </span>
              </div>
              {categoryOptions.length > 0 && (
                <div className="quick-pills mb-4">
                  {categoryOptions.map((item) => {
                    return (
                      <button
                        type="button"
                        className="quick-pill"
                        key={item.value}
                        onClick={() => {
                          setCategorys([item.value]);
                          setFilter((prev) => ({ ...prev, categorys: [item.value] }));
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              )}
              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => {
                    return (
                      <div className="col-sm-6 col-xl-4" key={product._id}>
                        <ProductCard product={product} />
                      </div>
                    );
                  })
                ) : (
                  <div className="col-12">
                    <div className="empty-box text-center">
                      No products matched your filters.
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Products;
