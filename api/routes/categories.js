// Required modules
const router = require("express").Router();

// Middleware
const verify = require("./../middleware/verify");

// Controller
const { create, update, deleteCategory } = require("./../controllers/category");

// Delete
router.delete("/", verify, deleteCategory);

// Update
router.put("/", verify, update);

// create
router.post("/", verify, create);

module.exports = router;
