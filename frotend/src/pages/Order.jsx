// src/pages/Order.jsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Package } from "lucide-react";

export default function Order() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log(data);

      if (response.ok && data.success) {
        setOrders(data.orders || []);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div className="w-12 h-12 rounded-full border-4 border-blue-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    
    <div className="max-w-7xl mx-auto px-5 py-10">
         <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-100 text-gray-700 rounded-lg transition duration-200 text-sm sm:text-base m-2"
        >
          ← Back
        </button>
      

      <h1 className="text-4xl font-bold">
        My Orders
      </h1>

      <p className="text-gray-500 mt-2 mb-8">
        View and track all your previous orders.
      </p>

      {orders.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-md overflow-x-auto">

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr className="text-left">

                <th className="px-6 py-4">Order ID</th>

                <th className="px-6 py-4">Date</th>

                <th className="px-6 py-4">Products</th>

                <th className="px-6 py-4">Quantity</th>

                <th className="px-6 py-4">Total</th>

                <th className="px-6 py-4">Status</th>

                <th className="px-6 py-4 text-center">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {orders.map((order) => {
                const products = order.products || [];

                const totalQty = products.reduce(
                  (sum, item) => sum + item.quantity,
                  0
                );

                const productNames = products
                  .map(
                    (item) =>
                       item.productId?.title||
                       
                      "Product"
                  )
                  .join(", ");
                  

                return (
                  <tr
                    key={order._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-5 font-medium">
                      {order._id.slice(-8).toUpperCase()}
                    </td>

                    <td className="px-6 py-5">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5">
                      {productNames}
                    </td>

                    <td className="px-6 py-5">
                      {totalQty}
                    </td>

                    <td className="px-6 py-5 font-semibold text-blue-600">
                      ₹
                      {Number(
                        order.totalAmount
                      ).toLocaleString("en-IN")}
                    </td>

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.orderStatus
                        )}`}
                      >
                        {order.orderStatus}
                      </span>

                    </td>

                    <td className="px-6 py-5 text-center">

                      <button
                        onClick={() =>
                          navigate(
                            `${order._id}`
                          )
                        }
                        className="inline-flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition"
                      >
                        <Eye size={18} />
                        View Details
                      </button>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-md p-12 text-center">

          <Package
            size={70}
            className="mx-auto text-gray-400"
          />

          <h2 className="text-3xl font-bold mt-6">
            No Orders Found
          </h2>

          <p className="text-gray-500 mt-3">
            You haven't placed any orders yet.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Shop Now
          </button>

        </div>
      )}

    </div>
  );
}