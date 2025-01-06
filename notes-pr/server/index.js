const express = require("express");
const app = express();
const cors = require("cors");
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const connectDB = require("./database/db");
const fileUpload = require("express-fileupload");
require("dotenv").config({ path: "./config/.env" });

app.use(express.json({ limit: "50mb" }));
app.set("view engine", "ejs");
// app.use(fileUpload());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.use(cookieParser());
app.use(express.static("./uploads"));
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL || "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:5174",
      "http://localhost:5175",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
connectDB();

const userRoutes = require("./routes/user.route");
const noteRoutes = require("./routes/note.route");
const adminRoutes = require("./routes/admin.route");
const createOtp = require("./utils/otpGenerator");
const sendMail = require("./utils/sendEmail");
app.use("/api/user", userRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/admin", adminRoutes);
const PORT = process.env.PORT || 3000;

app.get("/tp", async (req, res) => {
  const userInfo = {
    email: "jadhav@gmail.com",
    password: "password",
    name: "chetan",
  };
  // const { otp, token } = createOtp(userInfo);
  // const htmlTemplate = await ejs.renderFile(
  //   __dirname + "/views/verifyOtp.ejs",
  //   { otp, name: userInfo.name }
  // );
  // const mailchecker = await sendMail("adsfsdf", htmlTemplate);
  // if (mailchecker) {
  //   console.log(mailchecker);
  // } else {
  //   console.log("Error sending email");
  // }
  res.render("verifyOtp.ejs");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
