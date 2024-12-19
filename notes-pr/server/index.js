const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
require("dotenv").config({ path: "./config/.env" });
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.static("./uploads"));
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
connectDB();

const userRoutes = require("./routes/user.route");
const noteRoutes = require("./routes/note.route");

app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
