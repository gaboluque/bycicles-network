const express = require('express');
const userController = require('../controllers/userController');

const usersRouter = express.Router();

usersRouter.get('/', userController.listUsers);
usersRouter.get('/new', userController.newUser);
usersRouter.post('/create', userController.createUser);
usersRouter.get('/:id/edit', userController.editUser);
usersRouter.post('/:id/update', userController.updateUser);

module.exports = usersRouter;
