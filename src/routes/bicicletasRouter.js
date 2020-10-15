const express = require('express');
const bicicletaController = require('../controllers/bicicletaController');

const biciRouter = express.Router();

biciRouter.get("/", bicicletaController.bicicletaList);


module.exports = biciRouter;
