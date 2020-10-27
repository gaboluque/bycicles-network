const express = require('express');
const bicycleController = require('../../controllers/api/bicycleAPIController');
const authorizeAPI = require('../../middlewares/authorizeAPI');

const bicycleRouter = express.Router();

bicycleRouter.get('/', authorizeAPI, bicycleController.listBicycles);
bicycleRouter.post('/', authorizeAPI, bicycleController.createBicycle);
bicycleRouter.delete('/:code', authorizeAPI, bicycleController.deleteBicycle);

module.exports = bicycleRouter;
