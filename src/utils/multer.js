const multer = require("multer");
const { storage } = require("../utils/CloudinaryUtil");

const upload = multer({ storage });

module.exports = upload;