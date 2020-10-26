/* eslint-disable no-param-reassign */
const User = require('../models/User');

exports.listUsers = (req, res) => {
  User.allUsers((_err, users) => {
    res.render('users/index', { users });
  });
};

exports.newUser = (req, res) => {
  res.render('users/new', { errors: {}, user: {} });
};

exports.createUser = ({ body }, res) => {
  const { name, email, password } = body;
  const newUser = new User({
    name,
    email,
    password,
    userContext: { verified: false },
  });
  User.add(newUser, (err) => {
    if (err) res.render('users/new', { errors: err.errors, user: newUser });
    else {
      newUser.sendWelcomeEmail();
      res.redirect('/users');
    }
  });
};

exports.editUser = ({ params }, res) => {
  User.findById(params.id, { name: 1 }, (_err, user) => {
    res.render('users/edit', { user });
  });
};

exports.updateUser = ({ params, body }, res) => {
  const { id } = params;
  User.findById(id).then((user) => {
    if (!user) throw new Error('User not found!');
    if (body.name) user.name = body.name;
    if (body.password && body.password !== '') user.password = body.password;
    user.save(() => res.redirect('/users'));
  });
};
