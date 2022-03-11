// Required modules
const router = require("express").Router();

// Controller
const { createUser } = require("./../controllers/user");

// Get
router.get("/", createUser);

module.exports = router;
