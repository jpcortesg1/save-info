// Required modules
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    cb(null, "req.body.name");
  },
});

const upload = multer({ storage });

const uploadSingle = upload.single("file");

const uploadRes = (req, res) => {
  res.status(200).json("File has been uploaded");
};

module.exports = {
  uploadSingle,
  uploadRes,
};
