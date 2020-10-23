const express = require('express');
const bicycleController = require('../../controllers/api/bicycleAPIController');

const bicycleRouter = express.Router();

bicycleRouter.get('/', bicycleController.listBicycles);
bicycleRouter.post('/', bicycleController.createBicycle);
bicycleRouter.delete('/:code', bicycleController.deleteBicycle);

module.exports = bicycleRouter;
