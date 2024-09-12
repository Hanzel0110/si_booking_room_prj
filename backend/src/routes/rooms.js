const express = require('express');
const Room = require('../models/Room');
const { ensureAuthenticated } = require('./auth');
const router = express.Router();

// Get all rooms
router.get('/', ensureAuthenticated, async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ error: 'Error fetching rooms' });
  }
});

// Create a new room (Admin only)
router.post('/', ensureAuthenticated, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { name, capacity, features, available } = req.body; // Adjusted based on your model
  try {
    const room = await Room.create({ name, capacity, features, available });
    res.status(201).json(room);
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Error creating room' });
  }
});

// Update room details (Admin only)
router.put('/:id', ensureAuthenticated, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.params;
  const { name, capacity, features, available } = req.body;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    room.name = name;
    room.capacity = capacity;
    room.features = features;
    room.available = available;
    await room.save();
    res.json(room);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Error updating room' });
  }
});

// Delete a room (Admin only)
router.delete('/:id', ensureAuthenticated, async (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const { id } = req.params;
  try {
    const room = await Room.findByPk(id);
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }
    await room.destroy();
    res.json({ message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ error: 'Error deleting room' });
  }
});

module.exports = router;
