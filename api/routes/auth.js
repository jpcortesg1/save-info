// Required modules
const router = require("express").Router();

// Controller
const { register, login, refresh } = require("./../controllers/auth");

// Middleware
const verify = require("./../middleware/verify");

router.post("/verify", verify, (req, res) => {
  res.status(200).json("Hola");
});

// Refresh token
router.post("/refresh", refresh);

// Login user
router.post("/login", login);

// Register new user
router.post("/register", register);

module.exports = router;
