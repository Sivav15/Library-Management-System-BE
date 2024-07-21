const express = require("express");
const login = require("../controllers/auth/login");
const register = require("../controllers/auth/register");
const googleCallback = require("../controllers/auth/googleCallback");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/google/callback", googleCallback);

module.exports = router;
