const User = require('../../models/User');

exports.listUsers = (req, res) => {
  User.allUsers((_, users) => {
    res.status(200).json({
      users,
    });
  });
};

exports.createUser = ({ body }, res) => {
  const { name } = body;
  const newUser = new User({ name });
  User.add(newUser, (_, user) => {
    res.status(201).json({ user });
  });
};
