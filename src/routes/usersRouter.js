const express = require('express');
const userController = require('../controllers/userController');
const authorize = require('../middlewares/authorize');

const usersRouter = express.Router();

usersRouter.get('/', authorize, userController.listUsers);
usersRouter.get('/new', authorize, userController.newUser);
usersRouter.post('/create', authorize, userController.createUser);
usersRouter.get('/:id/edit', authorize, userController.editUser);
usersRouter.post('/:id/update', authorize, userController.updateUser);

module.exports = usersRouter;
