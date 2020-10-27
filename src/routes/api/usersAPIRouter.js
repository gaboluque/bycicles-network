const express = require('express');
const userController = require('../../controllers/api/userAPIController');
const authorizeAPI = require('../../middlewares/authorizeAPI');

const userRouter = express.Router();

userRouter.get('/', authorizeAPI, userController.listUsers);
userRouter.post('/', authorizeAPI, userController.createUser);

module.exports = userRouter;
