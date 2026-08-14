import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Plus,
  Minus,
  Heart,
  ShoppingCart,
  Zap,
  ArrowLeft,
  Star,
} from "lucide-react";

import { useCart } from "../context/Context";
import { useWishlist } from "../context/WishlistContext";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `https://shopeease-2.onrender.com/api/products/${id}`
      );

      const data = await response.json();

      if (response.ok && data?.data) {
        setProduct(data.data);

        setSelectedImage(
          data.data.image ||
            data.data.product_image ||
            ""
        );
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  };

  const productName =
    product?.name ||
    product?.product_name ||
    "Product";

  const productPrice = Number(
    product?.price ||
      product?.product_price ||
      0
  );

  const productImage =
    product?.image ||
    product?.product_image ||
    "";

  const productCategory =
    product?.category || "General";

  const productDescription =
    product?.description ||
    "No description available.";

  const wishlist = product
    ? isInWishlist(product._id)
    : false;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      quantity,
    });

    alert("Product added to cart");
  };

  const handleBuyNow = () => {
    addToCart({
      ...product,
      quantity,
    });

    navigate("/cart");
  };

  const handleWishlist = () => {
    if (!product) return;

    toggleWishlist(product);

    if (wishlist) {
      alert("Removed from wishlist");
    } else {
      alert("Added to wishlist");
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto" />

          <p className="mt-4 text-gray-600">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-900">
            Product Not Found
          </h2>

          <p className="text-gray-500 mt-2">
            The product you are looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition"
          >
            <ArrowLeft size={18} />
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-medium mb-5 sm:mb-7 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Product */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

          {/* Image */}

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">

            <div className="w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-gray-50 rounded-xl flex items-center justify-center overflow-hidden">

              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={productName}
                  className="w-full h-full object-contain p-4 sm:p-6 hover:scale-105 transition duration-300"
                />
              ) : (
                <div className="text-gray-400">
                  No Image
                </div>
              )}

            </div>

            <div className="flex gap-3 mt-4 overflow-x-auto pb-2">

              <button
                onClick={() =>
                  setSelectedImage(productImage)
                }
                className={`shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === productImage
                    ? "border-blue-600"
                    : "border-gray-200 hover:border-blue-400"
                }`}
              >
                <img
                  src={productImage}
                  alt={productName}
                  className="w-full h-full object-contain p-2"
                />
              </button>

            </div>
          </div>

          {/* Details */}

          <div className="bg-white lg:bg-transparent rounded-2xl p-4 sm:p-6 lg:p-0">

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              {productName}
            </h1>

            <p className="text-gray-500 mt-2">
              Brand:
              <span className="font-medium text-gray-700 ml-1">
                MyShop
              </span>
            </p>

            <p className="text-gray-500">
              Category:
              <span className="font-medium text-gray-700 ml-1">
                {productCategory}
              </span>
            </p>

            {/* Rating */}

            <div className="flex items-center gap-2 mt-4">
              <div className="flex text-yellow-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill={
                      star <= 4
                        ? "currentColor"
                        : "none"
                    }
                  />
                ))}
              </div>

              <span className="text-sm text-gray-500">
                4.0 (120 Reviews)
              </span>
            </div>

            {/* Price */}

            <div className="flex items-center gap-3 mt-6">
              <h2 className="text-3xl sm:text-4xl font-bold text-blue-600">
                ₹{productPrice.toLocaleString("en-IN")}
              </h2>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                Latest
              </span>
            </div>

            {/* Stock */}

            <div className="mt-4">
              <span className="inline-flex items-center gap-2 text-green-600 font-semibold">
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full" />
                In Stock
              </span>
            </div>

            {/* Description */}

            <div className="mt-6">
              <h3 className="font-semibold text-gray-900 mb-2">
                Description
              </h3>

              <p className="text-gray-600 leading-7">
                {productDescription}
              </p>
            </div>

            {/* Quantity */}

            <div className="flex items-center gap-4 mt-8">
              <span className="font-semibold text-gray-800">
                Quantity
              </span>

              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                <button
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-3 hover:bg-gray-100 disabled:opacity-40"
                >
                  <Minus size={18} />
                </button>

                <span className="px-6 font-semibold">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="p-3 hover:bg-gray-100"
                >
                  <Plus size={18} />
                </button>

              </div>
            </div>

            {/* Buttons */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">

              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 rounded-lg font-semibold transition"
              >
                <ShoppingCart size={20} />
                Add To Cart
              </button>

              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3.5 rounded-lg font-semibold transition"
              >
                <Zap size={20} />
                Buy Now
              </button>

              {/* Wishlist */}

              <button
                onClick={handleWishlist}
                className={`sm:col-span-2 flex items-center justify-center gap-2 border px-5 py-3.5 rounded-lg font-semibold transition ${
                  wishlist
                    ? "border-red-300 bg-red-50 text-red-600"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Heart
                  size={20}
                  fill={
                    wishlist
                      ? "currentColor"
                      : "none"
                  }
                />

                {wishlist
                  ? "Added to Wishlist"
                  : "Add to Wishlist"}
              </button>

            </div>

            {/* Information */}

            <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm mt-8 sm:mt-10">

              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">
                Product Information
              </h3>

              <div className="space-y-4">

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-3">
                  <span className="font-semibold text-gray-700">
                    Name
                  </span>

                  <span className="text-gray-600">
                    {productName}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-3">
                  <span className="font-semibold text-gray-700">
                    Category
                  </span>

                  <span className="text-gray-600">
                    {productCategory}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-3">
                  <span className="font-semibold text-gray-700">
                    Price
                  </span>

                  <span className="text-gray-600">
                    ₹{productPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div>
                  <span className="font-semibold text-gray-700">
                    Description
                  </span>

                  <p className="mt-2 text-gray-600 leading-7">
                    {productDescription}
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Reviews */}

        <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm border border-gray-200 mt-6 sm:mt-8 lg:mt-10">

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-2xl sm:text-3xl font-bold">
              Customer Reviews
            </h2>

            <span className="text-sm text-gray-500">
              120 Reviews
            </span>
          </div>

          <div className="border-t my-5" />

          <div>
            <h4 className="font-semibold">
              Rahul Sharma
            </h4>

            <div className="flex text-yellow-500 mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill="currentColor"
                />
              ))}
            </div>

            <p className="text-gray-600 mt-2">
              Amazing product. Highly recommended.
            </p>
          </div>

          <div className="border-t my-5" />

          <div>
            <h4 className="font-semibold">
              Priya Singh
            </h4>

            <div className="flex text-yellow-500 mt-1">
              {[1, 2, 3, 4].map((star) => (
                <Star
                  key={star}
                  size={16}
                  fill="currentColor"
                />
              ))}

              <Star size={16} />
            </div>

            <p className="text-gray-600 mt-2">
              Worth buying. Excellent quality.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetails;