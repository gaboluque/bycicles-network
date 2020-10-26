const express = require('express');
const tokenController = require('../controllers/tokenController');

const tokensRouter = express.Router();

tokensRouter.get('/confirm-token/:token', tokenController.confirmToken);

module.exports = tokensRouter;
