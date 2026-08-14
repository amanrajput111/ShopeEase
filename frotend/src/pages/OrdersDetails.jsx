
import { Co2Sharp } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const getStatusColor = (status) => {
  switch (status) {
    case "Delivered":
      return "bg-green-100 text-green-700";
    case "Shipped":
      return "bg-blue-100 text-blue-700";
    case "Processing":
      return "bg-yellow-100 text-yellow-700";
    case "Confirmed":
      return "bg-cyan-100 text-cyan-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function OrdersDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [id]);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      console.log(data)

      if (response.ok && data.success) {
        setOrder(data.data);
      } else {
        alert(data.message || "Order not found");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
    } finally {
      setLoading(false);
    }
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

          <p className="mt-4 text-gray-600 text-sm">
            Loading order details...
          </p>
        </div>
      </div>
    );
  }

  // Order not found
  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 text-center max-w-md w-full">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Order Not Found
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            The order you're looking for does not exist.
          </p>

          <button
            onClick={() => navigate("/orders")}
            className="mt-6 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition duration-200 text-sm sm:text-base"
        >
          ← Back
        </button>

        {/* Page Heading */}
        <div className="mt-5 sm:mt-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Order Details
          </h1>

          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            View your order information and purchased products
          </p>
        </div>

        {/* Main Card */}
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

          {/* Order Header */}
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              Order ID
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-600 break-all">
              {order._id}
            </p>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Order Information */}
          <div className="p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

              {/* Date */}
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Date
                </p>

                <p className="mt-1 text-gray-800 text-sm sm:text-base">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Status */}
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Status
                </p>

                <span
                  className={`inline-block mt-2 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${getStatusColor(
                    order.orderStatus
                  )}`}
                >
                  {order.orderStatus}
                </span>
              </div>

              {/* Payment Method */}
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Payment Method
                </p>

                <p className="mt-1 text-gray-800 text-sm sm:text-base">
                  {order.paymentMethod}
                </p>
              </div>

              {/* Total Amount */}
              <div>
                <p className="text-sm font-semibold text-gray-500">
                  Total Amount
                </p>

                <p className="mt-1 text-lg sm:text-xl font-bold text-gray-900">
                  ₹{Number(order.totalAmount).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Shipping Address */}
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Shipping Address
            </h2>

            <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
              <p className="font-semibold text-gray-800">
                {order.shippingAddress?.fullName}
              </p>

              <p className="mt-1 text-sm sm:text-base text-gray-600">
                {order.shippingAddress?.address}
              </p>

              <p className="mt-1 text-sm sm:text-base text-gray-600">
                {order.shippingAddress?.city},{" "}
                {order.shippingAddress?.state}
              </p>

              <p className="mt-1 text-sm sm:text-base text-gray-600">
                {order.shippingAddress?.pincode}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200"></div>

          {/* Products */}
          <div className="p-4 sm:p-6">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
              Products
            </h2>

            <div className="space-y-3">
              {order.products?.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
                >
                  {/* Product Info */}
                  <div className="min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base break-words">
                      {item.productId?.name || "Product"}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  {/* Product Price */}
                  <div className="text-left sm:text-right">
                    <p className="font-bold text-gray-900 text-base sm:text-lg">
                      ₹
                      {(
                        Number(item.productId?.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer Total */}
          <div className="bg-gray-50 border-t border-gray-200 p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <span className="text-base sm:text-lg font-semibold text-gray-700">
                Total
              </span>

              <span className="text-xl sm:text-2xl font-bold text-gray-900">
                ₹{Number(order.totalAmount).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

