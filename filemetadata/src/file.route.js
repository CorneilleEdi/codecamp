const express = require('express');

const fileController = require('./file.controller')
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads');
    },
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  });
    // reject a file by filtring the entry
  const fileFilter = (req, file, cb) => {
    
    if (file.mimetype === 'image/jpeg' || file.mimetype === '*') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
    
   
  var upload = multer({ storage: storage })

router.post("/api/fileanalyse",upload.single('upfile'), fileController.create);

module.exports = router;