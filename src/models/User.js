const mongoose = require('mongoose');
const Booking = require('./Booking');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
});

userSchema.methods.bookBicycle = function ({ bicycle, from, to }, cb) {
  const booking = new Booking({
    user: this.id,
    from,
    to,
    bicycle,
  });

  booking.save(cb);
};

userSchema.statics.allUsers = function (cb) {
  return this.find({}, cb);
};

userSchema.statics.add = function (user, cb) {
  this.create(user, cb);
};

module.exports = mongoose.model('User', userSchema);
