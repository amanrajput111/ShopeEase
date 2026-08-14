import React, { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");

      if (!savedWishlist) {
        return [];
      }

      const parsedWishlist = JSON.parse(savedWishlist);

      return Array.isArray(parsedWishlist) ? parsedWishlist : [];
    } catch (error) {
      console.error("Wishlist load error:", error);
      return [];
    }
  });

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    // Same-tab components ko update karne ke liye
    window.dispatchEvent(new Event("wishlistUpdated"));
  }, [wishlist]);

  // Add / Remove wishlist
  const toggleWishlist = (product) => {
    if (!product || !product._id) {
      console.log("Invalid product:", product);
      return;
    }

    setWishlist((prev) => {
      const exists = prev.some((item) => item._id === product._id);

      if (exists) {
        return prev.filter((item) => item._id !== product._id);
      }

      return [...prev, product];
    });
  };

  // Check product wishlist mein hai ya nahi
  const isInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  // Remove directly
  const removeFromWishlist = (productId) => {
    setWishlist((prev) => prev.filter((item) => item._id !== productId));
  };

  // Clear wishlist
  const clearWishlist = () => {
    setWishlist([]);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistCount: wishlist.length,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);

  if (!context) {
    throw new Error("useWishlist must be used inside WishlistProvider");
  }

  return context;
};
