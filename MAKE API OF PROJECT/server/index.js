const express = require("express");
const cors = require("cors");
const connectWithRetry = require("./config/db");
const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://localhost:5175",
      "http://localhost:5176",
    ],
    credentials:true
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
