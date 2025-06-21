const express = require("express");
const router = express.Router();
const User = require("../models/User");
const sendOrderEmail = require("../utils/mailer");
const verifyToken = require("../middelware/verifyToken");

router.post("/", verifyToken, async (req, res) => {
  console.log("\n📥 Received POST /api/orders");

  const userId = req.userId;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized - token missing" });
  }

  console.log("🧾 Authenticated user ID:", userId);
  console.log("🧾 Request body:", req.body);

  const { items, total } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(404).json({ error: "User not found" });
    }

    console.log("👤 Found user:", user.username, user.email);

    try {
      console.log("Sending email to:", user.email);
      await sendOrderEmail(user.email, user.username, items, total);
      console.log(" Email sent successfully");
    } catch (emailError) {
      console.error(" Email sending failed:", emailError);
      return res.status(500).json({
        error: "Email sending failed",
        detail: emailError.message,
      });
    }

    return res.json({ message: "Order placed and email sent" });
  } catch (err) {
    console.error("Caught error during order:", err);
    return res.status(500).json({
      error: "Server error",
      detail: err.message,
    });
  }
});

module.exports = router;
