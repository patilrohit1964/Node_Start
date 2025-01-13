// Add ID middleware
function addID(req, res, next) {
  const db = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  const lastHero = db.heroes[db.heroes.length - 1];
  const newID = lastHero ? lastHero.id + 1 : 1;
  req.body.id = newID;
  next();
}

module.exports = addID;
