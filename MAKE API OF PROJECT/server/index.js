const express = require("express");
const cors = require("cors");
const connectWithRetry = require("./config/db");
const cookieParser = require("cookie-parser");
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials: true,
  })
);
require("dotenv").config();
const userRouter = require("./routes/user.route");
connectWithRetry();
app.use("/user", userRouter);
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
