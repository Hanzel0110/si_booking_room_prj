const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Room = sequelize.define('Room', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  features: {
    type: DataTypes.TEXT, 
  },
  available: {
    type: DataTypes.ENUM('available', 'unavailable'),
    defaultValue: 'available',
  },
}, {
  tableName: 'rooms',
  timestamps: true,
});

module.exports = Room;
