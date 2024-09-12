const express = require('express');
const router = express.Router();

// Middleware to ensure the user is authenticated
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send('Unauthorized');
};

// Get the current authenticated user data
router.get('/user', ensureAuthenticated, (req, res) => {
  res.json(req.user); // Send user data to the frontend
});

module.exports = router;
