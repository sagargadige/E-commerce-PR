import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import Headers from "./Headers";
import ProductCard from "./ProductCard";
import { API_URL, getProductsFromResponse } from "../utils/api";

const heroSlides = [
  {
    eyebrow: "Smart Shopping",
    title: "Fresh styles at everyday prices",
    text: "Fashion, beauty, home, electronics, and daily finds picked for quick carts.",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1800&q=80",
    cta: "Shop Now",
    link: "/products",
  },
  {
    eyebrow: "Festive Deals",
    title: "Ethnic looks made easy",
    text: "Explore colorful sarees, kurtis, jewellery, and footwear for every plan.",
    image:
      "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1800&q=80",
    cta: "Explore Fashion",
    link: "/products?search=fashion",
  },
  {
    eyebrow: "Home Refresh",
    title: "Small upgrades, big mood",
    text: "Decor, storage, kitchen helpers, and beauty essentials with value-first pricing.",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1800&q=80",
    cta: "Browse Deals",
    link: "/products?search=home",
  },
];

const trustBadges = [
  { title: "7 Days Easy Return", text: "Shop with more confidence" },
  { title: "Cash on Delivery", text: "Pay when it reaches you" },
  { title: "Lowest Price Picks", text: "Fresh value every day" },
];

const categories = [
  {
    title: "Ethnic Wear",
    offer: "From Rs 299",
    search: "ethnic",
    image:
      "https://images.unsplash.com/photo-1610189014214-b0e7637d190c?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Western Dresses",
    offer: "Party ready",
    search: "dress",
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Menswear",
    offer: "Smart staples",
    search: "men",
    image:
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Footwear",
    offer: "Walk-in deals",
    search: "shoes",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Home Decor",
    offer: "Cozy corners",
    search: "home decor",
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Beauty",
    offer: "Daily glow",
    search: "beauty",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Accessories",
    offer: "Finishing touch",
    search: "accessories",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Grocery",
    offer: "Daily needs",
    search: "grocery",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
  },
];

const brandTiles = [
  {
    name: "StyleNest",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "GlowCart",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "HomeJoy",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "UrbanStep",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "TechDaily",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "FreshBasket",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  },
];

const Home = () => {
  const [list, setList] = useState([]);

  const getAllProduct = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/product`);
      setList(getProductsFromResponse(res));
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="site-shell">
      <Headers />
      <main>
      <section className="home-carousel" aria-label="Featured offers">
        <div id="homeHeroCarousel" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            {heroSlides.map((slide, index) => {
              return (
                <button
                  key={slide.title}
                  type="button"
                  data-bs-target="#homeHeroCarousel"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                />
              );
            })}
          </div>
          <div className="carousel-inner">
            {heroSlides.map((slide, index) => {
              return (
                <div
                  className={`carousel-item ${index === 0 ? "active" : ""}`}
                  key={slide.title}
                >
                  <div
                    className="hero-slide"
                    style={{
                      backgroundImage: `linear-gradient(90deg, rgba(15, 22, 28, 0.72), rgba(15, 22, 28, 0.28)), url(${slide.image})`,
                    }}
                  >
                    <div className="container hero-slide-content">
                      <p className="hero-eyebrow">{slide.eyebrow}</p>
                      <h1>{slide.title}</h1>
                      <p>{slide.text}</p>
                      <Link to={slide.link} className="btn btn-primary btn-lg">
                        {slide.cta}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#homeHeroCarousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#homeHeroCarousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-grid">
          {trustBadges.map((badge) => {
            return (
              <div className="trust-item" key={badge.title}>
                <strong>{badge.title}</strong>
                <span>{badge.text}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="category-showcase py-5">
        <div className="container">
          <div className="section-heading">
            <p className="section-kicker mb-1">Shop by category</p>
            <h2 className="fw-bold mb-0">Everything for every cart</h2>
          </div>

          <div className="category-grid">
            {categories.map((category) => {
              return (
                <Link
                  className="category-tile"
                  to={`/products?search=${encodeURIComponent(category.search)}`}
                  key={category.title}
                >
                  <img src={category.image} alt={category.title} />
                  <span>{category.title}</span>
                  <small>{category.offer}</small>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="value-band">
        <div className="container value-band-inner">
          <div>
            <p className="section-kicker mb-1">Value store</p>
            <h2>Big mood, small bill</h2>
            <p>
              Curated picks for festive wardrobes, home refreshes, daily beauty,
              and quick gifting.
            </p>
            <Link to="/products" className="btn btn-light">
              View All Deals
            </Link>
          </div>
          <div className="value-stack" aria-label="Featured value categories">
            {categories.slice(0, 4).map((category) => {
              return (
                <Link
                  to={`/products?search=${encodeURIComponent(category.search)}`}
                  className="value-mini"
                  key={category.title}
                >
                  <img src={category.image} alt={category.title} />
                  <span>{category.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="brand-section py-5">
        <div className="container">
          <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
            <div>
              <p className="section-kicker mb-1">Original brands</p>
              <h2 className="fw-bold mb-0">Fresh names to explore</h2>
            </div>
            <Link to="/products" className="btn btn-outline-primary">
              View All
            </Link>
          </div>
          <div className="brand-row">
            {brandTiles.map((brand) => {
              return (
                <Link
                  className="brand-tile"
                  to={`/products?search=${encodeURIComponent(brand.name)}`}
                  key={brand.name}
                >
                  <img src={brand.image} alt={brand.name} />
                  <span>{brand.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-5 product-band">
        <div className="container">
          <div className="d-flex flex-wrap gap-3 justify-content-between align-items-center mb-4">
            <div>
              <p className="section-kicker mb-1">Trending now</p>
              <h2 className="fw-bold mb-0">Loved by shoppers</h2>
            </div>
            <Link to="/products" className="btn btn-outline-primary">
              View All
            </Link>
          </div>

          <div className="row g-4">
            {list.length > 0 ? (
              list.slice(0, 8).map((product) => {
                return (
                  <div className="col-sm-6 col-lg-3" key={product._id}>
                    <ProductCard product={product} />
                  </div>
                );
              })
            ) : (
              <div className="col-12">
                <div className="empty-box text-center">
                  Products will appear here once they are added.
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
