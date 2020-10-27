const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  jwt.verify(
    req.headers['x-access-token'],
    req.app.get('secretKey'),
    (err, decoded) => {
      if (err) res.json({ status: 'error', message: err.message, data: null });
      else {
        req.body.userId = decoded.id;
        next();
      }
    }
  );
};
