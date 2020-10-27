/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const crypto = require('crypto');
const Booking = require('./Booking');
const Token = require('./Token');
const mailer = require('../complements/mailer');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: [true, 'El nombre es obligatorio'],
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, 'El email es obligatorio'],
    lowercase: true,
    validate: [isEmail, 'El email no es valido'],
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
  },
  userContext: new Schema(
    {
      passwordResetToken: String,
      passwordResetTokenExpires: Date,
      verified: {
        type: Boolean,
        default: false,
      },
    },
    { _id: false }
  ),
});

userSchema.plugin(mongooseUniqueValidator, {
  message: 'Un usuario con ese correo ya existe',
});

userSchema.pre('save', function (next) {
  if (this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, 10 /* Salt rounds */);
  }
  next();
});

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

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

userSchema.methods.toJSONObject = function () {
  const { email, name, userContext } = this;
  return { email, name, userContext };
};

userSchema.methods.sendWelcomeEmail = function () {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString('hex'),
  });
  const destinationEmail = this.email;
  token.save((err1) => {
    if (err1) return console.log(err1.message);
    const mailOptions = {
      from: 'no-reply-biccycle-network.com',
      to: destinationEmail,
      subject: 'Verification code',
      text: `Hola!, para confirmar tu correo, 
      haz click en el siguiente link: http://localhost:3000/token/confirm-token/${token.token}/ `,
    };

    mailer.sendMail(mailOptions, (err2) => {
      if (err2) return console.log(err2.message);
      console.log(`Email sent to ${destinationEmail}`);
    });
  });
};

userSchema.methods.resetPassword = function () {
  const token = new Token({
    _userId: this.id,
    token: crypto.randomBytes(16).toString('hex'),
  });
  const destinationEmail = this.email;
  token.save((err1) => {
    if (err1) return console.log(err1.message);
    const mailOptions = {
      from: 'no-reply-biccycle-network.com',
      to: destinationEmail,
      subject: 'Verification code',
      text: `Hola!, para recuperar tu contraseña, 
      haz click en el siguiente link: http://localhost:3000/reset-password?token=${token.token}/ `,
    };

    mailer.sendMail(mailOptions, (err2) => {
      if (err2) return console.log(err2.message);
      console.log(`Email sent to ${destinationEmail}`);
    });
  });
};

module.exports = mongoose.model('User', userSchema);
