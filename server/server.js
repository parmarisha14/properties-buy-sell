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

// CORS - Allow credentials from both ports
app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
  ],
  credentials: true,
 
}));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// SESSION - CRITICAL FIX: Add domain: ".localhost"
app.use(
  session({
    secret: "realestate-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
      
    }
  })
);

// uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});