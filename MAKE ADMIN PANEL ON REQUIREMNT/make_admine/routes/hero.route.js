const express = require("express");
const {
  addHero,
  getHeroes,
  updateHero,
} = require("../controllers/hero.controller");
const { addID } = require("../middlewares/addID.middleware");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/add/hero").post(addID, addHero);
router.get("/all-hero", getHeroes);
router.route("/update/villian/:hero_id").patch(auth, updateHero);
router.route("/delete/hero/:hero_id").delete(auth, addHero);

module.exports = router;
