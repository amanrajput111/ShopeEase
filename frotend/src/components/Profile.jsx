
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      const response = await fetch(
        "http://localhost:5000/api/users/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      console.log("Response Status:", response.status);
      console.log("Profile Response:", data);

      if (response.ok && data.success) {
        setUser(data.user);
      } else {
        alert(data.message || "Unable to fetch profile");
        navigate("/login");
      }
    } catch (error) {
      console.log("Profile Error:", error);
      alert("Server Error");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>

          <p className="mt-4 text-gray-600 font-medium">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 sm:px-10 py-10 text-center">

            {/* Avatar */}
            <div className="mx-auto w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-white flex items-center justify-center shadow-lg">
              <span className="text-4xl sm:text-5xl font-bold text-blue-600">
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>

            {/* Name */}
            <h1 className="mt-5 text-2xl sm:text-3xl font-bold text-white">
              {user.name}
            </h1>

            {/* Email */}
            <p className="mt-1 text-blue-100 text-sm sm:text-base break-all">
              {user.email}
            </p>
          </div>

          {/* Profile Details */}
          <div className="p-6 sm:p-10">

            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Profile Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

              {/* Full Name */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-500">
                  Full Name
                </p>

                <p className="mt-1 text-base font-medium text-gray-800 break-words">
                  {user.name || "N/A"}
                </p>
              </div>

              {/* Email */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-500">
                  Email
                </p>

                <p className="mt-1 text-base font-medium text-gray-800 break-all">
                  {user.email || "N/A"}
                </p>
              </div>

              {/* Phone */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-500">
                  Phone
                </p>

                <p className="mt-1 text-base font-medium text-gray-800">
                  {user.phone || "N/A"}
                </p>
              </div>

              {/* Role */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <p className="text-sm font-semibold text-gray-500">
                  Role
                </p>

                <p className="mt-1 text-base font-medium text-gray-800 capitalize">
                  {user.role || "User"}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-8"></div>

            {/* Logout */}
            <button
              onClick={logout}
              className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-semibold py-3 px-6 rounded-xl transition duration-200 shadow-sm hover:shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
