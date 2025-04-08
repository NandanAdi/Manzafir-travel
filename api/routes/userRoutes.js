const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { registerUser, loginUser, getUserProfile, updateUserProfile, updateFavorites, getUserProfileById } = require('../controllers/userController');

// Public routes
router.post('/register', registerUser); // User registration
router.post('/login', loginUser);       // User login

// Protected routes (require token)
router.get('/users/:userId', getUserProfileById);
router.get('/profile', auth, getUserProfile);            // Get user profile
router.put('/profile', auth, updateUserProfile);         // Update user profile
router.put('/favorites', auth, updateFavorites);         // Add/remove favorite package


module.exports = router;
