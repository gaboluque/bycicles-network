const express = require('express');
const bookingController = require('../../controllers/api/bookingAPIController');
const authorizeAPI = require('../../middlewares/authorizeAPI');

const bookingRouter = express.Router();

bookingRouter.get('/', authorizeAPI, bookingController.listBookings);
bookingRouter.post('/', authorizeAPI, bookingController.createBooking);

module.exports = bookingRouter;
