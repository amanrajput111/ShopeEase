
// src/pages/ConfirmOrders.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Context";

export default function ConfirmOrders() {
  const navigate = useNavigate();

  // const user = localStorage.getItem("user")
  // console.log(user)

  const {
    cartItems,
    subtotal,
    shipping,
    gst,
    total,
    clearCart,
  } = useCart();

  const userdata = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");


  const user = userdata

  // console.log(user)

    
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirmOrder = async () => {
    if (!address.trim()) {
      alert("Please enter your delivery address.");
      return;
    }

    if (!mobile.trim()) {
      alert("Please enter your mobile number.");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty.");
      return;
    }




    const orderData = {
      userId: user?._id,

      products: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
        price: Number(item.price),
      })),

      totalAmount: total,


    

      shippingAddress: {
        fullName: user?.username || user?.name || "",
        email: user?.email || "",
        mobile: mobile,
        address: address,
      },

      paymentMethod: "UPI",
      paymentStatus: "Pending",
      orderStatus: "Pending",
    };

    try {
      setLoading(true);

      const response = await fetch(
        "https://shopeease-2.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      const data = await response.json();


      console.log("Order Response:", data);

      if (data.success) {
        alert("Order placed successfully.");

        clearCart();

        navigate("/orders");
      } else {
        alert(data.message || "Failed to place order.");
      }
    } catch (error) {
      console.error("Order Error:", error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">
      
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition duration-200 text-sm sm:text-base"
        >
          ← Back
        </button>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Heading */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Confirm Your Order
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Enter your delivery details and confirm your payment
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">

          {/* ================= LEFT SECTION ================= */}
          <div className="lg:col-span-2 space-y-5 sm:space-y-6">

            {/* Delivery Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
                Delivery Details
              </h2>

              {/* Full Name */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <input
                  type="text"
                  value={user?.username || user?.name || ""}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed outline-none"
                />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-600 cursor-not-allowed outline-none"
                />
              </div>

              {/* Mobile */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter mobile number"
                  maxLength="10"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>

                <textarea
                  rows="4"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your complete delivery address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8">

              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Order Items
              </h2>

              <div className="border-t border-gray-200 my-5"></div>

              {cartItems.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">
                    Your cart is empty.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-gray-200 bg-gray-50"
                    >
                      {/* Product Name */}
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base break-words">
                          {item.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      {/* Product Price */}
                      <p className="font-bold text-gray-900 text-base sm:text-lg">
                        ₹
                        {(
                          Number(item.price) *
                          Number(item.quantity)
                        ).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT SECTION ================= */}
          <div className="lg:col-span-1">

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 lg:p-8 lg:sticky lg:top-6">

              {/* Payment Summary */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                Payment Summary
              </h2>

              <div className="border-t border-gray-200 my-5"></div>

              {/* Subtotal */}
              <div className="flex justify-between items-center mb-4 gap-4">
                <span className="text-gray-600">
                  Subtotal
                </span>

                <span className="font-medium text-gray-900">
                  ₹{Number(subtotal).toLocaleString()}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between items-center mb-4 gap-4">
                <span className="text-gray-600">
                  Shipping
                </span>

                <span className="font-medium text-gray-900">
                  ₹{Number(shipping).toLocaleString()}
                </span>
              </div>

              {/* GST */}
              <div className="flex justify-between items-center mb-4 gap-4">
                <span className="text-gray-600">
                  GST
                </span>

                <span className="font-medium text-gray-900">
                  ₹{Number(gst).toFixed(2)}
                </span>
              </div>

              <div className="border-t border-gray-200 my-4"></div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6 gap-4">
                <span className="text-lg font-bold text-gray-900">
                  Total
                </span>

                <span className="text-xl sm:text-2xl font-bold text-blue-600">
                  ₹{Number(total).toFixed(2)}
                </span>
              </div>

              {/* QR Payment */}
              <div className="text-center border border-gray-200 rounded-xl p-4 sm:p-5 bg-gray-50">

                <h3 className="font-bold text-gray-800 mb-4">
                  Scan QR to Pay
                </h3>

                <div className="flex justify-center">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=smpubg420-1@oksbi%26pn=MyShop%26am=${total}%26cu=INR`}
                    alt="UPI QR Code"
                    className="w-44 h-44 sm:w-52 sm:h-52 object-contain bg-white p-2 rounded-lg border border-gray-200"
                  />
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Scan the QR code using your UPI app
                </p>
              </div>

              {/* Confirm Order Button */}
              <button
                onClick={handleConfirmOrder}
                disabled={loading}
                className={`w-full mt-6 py-3.5 px-4 rounded-lg text-white font-semibold text-sm sm:text-base transition duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
                }`}
              >
                {loading
                  ? "Placing Order..."
                  : "Confirm Order"}
              </button>

              {/* Security Message */}
              <p className="text-center text-xs text-gray-500 mt-3">
                🔒 Your order information is secure
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

