const path = require("path");
const DB_FILE = path.join(__dirname, "../db.json");
const fs = require("fs");
// Add ID middleware
function addID(req, res, next) {
  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  const lastHero = db.heroes[db.heroes.length - 1];
  const newID = lastHero ? lastHero.id + 1 : 1;
  req.body.id = newID;
  next();
}

// Helper function to read and write the database
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    throw new Error("Error reading database file");
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

module.exports = {
  addID,
  readDB,
  writeDB,
};
