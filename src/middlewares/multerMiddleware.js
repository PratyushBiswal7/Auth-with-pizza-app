const multer = require("multer");
const path = require("path");

// Configure storage with diskStorage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // file.originalname, not file.originalName
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const uploader = multer({ storage });

module.exports = uploader;
