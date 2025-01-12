const mongoose = require("mongoose");

const connectWithRetry = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {})
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
