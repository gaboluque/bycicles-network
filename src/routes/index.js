const express = require('express');
const authorize = require('../middlewares/authorize');

const router = express.Router();

/* GET home page. */
router.get('/', authorize, function (req, res) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
