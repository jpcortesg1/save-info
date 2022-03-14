// Required modules
const router = require("express").Router();

// Middleware
const verify = require("./../middleware/verify");

// Controller
const {
  create,
  update,
  deleteCategory,
  getCategoriesUser,
  get,
} = require("./../controllers/category");

// Get a category
router.get("/", verify, get);

// Get categories for user
router.get("/user", verify, getCategoriesUser);

// Delete
router.delete("/", verify, deleteCategory);

// Update
router.put("/", verify, update);

// create
router.post("/", verify, create);

module.exports = router;
