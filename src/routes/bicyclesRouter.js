const express = require('express');
const bicycleController = require('../controllers/bicycleController');

const bicycleRouter = express.Router();

bicycleRouter.get("/", bicycleController.listBicycles);
bicycleRouter.get("/new", bicycleController.newBicycle);
bicycleRouter.post("/create", bicycleController.createBicycle);
bicycleRouter.post("/:id/delete", bicycleController.deleteBicycle);
bicycleRouter.get("/:id/edit", bicycleController.editBicycle);
bicycleRouter.post("/:id/update", bicycleController.updateBicycle);


module.exports = bicycleRouter;
