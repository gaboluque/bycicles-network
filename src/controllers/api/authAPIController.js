/* eslint-disable consistent-return */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../models/User');

const unauthorizedResponse = {
  status: 'error',
  message: 'Invalid credentials',
  data: null,
};

module.exports = {
  authenticate: (req, res, next) => {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return next(err);
      if (!user) return res.status(401).json(unauthorizedResponse);

      if (user && bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign({ id: user._id }, req.app.get('secretKey'), {
          expiresIn: '7d',
        });
        return res.status(200).json({
          message: 'Welcome!',
          data: { user: user.toJSONObject(), token },
        });
      }
      return res.status(401).json(unauthorizedResponse);
    });
  },
  forgotPassword: (req, res, next) => {
    User.findOne({ email: req.body.email }, (_err, user) => {
      if (!user) return res.status(401).json(unauthorizedResponse);
      user.resetPassword((err) => {
        if (err) return next(err);
        return res
          .status(200)
          .json({ message: 'Password restoration email sent', data: null });
      });
    });
  },
};
