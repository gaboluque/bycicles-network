const express = require('express');
const bicicleta_controller = require('../controllers/bicicleta');

const biciRouter = express.Router();

biciRouter.get("/", bicicleta_controller.bicicleta_list);


module.exports = biciRouter;
