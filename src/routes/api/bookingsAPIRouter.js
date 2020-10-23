const express = require('express');
const bookingController = require('../../controllers/api/bookingAPIController');

const bookingRouter = express.Router();

bookingRouter.get('/', bookingController.listBookings);
bookingRouter.post('/', bookingController.createBooking);

module.exports = bookingRouter;
