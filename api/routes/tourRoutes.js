const express = require('express');
const router = express.Router();
const { getTours, createTour, joinTour } = require('../controllers/tourController');
const multer = require('multer');
const path = require('path');

// Set up storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Ensure this folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  
  // File filter for images
  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image!'), false);
    }
  };
  
const upload = multer({ storage, fileFilter });


router.get('/', getTours);               // Retrieve all open tours
router.post('/create', upload.array('images[]', 5) ,createTour);      // Create a new open tour
router.post('/:id/join', joinTour);      // Join an open tour

module.exports = router;
