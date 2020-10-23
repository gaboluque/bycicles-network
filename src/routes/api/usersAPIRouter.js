const express = require('express');
const userController = require('../../controllers/api/userAPIController');

const userRouter = express.Router();

userRouter.get('/', userController.listUsers);
userRouter.post('/', userController.createUser);

module.exports = userRouter;
