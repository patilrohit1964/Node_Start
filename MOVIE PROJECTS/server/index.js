const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config/.env" });
const app = express();
app.use(cors());
app.use(express.json());
const authRouter = require("./routes/auth.route");
const movieRouter = require("./routes/movie.route");
app.use("/movie", movieRouter);
app.use("/auth", authRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
