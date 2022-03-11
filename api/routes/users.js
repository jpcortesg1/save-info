// Required modules
const router = require("express").Router();

// Controller
const { getUser, update, deleteUser } = require("./../controllers/user");

// Middleware
const verify = require("./../middleware/verify");

// Delete
router.delete("/", verify, deleteUser);

// Update
router.put("/", verify, update);

// Get user
router.get("/", verify, getUser);

module.exports = router;
