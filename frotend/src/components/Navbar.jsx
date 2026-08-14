// src/components/Navbar.jsx

import React, { useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  Badge,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  useMediaQuery,
} from "@mui/material";

import {
  Search,
  ShoppingCart,
  AccountCircle,
  Menu as MenuIcon,
  FavoriteBorder,
} from "@mui/icons-material";

import { NavLink, useNavigate } from "react-router-dom";

import { useCart } from "../context/Context";
import { useWishlist } from "../context/WishlistContext";

export function Navbar() {
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  // =========================
  // MOBILE SCREEN
  // =========================

  const isMobile = useMediaQuery("(max-width: 767px)");

  const { cartItems } = useCart();

  const { wishlist } = useWishlist();

  const wishlistCount = wishlist?.length || 0;

  const isLoggedIn = !!localStorage.getItem("token");

  // =========================
  // MOBILE DRAWER
  // =========================

  const toggleDrawer = () => {
    setMobileOpen((prev) => !prev);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
  };

  // =========================
  // NAVIGATION
  // =========================

  const handleNavigation = (path) => {
    navigate(path);
    closeDrawer();
  };

  // =========================
  // PROFILE MENU
  // =========================

  const handleProfileOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    handleProfileClose();
    navigate("/profile");
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    handleProfileClose();
    closeDrawer();

    navigate("/login");

    window.location.reload();
  };

  // =========================
  // SEARCH
  // =========================

  const handleSearch = () => {
    const value = search.trim();

    if (!value) {
      navigate("/products");
      closeDrawer();
      return;
    }

    navigate(`/products?search=${encodeURIComponent(value)}`);

    closeDrawer();
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      {/* =========================
          NAVBAR
      ========================= */}

      <AppBar
        position="sticky"
        elevation={2}
        sx={{
          bgcolor: "#fff",
          color: "#000",
        }}
      >
        <Toolbar className="flex justify-between gap-2 sm:gap-4 px-3 sm:px-6">

          {/* =========================
              LEFT SECTION
          ========================= */}

          <div className="flex items-center gap-2 sm:gap-6">

            {/* =========================
                MOBILE HAMBURGER
                ONLY MOBILE
            ========================= */}

            {isMobile && (
              <IconButton
                onClick={toggleDrawer}
                aria-label="Open menu"
              >
                <MenuIcon />
              </IconButton>
            )}

            {/* =========================
                LOGO
                ONLY DESKTOP
            ========================= */}

            {!isMobile && (
              <Typography
                variant="h5"
                className="font-bold text-blue-600 cursor-pointer"
                onClick={() => navigate("/")}
              >
                ShopEase
              </Typography>
            )}

            {/* =========================
                DESKTOP NAVIGATION
            ========================= */}

            {!isMobile && (
              <div className="flex items-center gap-4">

                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Products
                </NavLink>

                <NavLink
                  to="/orders"
                  className={({ isActive }) =>
                    `font-medium transition ${
                      isActive
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`
                  }
                >
                  Orders
                </NavLink>

              </div>
            )}

          </div>

          {/* =========================
              DESKTOP SEARCH
          ========================= */}

          {!isMobile && (
            <Box className="hidden lg:block w-[280px] xl:w-[380px]">

              <TextField
                fullWidth
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search products..."
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">

                        <IconButton
                          size="small"
                          onClick={handleSearch}
                        >
                          <Search />
                        </IconButton>

                      </InputAdornment>
                    ),
                  },
                }}
              />

            </Box>
          )}

          {/* =========================
              RIGHT SECTION
          ========================= */}

          <div className="flex items-center gap-1 sm:gap-2">

            {/* =========================
                CART
            ========================= */}

            <IconButton
              onClick={() => navigate("/cart")}
              aria-label="Cart"
            >
              <Badge
                badgeContent={cartItems?.length || 0}
                color="error"
              >
                <ShoppingCart />
              </Badge>
            </IconButton>

            {/* =========================
                WISHLIST
            ========================= */}

            <IconButton
              onClick={() => navigate("/wishlist")}
              aria-label="Wishlist"
            >
              <Badge
                badgeContent={wishlistCount}
                color="error"
              >
                <FavoriteBorder />
              </Badge>
            </IconButton>

            {/* =========================
                PROFILE
            ========================= */}

            <IconButton
              onClick={handleProfileOpen}
              aria-label="Profile"
            >
              <AccountCircle />
            </IconButton>

            {/* =========================
                DESKTOP LOGIN / SIGNUP
            ========================= */}

            {!isMobile && !isLoggedIn && (
              <div className="flex gap-2">

                <Button
                  variant="outlined"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </Button>

              </div>
            )}

          </div>
        </Toolbar>
      </AppBar>

      {/* =========================
          PROFILE MENU
      ========================= */}

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileClose}
      >

        {isLoggedIn ? (
          <>
            <MenuItem onClick={handleProfile}>
              Profile
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleProfileClose();
                navigate("/wishlist");
              }}
            >
              Wishlist
            </MenuItem>

            <MenuItem onClick={handleLogout}>
              Logout
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                handleProfileClose();
                navigate("/login");
              }}
            >
              Login
            </MenuItem>

            <MenuItem
              onClick={() => {
                handleProfileClose();
                navigate("/signup");
              }}
            >
              Sign Up
            </MenuItem>
          </>
        )}

      </Menu>

      {/* =========================
          MOBILE DRAWER
          ONLY MOBILE
      ========================= */}

      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={closeDrawer}
        >

          <Box sx={{ width: 280 }}>

            {/* Mobile Drawer Logo */}

            <Typography
              variant="h5"
              className="p-5 font-bold text-blue-600 cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              ShopEase
            </Typography>

            {/* Mobile Search */}

            <div className="px-4 pb-4">

              <TextField
                fullWidth
                size="small"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search products..."
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">

                        <IconButton
                          size="small"
                          onClick={handleSearch}
                        >
                          <Search />
                        </IconButton>

                      </InputAdornment>
                    ),
                  },
                }}
              />

            </div>

            {/* Mobile Navigation */}

            <List>

              {/* HOME */}

              <NavLink
                to="/"
                onClick={closeDrawer}
                className="no-underline text-gray-800"
              >
                <ListItem disablePadding>

                  <ListItemButton>
                    <ListItemText primary="Home" />
                  </ListItemButton>

                </ListItem>
              </NavLink>

              {/* PRODUCTS */}

              <NavLink
                to="/products"
                onClick={closeDrawer}
                className="no-underline text-gray-800"
              >
                <ListItem disablePadding>

                  <ListItemButton>
                    <ListItemText primary="Products" />
                  </ListItemButton>

                </ListItem>
              </NavLink>

              {/* ORDERS */}

              <NavLink
                to="/orders"
                onClick={closeDrawer}
                className="no-underline text-gray-800"
              >
                <ListItem disablePadding>

                  <ListItemButton>
                    <ListItemText primary="Orders" />
                  </ListItemButton>

                </ListItem>
              </NavLink>

              {/* CART */}

              <NavLink
                to="/cart"
                onClick={closeDrawer}
                className="no-underline text-gray-800"
              >
                <ListItem disablePadding>

                  <ListItemButton>

                    <ListItemText
                      primary={`Cart${
                        cartItems?.length
                          ? ` (${cartItems.length})`
                          : ""
                      }`}
                    />

                  </ListItemButton>

                </ListItem>
              </NavLink>

              {/* WISHLIST */}

              <NavLink
                to="/wishlist"
                onClick={closeDrawer}
                className="no-underline text-gray-800"
              >
                <ListItem disablePadding>

                  <ListItemButton>

                    <ListItemText
                      primary={`Wishlist${
                        wishlistCount
                          ? ` (${wishlistCount})`
                          : ""
                      }`}
                    />

                  </ListItemButton>

                </ListItem>
              </NavLink>

            </List>

            {/* =========================
                MOBILE LOGIN / SIGNUP
            ========================= */}

            {!isLoggedIn && (
              <div className="flex flex-col gap-3 p-4">

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    navigate("/login");
                    closeDrawer();
                  }}
                >
                  Login
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    navigate("/signup");
                    closeDrawer();
                  }}
                >
                  Sign Up
                </Button>

              </div>
            )}

            {/* =========================
                MOBILE LOGGED IN ACTIONS
            ========================= */}

            {isLoggedIn && (
              <div className="flex flex-col gap-2 p-4">

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => {
                    navigate("/profile");
                    closeDrawer();
                  }}
                >
                  Profile
                </Button>

                <Button
                  variant="contained"
                  color="error"
                  fullWidth
                  onClick={handleLogout}
                >
                  Logout
                </Button>

              </div>
            )}

          </Box>

        </Drawer>
      )}
    </>
  );
}

export default Navbar;