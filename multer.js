const multer = require("multer");
const path = require("path");

// storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// file filter (allow pdf & images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = /pdf|jpg|jpeg|png/;
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (extName) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and image files allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
