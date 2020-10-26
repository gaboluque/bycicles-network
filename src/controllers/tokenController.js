/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
const Token = require('../models/Token');
const User = require('../models/User');

exports.confirmToken = ({ params }, res) => {
  const { token: paramToken } = params;
  Token.findOne({ token: paramToken }, (_err1, token) => {
    if (!token)
      return res
        .status(400)
        .send({ type: 'not-verified', msg: 'Invalid token' });
    User.findById(token._userId, (_err2, user) => {
      if (!user) return res.status(400).send({ msg: 'User not found' });
      if (user.userContext.verified) return res.redirect('/users');
      user.userContext.verified = true;
      user.save((err) => {
        if (err) return res.status(500).send({ msg: err.message });
        res.redirect('/');
      });
    });
  });
};
