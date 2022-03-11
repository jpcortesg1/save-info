// Required modules
const router = require("express").Router();

// Controller
const { register, login, refresh, logout } = require("./../controllers/auth");

// Middleware
const verify = require("./../middleware/verify");

// Logout
router.post("/logout", verify, logout);

// Refresh token
router.post("/refresh", refresh);

// Login user
router.post("/login", login);

// Register new user
router.post("/register", register);

module.exports = router;
