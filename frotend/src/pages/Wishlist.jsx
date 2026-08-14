
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/Context";

const Wishlist = () => {
  const navigate = useNavigate();

  const {
    wishlist,
    removeFromWishlist,
    clearWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const getProductName = (product) => {
    return (
      product?.name ||
      product?.product_name ||
      "Product"
    );
  };

  const getProductPrice = (product) => {
    return Number(
      product?.price ||
        product?.product_price ||
        0
    );
  };

  const getProductImage = (product) => {
    return (
      product?.image ||
      product?.product_image ||
      ""
    );
  };

  const getProductCategory = (product) => {
    return product?.category || "General";
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      quantity: 1,
    });

    alert("Product added to cart");
  };

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  // =========================
  // EMPTY WISHLIST
  // =========================

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition mb-8"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          {/* Empty Wishlist */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-12 text-center">

            <div className="w-20 h-20 mx-auto rounded-full bg-red-50 flex items-center justify-center">
              <Heart
                size={40}
                className="text-red-500"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-6">
              Your Wishlist is Empty
            </h1>

            <p className="text-gray-500 mt-3 max-w-md mx-auto">
              Save your favorite products here and
              come back to them later.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <ShoppingBag size={19} />
              Browse Products
            </button>

          </div>
        </div>
      </div>
    );
  }

  // =========================
  // WISHLIST PRODUCTS
  // =========================

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

          <div>
            <div className="flex items-center gap-3">

              <Heart
                size={28}
                className="text-red-500"
                fill="currentColor"
              />

              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Wishlist
              </h1>

            </div>

            <p className="text-gray-500 mt-1">
              {wishlist.length}{" "}
              {wishlist.length === 1
                ? "product"
                : "products"}{" "}
              saved
            </p>
          </div>

          <button
            onClick={clearWishlist}
            className="flex items-center justify-center gap-2 border border-red-200 text-red-600 hover:bg-red-50 px-4 py-2.5 rounded-lg font-medium transition"
          >
            <Trash2 size={17} />
            Clear Wishlist
          </button>

        </div>

        {/* Products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

          {wishlist.map((product) => {

            const productName =
              getProductName(product);

            const productPrice =
              getProductPrice(product);

            const productImage =
              getProductImage(product);

            const productCategory =
              getProductCategory(product);

            return (
              <div
                key={product._id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition group"
              >

                {/* Image */}
                <div
                  onClick={() =>
                    navigate(
                      `/products/${product._id}`
                    )
                  }
                  className="relative h-56 bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
                >

                  {productImage ? (
                    <img
                      src={productImage}
                      alt={productName}
                      className="w-full h-full object-contain p-5 group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <span className="text-gray-400">
                      No Image
                    </span>
                  )}

                  {/* Remove Heart */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(product._id);
                    }}
                    className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                  >
                    <Heart
                      size={19}
                      fill="currentColor"
                    />
                  </button>

                </div>

                {/* Details */}
                <div className="p-4">

                  <p className="text-xs text-gray-500 mb-1">
                    {productCategory}
                  </p>

                  <h2
                    onClick={() =>
                      navigate(
                        `/products/${product._id}`
                      )
                    }
                    className="font-semibold text-gray-900 line-clamp-2 cursor-pointer hover:text-blue-600 transition"
                  >
                    {productName}
                  </h2>

                  <p className="text-xl font-bold text-blue-600 mt-3">
                    ₹
                    {productPrice.toLocaleString(
                      "en-IN"
                    )}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-2 mt-4">

                    <button
                      onClick={() =>
                        handleAddToCart(product)
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition"
                    >
                      <ShoppingCart size={17} />
                      Add
                    </button>

                    <button
                      onClick={() =>
                        handleRemove(product._id)
                      }
                      className="w-11 flex items-center justify-center border border-gray-300 rounded-lg text-gray-600 hover:text-red-500 hover:border-red-300 transition"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default Wishlist;

