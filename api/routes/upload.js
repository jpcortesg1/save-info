// Required modules
const router = require("express").Router();

// Controllers
const { uploadSingle, uploadRes } = require("./../controllers/upload");

// Upload file
router.post("/", uploadSingle, uploadRes);

module.exports = router;
