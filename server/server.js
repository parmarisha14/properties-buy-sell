require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

// MongoDB
connectDB();

// CORS - Allow credentials from multiple ports
app.use(cors({
  origin: [
    "http://localhost:5173", // public app
    "http://localhost:5174", // admin app
    "http://localhost:5175"  // broker app
  ],
  credentials: true,
}));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION CONFIG
app.use(session({
  secret: "realestate-secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: "lax",
    maxAge: 1000 * 60 * 60 * 24 // 1 day
    // ❌ Remove domain
  }
}));

// Static uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});