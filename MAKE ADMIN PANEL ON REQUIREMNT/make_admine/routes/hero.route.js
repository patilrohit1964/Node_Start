const express = require("express");
const {
  addHero,
  getHeroes,
  updateHero,
  deleteHero,
} = require("../controllers/hero.controller");
const { addID } = require("../middlewares/addID.middleware");
const auth = require("../middlewares/auth.middleware");

const router = express.Router();

router.route("/add/hero").post(addID, addHero);
router.route("/all-hero").get(getHeroes);
router.route("/update/villian/:hero_id").patch(auth, updateHero);
router.route("/delete/hero/:hero_id").delete(auth, deleteHero);

module.exports = router;
