const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");
const SECRET = process.env.JWT_SECRET || "rahuljwtsecret";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: ["https://snacksy.netlify.app"],
    credentials: true,
  })
);

app.use(express.json());
app.set("trust proxy", 1);

const authRoutes = require("./routes/auth.js");
app.use("/api/auth", authRoutes);

const orderRoutes = require("./routes/order.js");
app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(5000, () => console.log("🚀 Server running on port 5000"));
  })
  .catch((err) => console.error("❌ MongoDB connection error:", err));
