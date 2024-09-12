const User = require('./User');
const Room = require('./Room');
const Booking = require('./Booking');

// Define associations
User.hasMany(Booking, { foreignKey: 'userId' });
Booking.belongsTo(User, { foreignKey: 'userId' });

Room.hasMany(Booking, { foreignKey: 'roomId' });
Booking.belongsTo(Room, { foreignKey: 'roomId' });

module.exports = {
  User,
  Room,
  Booking,
};
