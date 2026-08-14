import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
} from "lucide-react";

import { useCart } from "../context/Context";

const CartPage = () => {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeItem,
    subtotal,
    shipping,
    gst,
    total,
  } = useCart();

  const handleCheckout = () => {
    navigate("/Confirm");
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-10">
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">
          <ShoppingCart
            size={70}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-3xl font-bold mt-6">
            Your Cart is Empty
          </h2>

          <p className="text-gray-500 mt-3">
            Start shopping to add products to your cart.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
         <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition duration-200 text-sm sm:text-base m-3"
        >
          ← Back
        </button>

      <h1 className="text-4xl font-bold mb-8">
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}

        <div className="lg:col-span-2 space-y-6">

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col md:flex-row gap-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full md:w-48 h-48 object-contain rounded-xl bg-gray-100"
              />

              <div className="flex-1 flex flex-col justify-between">

                <div>

                  <h2 className="text-2xl font-bold">
                    {item.name}
                  </h2>

                  <p className="text-gray-500 mt-2">
                    {item.description}
                  </p>

                  <h3 className="text-2xl font-bold text-blue-600 mt-4">
                    ₹
                    {Number(item.price).toLocaleString(
                      "en-IN"
                    )}
                  </h3>

                </div>

                <div className="flex justify-between items-center mt-6">

                  {/* Quantity */}

                  <div className="flex items-center border rounded-lg overflow-hidden">

                    <button
                      onClick={() =>
                        decreaseQty(item._id)
                      }
                      className="p-3 hover:bg-gray-100"
                    >
                      <Minus size={18} />
                    </button>

                    <span className="px-5 font-semibold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQty(item._id)
                      }
                      className="p-3 hover:bg-gray-100"
                    >
                      <Plus size={18} />
                    </button>

                  </div>

                  <button
                    onClick={() =>
                      removeItem(item._id)
                    }
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={24} />
                  </button>

                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Order Summary */}

        <div>

          <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">

            <h2 className="text-2xl font-bold">
              Order Summary
            </h2>

            <hr className="my-5" />

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  ₹
                  {subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>
                  ₹
                  {shipping.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>
                  ₹{gst.toFixed(2)}
                </span>
              </div>

            </div>

            <hr className="my-5" />

            <div className="flex justify-between text-xl font-bold">

              <span>Total</span>

              <span className="text-blue-600">
                ₹{total.toFixed(2)}
              </span>

            </div>

            <button
              onClick={handleCheckout}
              className="w-full mt-8 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            >
              <ShoppingCart size={20} />
              Proceed to Checkout
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default CartPage;