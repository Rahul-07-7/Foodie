const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: ["https://zestoria.netlify.app"],
    credentials: true,
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      domain: "foodie-kb4r.onrender.com",
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      sameSite: "none",
    },
  })
);
app.get("/api/test-cookie", (req, res) => {
  req.session.test = "hello";
  res.json({ cookieSet: true, sessionId: req.sessionID });
});

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
