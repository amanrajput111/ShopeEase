// src/components/Footer.jsx

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-gray-700 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">

          {/* About / Logo */}
          <div>
            <h2 className="text-3xl font-bold text-blue-400">
              ShopEase
            </h2>

            <p className="mt-4 text-sm text-gray-300 leading-7">
              ShopEase is your one-stop destination for quality products,
              fast delivery, secure payments, and the best shopping
              experience.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 mt-5">

              <a
                href="https://www.facebook.com/share/1BF1Tn3hZB/"
                className="text-white hover:text-blue-400 transition duration-300"
              >
                <FaFacebookF size={20} />
              </a>

              <a
                href="https://www.instagram.com/xd_abhii_x1?igsh=MXNzYXdqcGxwYWJqcg==&igsi=MXNzYXdqcGxwYWJqcg=="
                className="text-white hover:text-pink-400 transition duration-300"
              >
                <FaInstagram size={20} />
              </a>

              <a
                href="https://x.com/AbhayRa14062645"
                className="text-white hover:text-sky-400 transition duration-300"
              >
                <FaTwitter size={20} />
              </a>

              <a
                href=" linkedin.com/in/aman-7724773a4"
                className="text-white hover:text-blue-500 transition duration-300"
              >
                <FaLinkedinIn size={20} />
              </a>

              <a
                href="github.com/amanrajput111"
                className="text-white hover:text-gray-400 transition duration-300"
              >
                <FaGithub size={20} />
              </a>

            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <a
                href="/"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Home
              </a>

              <a
                href="/products"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Products
              </a>

              <a
                href="/orders"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Orders
              </a>

              <a
                href="/cart"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                Cart
              </a>

            </div>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Customer Support
            </h3>

            <div className="space-y-3 text-gray-300 text-sm">

              <p>
                📧 support@shopease.com
              </p>

              <p>
                📞 +91 8545887681
              </p>

              <p>
                📍 Farrukhabad, India
              </p>

              <p>
                Mon - Sat : 9:00 AM - 7:00 PM
              </p>

            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-500 mt-8 pt-5">

          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} ShopEase. | Created by Aman |
            All Rights Reserved.
          </p>

        </div>

      </div>
    </footer>
  );
}

export default Footer;