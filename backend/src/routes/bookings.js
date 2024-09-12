const express = require('express');
const Booking = require('../models/Booking'); 
const Room = require('../models/Room'); 
const { ensureAuthenticated } = require('./auth'); 
const router = express.Router();

// Get all bookings (Admin only) if normal user will get own bookings
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    let bookings;
    if (req.user.role === 'admin') {
      // Admin can fetch all bookings
      bookings = await Booking.findAll({
      });
    } else {
      // Normal user can only fetch their own bookings
      bookings = await Booking.findAll({
        where: { userId: req.user.id },
      });
    }
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});


// Create a new booking
router.post('/', ensureAuthenticated, async (req, res) => {
  const { roomId, startDateTime, endDateTime } = req.body;
  try {
    const room = await Room.findByPk(roomId);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    const booking = await Booking.create({ userId: req.user.id, roomId, startDateTime, endDateTime });
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ error: 'Error creating booking' });
  }
});

// Update a booking (user-specific)
router.put('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  const { startDateTime, endDateTime, status } = req.body;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking || booking.userId !== req.user.id) {
      return res.status(404).json({ error: 'Booking not found or not authorized' });
    }
    booking.startDateTime = startDateTime;
    booking.endDateTime = endDateTime;
    booking.status = status;
    await booking.save();
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: 'Error updating booking' });
  }
});

// Delete a booking (user-specific)
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByPk(id);
    if (!booking || booking.userId !== req.user.id) {
      return res.status(404).json({ error: 'Booking not found or not authorized' });
    }
    await booking.destroy();
    res.json({ message: 'Booking canceled successfully' });
  } catch (error) {
    console.error('Error canceling booking:', error);
    res.status(500).json({ error: 'Error canceling booking' });
  }
});

module.exports = router;
