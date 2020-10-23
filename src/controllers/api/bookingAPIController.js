const Booking = require('../../models/Booking');
const User = require('../../models/User');

exports.listBookings = (req, res) => {
  Booking.allBookings((_, bookings) => {
    res.status(200).json({
      bookings,
    });
  });
};

exports.createBooking = ({ body }, res) => {
  User.findById(body.user).then((user) => {
    if (!user) throw new Error('No se encontró el usuario');
    user.bookBicycle(body, (_, booking) => {
      res.status(201).json({ booking });
    });
  });
};
