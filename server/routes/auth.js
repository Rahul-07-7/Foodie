const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");
const verifyToken = require("../middelware/verifyToken");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET || "rahuljwtsecret";

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashed });
    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "2h" });

    res.json({ message: "Registered successfully", token });
  } catch (e) {
    console.error("Registration error:", e);
    res.status(400).json({ error: "Username already exists" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: "Invalid username" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "2h" });

    res.json({
      success: true,
      message: "Logged in",
      token,
      username: user.username,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  res.json({ message: "Logged out (remove token on frontend)" });
});

router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json({ loggedIn: true, user });
});

module.exports = router;
