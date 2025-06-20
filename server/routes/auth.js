const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const User = require("../models/User");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ username, email, password: hashed });

    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration failed:", err);
        return res.status(500).json({ error: "Session error" });
      }

      req.session.userId = user._id;

      req.session.save((err) => {
        if (err) {
          console.error("❌ Session save failed:", err);
          return res.status(500).json({ error: "Session save error" });
        }

        console.log("✅ Registered session stored:", req.session);
        res.json({ message: "Registered successfully" });
      });
    });
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

    req.session.regenerate((err) => {
      if (err) {
        console.error("Session regeneration failed:", err);
        return res.status(500).json({ error: "Session error" });
      }

      req.session.userId = user._id;

      req.session.save((err) => {
        if (err) {
          console.error("❌ Session save failed:", err);
          return res.status(500).json({ error: "Session save error" });
        }

        console.log("✅ SESSION SAVED:", req.session);
        res.json({
          success: true,
          message: "Logged in",
          username: user.username,
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed" });
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out" });
  });
});

router.get("/me", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ loggedIn: false });
  const user = await User.findById(req.session.userId).select("-password");
  res.json({ loggedIn: true, user });
});

router.get("/check-auth", (req, res) => {
  console.log("SessionID:", req.sessionID);
  console.log("Session Data:", req.session);

  if (req.session.userId) {
    res.json({ authenticated: true });
  } else {
    res.json({ authenticated: false });
  }
});

router.get("/debug-session", (req, res) => {
  res.json({
    sessionId: req.sessionID,
    session: req.session,
    cookies: req.cookies,
  });
});

module.exports = router;
