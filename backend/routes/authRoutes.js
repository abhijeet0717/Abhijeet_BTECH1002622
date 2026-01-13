
const express = require('express');
const router = express.Router();
const {
  signup,
  login,
  logout,
  getProfile,
  updateProfile,
  deleteProfile
} = require('../controllers/authcontroller');
const { protect } = require('../middleware/authMiddleware');
const {
  signupValidation,
  loginValidation,
  profileUpdateValidation,
  validate
} = require('../utils/validators');

// Public routes
router.post('/signup', signupValidation, validate, signup);
router.post('/login', loginValidation, validate, login);

// Protected routes
router.post('/logout', protect, logout);
router.get('/profile', protect, getProfile);
router.put('/profile', protect, profileUpdateValidation, validate, updateProfile);
router.delete('/profile', protect, deleteProfile);

module.exports = router;
