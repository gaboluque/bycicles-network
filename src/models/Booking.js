const moment = require('moment');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookingSchema = new Schema({
  from: Date,
  to: Date,
  bicycle: {
    type: Schema.Types.ObjectId,
    ref: 'Bicycle',
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

bookingSchema.methods.totalDays = function () {
  return moment(this.to).diff(moment(this.from), 'days') + 1;
};

bookingSchema.statics.allBookings = function (cb) {
  return this.find({}, cb);
};

module.exports = mongoose.model('Booking', bookingSchema);
