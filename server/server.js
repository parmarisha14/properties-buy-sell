require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

// ✅ Connect DB
connectDB();

// ✅ CORS FIX
app.use(
  cors({
    origin: "http://localhost:5173", // FRONTEND URL
    credentials: true,
  })
);

app.use(express.json());

// ✅ Static folder
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
app.use("/api", routes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});