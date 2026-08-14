const express = require("express");
const ConnectDB = require("./config/db");
const productRoutes = require("./routes/product.routes");
const userRoutes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");

const GetRoutes = require("./routes/productGet");
const Viewproduct = require("./routes/viewProduct");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashbordRoutes");
const getProfile = require("./routes/profile.routes");

dotenv.config();

const app = express();


// =======================
// CORS
// =======================

app.use(
  cors({
    origin: "https://shopeease-3.onrender.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// =======================
// Middleware
// =======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


// =======================
// Database
// =======================

ConnectDB();


// =======================
// Routes
// =======================

app.use("/api/users", userRoutes);

app.use("/api/product", productRoutes);

app.use("/api", GetRoutes);

app.use("/api/users", dashboardRoutes);

app.use("/api/products", Viewproduct);

app.use("/api/users", getProfile);

app.use("/api/orders", orderRoutes);


// =======================
// Test Route
// =======================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "ShopEase Backend is running",
  });
});


// =======================
// Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});