const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/user.controller");

const authenticator = require("../middlewares/authenticator");
const validator = require("../middlewares/validator");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", authenticator, validator, updateUser);
router.delete("/:id", authenticator, validator, deleteUser);

module.exports = router;
