const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const { authRoutes, ensureAuthenticated } = require('./routes/auth'); // Import router and middleware
const sequelize = require('./config/database'); // Import Sequelize instance
const userRoutes = require('./routes/user'); // Import the new user route
const roomRoutes = require('./routes/rooms'); // Import room routes
const bookingRoutes = require('./routes/bookings'); // Import booking routes
const { User, Room, Booking } = require('./models'); // Import models

require('dotenv').config(); // Load environment variables

const app = express();

// Middleware
app.use(express.json());
app.use(session({ 
  secret: process.env.JWT_SECRET,  // Use a secret from .env file
  resave: false, 
  saveUninitialized: false,  // Change to false for better security
  cookie: { secure: false }  // Set 'secure' to 'true' in production with HTTPS
}));
app.use(passport.initialize());
app.use(passport.session());

// Register Routes
app.use('/auth', authRoutes); // Auth routes for Google login, logout, etc.
app.use('/auth', userRoutes); // User-specific routes
app.use('/rooms', roomRoutes); // Room management routes
app.use('/bookings', bookingRoutes); // Booking management routes

// Sync Database
// sequelize.sync({ alter: true }) // Sync Sequelize models to the database
sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(error => {
    console.error('Unable to sync the database:', error);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
