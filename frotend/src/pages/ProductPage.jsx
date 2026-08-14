
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Search } from "lucide-react";

import { useCart } from "../context/Context";
import { useWishlist } from "../context/WishlistContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const navigate = useNavigate();

  // =========================
  // Fetch Products
  // =========================

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://shopeease-2.onrender.com/api"
      );

      const data = await response.json();

      console.log("Products Response:", data);

      if (response.ok && data?.products) {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch Products Error:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Add To Cart
  // =========================

  const handleAddToCart = (product) => {
    addToCart(product);

    alert("Product added to cart");
  };

  // =========================
  // Wishlist
  // =========================

  const handleWishlist = (product) => {
    if (!product?._id) {
      console.error("Product ID missing:", product);
      return;
    }

    const alreadyInWishlist = isInWishlist(product._id);

    toggleWishlist(product);

    if (alreadyInWishlist) {
      alert("Removed from wishlist");
    } else {
      alert("Added to wishlist");
    }
  };

  // =========================
  // View Details
  // =========================

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  // =========================
  // Categories
  // =========================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products.map(
          (product) => product.category || "Others"
        )
      ),
    ];

    return ["All", ...uniqueCategories];
  }, [products]);

  // =========================
  // Search + Category Filter
  // =========================

  const filteredProducts = products.filter((product) => {
    const productName =
      product.product_name ||
      product.name ||
      "";

    const matchesSearch = productName
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" ||
      product.category === category;

    return matchesSearch && matchesCategory;
  });

  // =========================
  // UI
  // =========================

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Our Products
          </h1>

          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Browse our latest collection.
          </p>

        </div>

        {/* ================= SEARCH + CATEGORY ================= */}

        <div className="flex flex-col md:flex-row gap-4 mb-8">

          {/* Search */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="w-full border border-gray-300 bg-white rounded-xl pl-10 pr-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            />

          </div>

          {/* Category */}

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full md:w-60 border border-gray-300 bg-white rounded-xl px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>

        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="flex justify-center py-20">

            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>

          </div>
        ) : filteredProducts.length === 0 ? (

          /* ================= NO PRODUCTS ================= */

          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-gray-900">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search.
            </p>

          </div>

        ) : (

          /* ================= PRODUCTS GRID ================= */

          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

            {filteredProducts.map((product) => {

              const productName =
                product.product_name ||
                product.name ||
                "Product";

              const productPrice = Number(
                product.price ||
                product.product_price ||
                0
              );

              const productImage =
                product.image ||
                product.product_image ||
                "";

              const wishlistActive =
                isInWishlist(product._id);

              return (

                <div
                  key={product._id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden flex flex-col h-full border border-gray-100"
                >

                  {/* ================= IMAGE ================= */}

                  <div className="relative bg-gray-50">

                    <Link
                      to={`/products/${product._id}`}
                    >
                      {productImage ? (
                        <img
                          src={productImage}
                          alt={productName}
                          className="w-full h-40 sm:h-52 md:h-56 object-contain p-4"
                        />
                      ) : (
                        <div className="w-full h-40 sm:h-52 md:h-56 flex items-center justify-center text-gray-400">
                          No Image
                        </div>
                      )}
                    </Link>

                    {/* Category */}
{/* 
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] sm:text-xs px-2 py-1 rounded-full capitalize">
                      {product.category || "Others"}
                    </span> */}

                    {/* Wishlist */}

                    <button
                      type="button"
                      onClick={() =>
                        handleWishlist(product)
                      }
                      className={`absolute top-3 right-3 p-2 rounded-full shadow-md transition-all duration-200 active:scale-90 ${
                        wishlistActive
                          ? "bg-red-50 text-red-600"
                          : "bg-white text-gray-600 hover:bg-red-50 hover:text-red-500"
                      }`}
                      aria-label={
                        wishlistActive
                          ? "Remove from wishlist"
                          : "Add to wishlist"
                      }
                    >

                      <Heart
                        size={18}
                        fill={
                          wishlistActive
                            ? "currentColor"
                            : "none"
                        }
                      />

                    </button>

                  </div>

                  {/* ================= CARD CONTENT ================= */}

                  <div className="flex flex-col flex-1 p-4 sm:p-5">

                    {/* Name */}

                    <h2 className="text-base sm:text-lg lg:text-xl font-semibold line-clamp-1 capitalize text-gray-900">
                      {productName}
                    </h2>

                    {/* Description */}

                    <p className="text-gray-500 text-xs sm:text-sm mt-2 line-clamp-2 min-h-[40px]">
                      {product.description ||
                        "No description available."}
                    </p>

                    {/* Rating */}

                    <div className="flex items-center mt-3">

                      <span className="text-yellow-500">
                        ★★★★☆
                      </span>

                      <span className="text-gray-500 text-sm ml-2">
                        (4.5)
                      </span>

                    </div>

                    {/* Price */}

                    <div className="mt-4">

                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
                        ₹
                        {productPrice.toLocaleString(
                          "en-IN"
                        )}
                      </h3>

                    </div>

                    {/* Buttons */}

                    <div className="mt-auto pt-5 flex flex-col sm:flex-row gap-3">

                      {/* Details */}

                      <button
                        type="button"
                        onClick={() =>
                          handleViewDetails(
                            product._id
                          )
                        }
                        className="w-full sm:flex-1 border-2 border-blue-600 text-blue-600 rounded-lg py-2.5 text-sm font-medium hover:bg-blue-600 hover:text-white transition"
                      >
                        View Details
                      </button>

                      {/* Cart */}

                      <button
                        type="button"
                        onClick={() =>
                          handleAddToCart(product)
                        }
                        className="w-full sm:flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-blue-700 transition active:scale-95"
                      >
                        <ShoppingCart size={18} />

                        Cart
                      </button>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default ProductsPage;

