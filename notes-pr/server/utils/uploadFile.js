const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }).fields([
  { name: "noteImage", maxCount: 1 },
  { name: "file", maxCount: 1 },
  { name: "profilePic", maxCount: 1 },
]);

module.exports = upload;
