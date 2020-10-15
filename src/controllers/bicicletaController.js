const Bicicleta = require ('../models/bicicletaModel');

exports.bicicletaList = function (req, res) {
  res.render('bicicletas/index', { bicicletas: Bicicleta.allBicis })
}
