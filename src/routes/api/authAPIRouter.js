const express = require('express');
const {
  authenticate,
  forgotPassword,
} = require('../../controllers/api/authAPIController');

const authAPIRouter = express.Router();

authAPIRouter.post('/authenticate', authenticate);
authAPIRouter.post('/forgot-password', forgotPassword);

module.exports = authAPIRouter;
