import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/Context";
import Hero from "./Hero";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://shopeease-2.onrender.com/api");
      const data = await response.json();

      if (data.products) {
        setProducts(data.products.slice(0, 6));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Product added to cart");
  };

  const handleViewDetails = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero */}
      <Hero />

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-5 py-12">
        <h2 className="text-4xl font-bold text-center mb-10">
          Featured Products
        </h2>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-md hover:shadow-2xl duration-300 overflow-hidden hover:scale-95"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-55 w-full object-contain  "
                />

                <div className="p-5">
                  <h3 className="text-xl font-semibold">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <p className="text-blue-600 font-bold text-xl mt-4">
                    ₹{Number(product.price).toLocaleString()}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => handleViewDetails(product._id)}
                      className="flex-1 border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition active:scale-95"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="text-4xl font-bold text-center mb-12">
            Why Choose MyShop?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl">🚚</div>
              <h3 className="text-2xl font-bold mt-4">
                Fast Delivery
              </h3>
              <p className="text-gray-600 mt-3">
                Get your products delivered quickly across India.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl">💳</div>
              <h3 className="text-2xl font-bold mt-4">
                Secure Payment
              </h3>
              <p className="text-gray-600 mt-3">
                100% safe and secure payment options.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl shadow-md p-8 text-center hover:shadow-xl transition">
              <div className="text-6xl">🎧</div>
              <h3 className="text-2xl font-bold mt-4">
                24/7 Support
              </h3>
              <p className="text-gray-600 mt-3">
                Our support team is available anytime for you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;