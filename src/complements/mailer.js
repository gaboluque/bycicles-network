const nodemailer = require('nodemailer');

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'rory93@ethereal.email',
    pass: 'Tz2avdmZANDEFWRHbs',
  },
};

module.exports = nodemailer.createTransport(mailConfig);
