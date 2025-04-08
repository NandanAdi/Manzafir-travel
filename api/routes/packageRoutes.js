const express = require('express');
const router = express.Router();
const { getPackages, createPackage } = require('../controllers/packageController');
const packageController = require('../controllers/packageController');
    
router.get('/', getPackages);          // Retrieve all packages
router.post('/create', createPackage); // Create a new package
router.get('/:packageId', packageController.getPackageById);

module.exports = router;
