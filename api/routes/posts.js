// Required modules
const router = require("express").Router();

// Middleware
const verify = require("./../middleware/verify");

// Controllers
const {
  create,
  update,
  deletePost,
  getPostsCategory,
  get,
} = require("./../controllers/post");

// Get a post
router.get("/", verify, get);

// Get all post for category
router.get("/category", verify, getPostsCategory);

// Delete
router.delete("/", verify, deletePost);

// Update
router.put("/", verify, update);

// Create
router.post("/", verify, create);

module.exports = router;
