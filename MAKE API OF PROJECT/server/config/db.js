const mongoose = require("mongoose");

const connectWithRetry = () => {
  mongoose
    .connect("mongodb://localhost:27017/classDb", {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.error(
        "Failed to connect to MongoDB, retrying in 5 seconds...",
        err
      );
      setTimeout(connectWithRetry, 5000);
    });
};

module.exports = connectWithRetry;
