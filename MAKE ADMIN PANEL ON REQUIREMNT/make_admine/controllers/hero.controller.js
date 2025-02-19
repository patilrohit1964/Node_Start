const { readDB, writeDB } = require("../middlewares/addID.middleware");
const { body, param, validationResult } = require('express-validator');

// Validation rules
exports.validateAddHero = [
  body('name').trim().notEmpty().withMessage('Hero name is required'),
  body('powers').isArray().withMessage('Powers must be an array'),
  body('villains').isArray().withMessage('Villains must be an array')
];

exports.validateHeroId = [
  param('hero_id').isInt().withMessage('Hero ID must be an integer')
];

exports.validateVillain = [
  body('name').trim().notEmpty().withMessage('Villain name is required'),
  body('powers').isArray().withMessage('Villain powers must be an array')
];

// 1. Add a new hero
exports.addHero = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const db = readDB();
    db.heroes.push(req.body);
    writeDB(db);
    res.status(200).json(db.heroes);
  } catch (err) {
    res.status(500).json({ err: "Failed to add hero" });
  }
};

// 2. Retrieve details of all heroes
exports.getHeroes = async (req, res) => {
  try {
    const db = await readDB();
    res.status(200).send({ message: "Heroes", heroes: db.heroes });
  } catch (err) {
    res.status(500).json({ err: "Failed to retrieve heroes" });
  }
};

// 3. Update villains for a hero
exports.updateHero = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { hero_id } = req.params;
    const db = readDB();
    const hero = db.heroes.find((h) => h.id === parseInt(hero_id));

    if (!hero) {
      return res.status(404).json({ message: "Hero not found" });
    }

    hero.villains.push(req.body);
    writeDB(db);
    res.status(200).json(hero);
  } catch (err) {
    res.status(500).json({ err: "Failed to update villain" });
  }
};

// 4. Delete a hero
exports.deleteHero = (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { hero_id } = req.params;
    const db = readDB();
    const heroIndex = db.heroes.findIndex((h) => h.id === parseInt(hero_id));
    if (heroIndex === -1) {
      return res.status(404).json({ message: "Hero not found" });
    }

    db.heroes.splice(heroIndex, 1);
    writeDB(db);
    res.status(200).json(db.heroes);
  } catch (err) {
    res.status(500).json({ err: "Failed to delete hero" });
  }
};
