// Product Image Mapping - Similar to Meesho.com
// Maps products by category/title to appropriate images

export const productImageMap = {
  // Ethnic Wear
  "ethnic wear":
    "https://images.unsplash.com/photo-1610189014214-b0e7637d190c?auto=format&fit=crop&w=600&q=80",
  saree:
    "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=600&q=80",
  kurti:
    "https://images.unsplash.com/photo-1618932260643-30e5300c3ecf?auto=format&fit=crop&w=600&q=80",

  // Men's Wear
  "mens casual":
    "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
  "mens formal":
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
  "mens shirt":
    "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
  "mens hoodie":
    "https://images.unsplash.com/photo-1556821552-5f96033139d7?auto=format&fit=crop&w=600&q=80",
  "mens shorts":
    "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
  "mens tshirt":
    "https://images.unsplash.com/photo-1556821552-5f96033139d7?auto=format&fit=crop&w=600&q=80",

  // Women's Wear
  "womens dress":
    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
  "womens casual":
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80",
  "womens formal":
    "https://images.unsplash.com/photo-1595777707802-21b258e29e6f?auto=format&fit=crop&w=600&q=80",
  "womens tops":
    "https://images.unsplash.com/photo-1618932260643-30e5300c3ecf?auto=format&fit=crop&w=600&q=80",

  // Footwear
  shoes:
    "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80",
  "casual shoes":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  "formal shoes":
    "https://images.unsplash.com/photo-1543163521-9efcc06b81be?auto=format&fit=crop&w=600&q=80",
  sneakers:
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
  "running shoes":
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",

  // Home Decor
  "home decor":
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
  pillow:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80",
  blanket:
    "https://images.unsplash.com/photo-1537151608828-8da4b8b752b1?auto=format&fit=crop&w=600&q=80",

  // Beauty
  beauty:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  makeup:
    "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80",
  skincare:
    "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&q=80",

  // Accessories
  accessories:
    "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
  bag: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80",
  jewellery:
    "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
  watch:
    "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=600&q=80",

  // Grocery & Food
  grocery:
    "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
  food: "https://images.unsplash.com/photo-1555939594-58d7cb561241?auto=format&fit=crop&w=600&q=80",
  snacks:
    "https://images.unsplash.com/photo-1599599810694-b5ac4dd0a495?auto=format&fit=crop&w=600&q=80",
};

/**
 * Get product image based on category or title
 * @param {string} category - Product category name
 * @param {string} title - Product title
 * @returns {string} Image URL
 */
export const getProductImageUrl = (category, title) => {
  // First try to match by category
  if (category) {
    const categoryLower = category.toLowerCase().trim();
    const categoryMatch = Object.entries(productImageMap).find(
      ([key]) => categoryLower.includes(key) || key.includes(categoryLower),
    );
    if (categoryMatch) {
      return categoryMatch[1];
    }
  }

  // Then try to match by title
  if (title) {
    const titleLower = title.toLowerCase().trim();
    const titleMatch = Object.entries(productImageMap).find(
      ([key]) => titleLower.includes(key) || key.includes(titleLower),
    );
    if (titleMatch) {
      return titleMatch[1];
    }
  }

  // Return null if no match found (will use fallback)
  return null;
};

export default {
  productImageMap,
  getProductImageUrl,
};
