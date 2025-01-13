const express = require("express");
const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");

// Initialize app and constants
const app = express();
const PORT = 3000;
const DB_FILE = path.join(__dirname, "db.json");

// Middleware
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
