const express = require("express");
const { register, login, loginAdmin } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/admin-login", loginAdmin);

module.exports = router;
