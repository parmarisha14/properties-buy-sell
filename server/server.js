require("dotenv").config();   // always first

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});