const express = require("express");
const cors = require("cors");
const connectDB = require("./database/db");
require("dotenv").config({ path: "./config/.env" });
const app = express();

app.use(express.json());
app.use(express.static("./uploads"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
