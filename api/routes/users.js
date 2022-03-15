// Required modules
const router = require("express").Router();

// Controller
const { getUser, update, deleteUser } = require("./../controllers/user");

// Middleware
const verify = require("./../middleware/verify");

// Prove
router.post("/verify", verify, (req, res) => {
  res.status(200).json("ok");
});

// Delete
router.delete("/", verify, deleteUser);

// Update
router.put("/", verify, update);

// Get user
router.get("/", verify, getUser);

module.exports = router;
