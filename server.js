require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================

// CORS
app.use(
  cors({
    origin: "*", // production me frontend URL daalna
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// JSON parser
app.use(express.json());

// ================= ROUTES =================

const busRoutes = require("./routes/busRoutes");
const authRoutes = require("./routes/authRoutes");

// 👉 Bus APIs (structured)
app.use("/api/bus", busRoutes);

// 👉 Auth APIs
app.use("/api/auth", authRoutes);

// ================= TEST ROUTES =================

app.get("/", (req, res) => {
  res.send("🚍 Bus Tracking API Running...");
});

app.get("/check", (req, res) => {
  res.json({
    status: "OK",
    message: "Backend working fine 🚀",
  });
});

// ================= 404 HANDLER =================

app.use((req, res) => {
  res.status(404).json({
    message: "Route not found ❌",
    path: req.originalUrl,
  });
});

// ================= GLOBAL ERROR =================

app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({
    message: "Something went wrong ❌",
  });
});

// ================= SERVER START =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});