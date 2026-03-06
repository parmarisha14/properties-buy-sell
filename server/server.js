require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();


connectDB();

app.use(cors({
  origin: [
    "http://localhost:5173", // client
    "http://localhost:5174"  // admin
  ],
  credentials: true
}));

// ✅ BODY PARSER FIX
app.use(express.json());

app.use(express.urlencoded({ extended: true }));   // ⭐ ADD THIS

// ✅ Static folder
app.use("/uploads", express.static("uploads"));

// ✅ Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});