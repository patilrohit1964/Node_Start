const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config({ path: "./config/.env" });
const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:6060",
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.static("./uploads"));
const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
const connectDb = require("./config/db");
connectDb();
app.use("/movie", movieRouter);
app.use("/auth", authRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
