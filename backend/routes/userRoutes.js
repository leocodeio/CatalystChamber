const express = require('express');
const userController = require('../controllers/userController.js');

const multer=require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

const router = express.Router();
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/search-user', userController.searchUser);
router.post('/connects', userController.updateConnects);

module.exports = router;
