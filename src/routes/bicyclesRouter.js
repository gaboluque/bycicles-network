const express = require('express');
const bicycleController = require('../controllers/bicycleController');
const authorize = require('../middlewares/authorize');

const bicycleRouter = express.Router();

bicycleRouter.get('/', authorize, bicycleController.listBicycles);
bicycleRouter.get('/new', authorize, bicycleController.newBicycle);
bicycleRouter.post('/create', authorize, bicycleController.createBicycle);
bicycleRouter.post('/:id/delete', authorize, bicycleController.deleteBicycle);
bicycleRouter.get('/:id/edit', authorize, bicycleController.editBicycle);
bicycleRouter.post('/:id/update', authorize, bicycleController.updateBicycle);

module.exports = bicycleRouter;
